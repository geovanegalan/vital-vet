let ownerID;
document.getElementById("search-owner").addEventListener("click", async (e) => {
	e.preventDefault();
	e.stopPropagation();

	try {
		let cpfInput = document.getElementById("cpf").value;
		cpfInput = sanitizeCPF(cpfInput);

		const response = await apiGet(`/owners/cpf/${cpfInput}`);
		const data = response.data;

		document.getElementById("owner-name").value = data.name;
		document.getElementById("endereco").value = data.address;
		const ownerTelMask = IMask(document.getElementById("owner-tel"), {
			mask: "(00) 00000-0000",
		});
		ownerID = data.id;
		ownerTelMask.value = data.tel;
	} catch (error) {
		console.error(error);
		throw Error;
	}
});

const form = document.getElementById("form-pet");
form.addEventListener("submit", async (e) => {
	e.preventDefault();
	e.stopPropagation();

	try {
		if (!form.checkValidity()) {
			const errors = formErrors();
			Swal.fire({
				icon: "error",
				title: "Verifique os campos!",
				html: errors.map((e) => `❌ ${e}</p>`).join(""),
				footer: '<a href="#">Contact Support</a>',
			});
			return;
		}

		const newPet = {
			petName: document.getElementById("pet-name").value,
			petSpecie: document.getElementById("specie").value,
			petBreed: document.getElementById("breed").value,
			petAge: document.getElementById("age").value,
			petWeight: document.getElementById("weight").value,
			petGenre: document.getElementById("genre").value,
			petSpayed: document.getElementById("spayed").value,
			obs: document.getElementById("observations").value,
			ownerId: ownerID,
		};

		await apiPost(`/pets`, newPet);

		Swal.fire({
			icon: "success",
			title: "Pet cadastrado com sucesso!",
		});
	} catch (error) {
		console.error(error);
		Swal.fire("Erro ao cadastrar pet!");
	}
});

//Mask
IMask(document.getElementById("cpf"), {
	mask: "000.000.000-00",
});
