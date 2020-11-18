import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import Form from "../../Components/Form/Form";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import RegisterPageError from "../../utils/RegisterPageError";
import Loader from "../../Components/Loader/Loader";
import { checkError } from "../../utils/RegisterFormErrorCheck";
import {
	USER_PROFILE_UPDATE_FAIL,
	USER_PROFILE_UPDATE_REQUEST,
	USER_PROFILE_UPDATE_SUCCESS,
} from "../../context/constants/userConstants";
import { userProfileUpdate } from "../../context/userActions";
import { Container } from "../RegisterPage/RegisterPageStyle";

const ProfilePage = ({ history }) => {
	const [profile, setProfile] = useState({
		nameFirst: "",
		nameLast: "",
		email: "",
	});
	const [errorMessage, setErrorMessage] = useState({
		nameFirst: "",
		nameLast: "",
		email: "",
	});
	const [errorMess, setErrorMess] = useState("");
	const [state, dispatch] = useContext(StoreContext);
	const {
		user: { userInfo, loading, error },
	} = state;

	useEffect(() => {
		if (!userInfo) {
			history.push("/");
		} else {
			setProfile({
				...profile,
				nameFirst: userInfo.nameFirst,
				nameLast: userInfo.nameLast,
				email: userInfo.email,
			});
		}
	}, [userInfo, history]);

	const handleChange = (e) => {
		const value = e.target.value;
		const type = e.target.name;
		const error = checkError(type, value);
		setProfile({ ...profile, [type]: value });
		setErrorMessage({ ...errorMessage, [type]: error });
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const errorMessage = RegisterPageError(profile);

		setErrorMess(errorMessage);

		dispatch({ type: USER_PROFILE_UPDATE_REQUEST });

		const userUpdate = await userProfileUpdate(
			profile.nameFirst,
			profile.nameLast,
			profile.email,
			userInfo.token
		);

		if (!userUpdate.response) {
			dispatch({
				type: USER_PROFILE_UPDATE_SUCCESS,
				payload: {
					nameFirst: profile.nameFirst,
					nameLast: profile.nameLast,
					email: profile.email,
				},
			});
		} else {
			if (userUpdate.response.data.message.includes("email")) {
				const payloadMessage = `Duplicate email ${profile.email} please try again.`;
				dispatch({
					type: USER_PROFILE_UPDATE_FAIL,
					payload: payloadMessage,
				});
			}
		}
	};

	const formObject = [
		{
			type: "text",
			name: "nameFirst",
			label: "First Name",
			value: profile.nameFirst,
			onChange: handleChange,
			errorMessage: errorMessage.nameFirst,
		},
		{
			type: "text",
			name: "nameLast",
			label: "Last Name",
			value: profile.nameLast,
			onChange: handleChange,
			errorMessage: errorMessage.nameLast,
		},
		{
			type: "email",
			name: "email",
			label: "Email",
			value: profile.email,
			onChange: handleChange,
			errorMessage: errorMessage.email,
		},
	];

	return (
		<Container>
			{loading ? (
				<Loader />
			) : (
				<>
					<div
						style={{
							height: "3rem",
							alignSelf: "center",
						}}
					>
						{errorMess === "" || errorMess === undefined ? null : (
							<ErrorMessage>
								<FontAwesomeIcon
									icon={faExclamationTriangle}
									color='red'
								/>{" "}
								{errorMess}
							</ErrorMessage>
						)}
						{error === "" ? null : (
							<div>
								<ErrorMessage>
									<FontAwesomeIcon
										icon={faExclamationTriangle}
										color='red'
									/>{" "}
									{error}
								</ErrorMessage>
							</div>
						)}
					</div>
					<Form
						obj={formObject}
						title='User Profile'
						onSubmit={submitHandler}
						submit={true}
						submitText='Update Profile'
					/>
				</>
			)}
		</Container>
	);
};

export default ProfilePage;
