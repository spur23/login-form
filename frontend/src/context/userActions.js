import axios from "axios";

export const userLogin = async (email, password) => {
	try {
		const { data } = await axios.post(
			"/api/login",
			{
				email,
				password,
			},
			{ headers: { "Content-Type": "application/json" } }
		);

		return data;
	} catch (error) {
		return error;
	}
};

export const userLogout = () => {
	localStorage.removeItem("userInfo");
};

export const userRegister = async (nameFirst, nameLast, email, password) => {
	try {
		const { data } = await axios.post(
			"/api/register",
			{
				nameFirst,
				nameLast,
				email,
				password,
			},
			{ headers: { "Content-Type": "application/json" } }
		);

		return data;
	} catch (error) {
		return error;
	}
};
