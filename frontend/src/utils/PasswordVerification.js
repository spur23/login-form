export const passwordCharacterQuantity = 8;
export const passwordCapitalLetterQuantity = 1;
export const passwordNumberQuantitiy = 1;
export const passwordSpecialCharacterQuantity = 1;

export const checkPassword = (value) => {
	const passwordLength = value.length >= passwordCharacterQuantity;
	const passwordContainNumber =
		passwordValidateNumbers(value) >= passwordNumberQuantitiy;
	const passwordCapitalLetters =
		passwordValidateCapitalLetters(value) >= passwordCapitalLetterQuantity;
	const passwordCharacters =
		passwordValidateCharacters(value) >= passwordSpecialCharacterQuantity;

	return {
		length: passwordLength,
		numbers: passwordContainNumber,
		capitalLetters: passwordCapitalLetters,
		characters: passwordCharacters,
	};
};

const passwordValidateCapitalLetters = (password) => {
	const passArray = password.split("");
	// check for capital letters, if any returns quantity
	return passArray.filter((letter) => /[A-Z]/g.test(letter)).length;
};

const passwordValidateNumbers = (password) => {
	const passArray = password.split("");
	// check if password contains numbers, if any returns quantity
	return passArray.filter((letter) => /\d/.test(letter)).length;
};

const passwordValidateCharacters = (password) => {
	const passArray = password.split("");
	// check if password contains special characters, if any returns quantity
	return passArray.filter((letter) => /[@!#$%+/=~]/.test(letter)).length;
};
