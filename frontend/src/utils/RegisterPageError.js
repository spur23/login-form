const RegisterPageError = (
	register,
	passwordCheck,
	passwordCharacterQuantity,
	passwordNumberQuantitiy,
	passwordCapitalLetterQuantity,
	passwordSpecialCharacterQuantity
) => {
	// checks if the register page inputs meet the requirements
	if (register.nameFirst.length <= 3) {
		return "First Name is required.";
	} else if (register.nameLast <= 3) {
		return "Last Name is required.";
	} else if (register.email === "") {
		return "Email is required.";
	} else if (register.password !== undefined) {
		if (register.password === "") {
			return "Password is required.";
		} else if (!passwordCheck.length) {
			return `Password must be at least ${passwordCharacterQuantity} characters.`;
		} else if (!passwordCheck.numbers) {
			return `Password must contain at least ${passwordNumberQuantitiy} numbers.`;
		} else if (!passwordCheck.capitalLetters) {
			return `Password must contain at least ${passwordCapitalLetterQuantity} capital letter.`;
		} else if (!passwordCheck.characters) {
			return `Password must contain at least ${passwordSpecialCharacterQuantity} special characters.`;
		}
	}
};

export default RegisterPageError;
