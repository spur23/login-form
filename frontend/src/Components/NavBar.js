import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StoreContext } from "../context/store";
import { userLogout } from "../context/userActions";
import { USER_LOGOUT_SUCCESS } from "../context/constants/userConstants";

const Wrapper = styled.nav`
	background: #74b9ff;
	height: 10vh;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	right: 0;
	left: 0;
	& a,
	button {
		margin-right: 2rem;
		text-decoration: none;
		cursor: pointer;
		color: #ffeaa7;
	}
	& a:visited {
		color: #ffeaa7;
	}
	& a:hover,
	button:hover {
		transform: scale(1.02);
	}

	& button {
		background: none;
		border: none;
	}
`;

const NavBar = () => {
	const [state, dispatch] = useContext(StoreContext);
	const {
		user: { userInfo },
	} = state;

	const onClickHandler = (e) => {
		userLogout();
		dispatch({ type: USER_LOGOUT_SUCCESS });
	};

	return (
		<Wrapper>
			<Link to='/home'>Home</Link>
			<>
				{!userInfo ? (
					<>
						<Link to='/login'>Login</Link>
						<Link to='/register'>Register</Link>
					</>
				) : (
					<button onClick={onClickHandler}>Logout</button>
				)}
			</>
		</Wrapper>
	);
};

export default NavBar;
