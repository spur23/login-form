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

export const userProfileUpdate = async (nameFirst, nameLast, email, token) => {
	try {
		const { data } = await axios.put(
			"/api/profile",
			{
				nameFirst,
				nameLast,
				email,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return data;
	} catch (error) {
		return error;
	}
};
