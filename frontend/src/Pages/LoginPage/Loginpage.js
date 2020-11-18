import React, { useState, useContext, useEffect } from "react";
import Form from "../../Components/Form/Form";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { StoreContext } from "../../context/store";
import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
} from "../../context/constants/userConstants";
import { userLogin } from "../../context/userActions";
import Container from "./LoginPageStyle";

const Loginpage = ({ history }) => {
	const [form, setForm] = useState({ email: "", password: "" });
	const [state, dispatch] = useContext(StoreContext);
	const {
		user: { error, userInfo },
	} = state;

	useEffect(() => {
		if (userInfo) {
			history.push("/profile");
		}
	}, [history, userInfo]);

	const handleChange = (e) => {
		const value = e.target.value;
		const type = e.target.name;
		setForm({ ...form, [type]: value });
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		dispatch({ type: USER_LOGIN_REQUEST });

		const loginInfo = await userLogin(form.email, form.password);

		if (!loginInfo.response) {
			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: loginInfo,
			});
			localStorage.setItem("userInfo", JSON.stringify(loginInfo));
		} else {
			dispatch({
				type: USER_LOGIN_FAIL,
				payload: loginInfo.response.data.message,
			});
		}
	};

	const loginFormObject = [
		{
			type: "email",
			name: "email",
			label: "Email",
			onChange: handleChange,
			value: form.email,
			errorMessage: "",
		},
		{
			type: "password",
			name: "password",
			label: "Password",
			onChange: handleChange,
			value: form.password,
			errorMessage: "",
		},
	];

	return (
		<Container>
			<div style={{ height: "1rem" }}>
				{error === "" ? null : (
					<ErrorMessage>
						<FontAwesomeIcon
							icon={faExclamationTriangle}
							color='red'
						/>
						{error}
					</ErrorMessage>
				)}
			</div>
			<Form
				obj={loginFormObject}
				title='Login'
				onSubmit={submitHandler}
			/>
		</Container>
	);
};

export default Loginpage;
