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
