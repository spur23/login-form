export const checkError = (type, value, password) => {
	if (type === "nameFirst" || type === "nameLast") {
		if (value.length === 0) {
			return "";
		} else if (value.length <= 2) {
			if (type === "nameFirst") {
				return "First name should contain at least 3 characters";
			} else {
				return "Last name should contain at least 3 characters";
			}
		} else {
			return "";
		}
	} else if (type === "email") {
		if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length === 0) {
			return "";
		} else {
			return "Please enter a valid email address";
		}
	} else if (type === "passwordConfirm") {
		if (value === password || value.length === 0) {
			return "";
		} else {
			return "Must match password";
		}
	} else {
		return "";
	}
};
