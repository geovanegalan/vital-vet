function validateCPF(cpf) {
	const digits = sanitizeCPF(cpf).split("").map(Number);

	if (digits.every((d) => d === digits[0])) return false;

	for (let length = 9; length <= 10; length++) {
		let sum = digits
			.slice(0, length)
			.reduce((acc, d, i) => acc + d * (length + 1 - i), 0);

		let digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);

		if (digit !== digits[length]) return false;
	}

	return true;
}

function sanitizeCPF(cpf) {
	return cpf.replace(/\D/g, "");
}
function sanitizeTel(tel) {
	return tel.replace(/\D/g, "");
}
