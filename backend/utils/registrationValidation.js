const registrationValidation = (nameFirst, nameLast, email, password) => {
	// validates the data entered for new user registration
	if (nameFirst && nameLast && email && password) {
		return true;
	} else if (!nameFirst) {
		return "First Name";
	} else if (!email) {
		return "Email";
	} else if (!password) {
		return "Password";
	} else if (!nameLast) {
		return "Last Name";
	}
};

export default registrationValidation;
