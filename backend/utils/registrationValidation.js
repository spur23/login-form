const registrationValidation = (name, email, password) => {
	if (name && email && password) {
		return true;
	} else if (!name) {
		return "Name";
	} else if (!email) {
		return "Email";
	} else if (!password) {
		return "Password";
	}
};

export default registrationValidation;
