let ownersMap = new Map();
(async () => {
	const tbody = document.querySelector("tbody");

	const [petsResponse, ownersResponse] = await Promise.all([
		apiGet("/pets"),
		apiGet("/owners"),
	]);

	const pets = petsResponse.data;
	const owners = ownersResponse.data;

	ownersMap = new Map(owners.map((owner) => [owner.id, owner]));

	const rows = pets
		.map((pet) => {
			const owner = ownersMap.get(pet.ownerId);
			const ownerName = owner ? owner.name : "Sem dono";

			return `
        <tr class="hover:bg-[#F7F9FF] transition">
          <td class="px-6 py-4 font-medium text-dark">${pet.name}</td>
          <td class="px-6 py-4 text-gray-600">${ownerName}</td>
          <td class="px-6 py-4 text-gray-600">N/A</td>
          <td class="px-6 py-4 text-center">
            <button class="bg-accent hover:bg-light hover:text-dark transition px-4 py-2 rounded-lg text-white font-medium" data-id="${pet.id}">
              Ver mais
            </button>
          </td>
        </tr>`;
		})
		.join("");

	tbody.innerHTML = rows;
})();

const table = document.querySelector("table");
const petName = document.getElementById("pet-name");
const ownerName = document.getElementById("owner-name");
const ownerTel = document.getElementById("owner-phone");
const ownerAddress = document.getElementById("owner-address");
const modal = document.getElementById("pet-modal");

table.addEventListener("click", async (e) => {
	if (!e.target.matches("button")) return;
	const petID = e.target.dataset.id;

	try {
		const response = await apiGet(`/pets/${petID}`);
		const petData = response.data;
		const owner = ownersMap.get(petData.ownerId);

		petName.textContent = petData.name;
		ownerName.textContent = owner.name;
		ownerTel.textContent = owner.tel;
		ownerAddress.textContent = owner.address;

		modal.classList.remove("hidden");
	} catch (error) {
		console.error(error);
		Swal.fire({
			icon: "error",
			title: "Erro ao carregar dados do Paciente!",
			text: "Por favor tente novamente!",
			footer: '<a href="#">Contact Support</a>',
		});
	}
});

function closeModal() {
	modal.classList.add("hidden");
}

document.getElementById("close-modal").addEventListener("click", closeModal);
