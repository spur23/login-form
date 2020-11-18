import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/store";
import { userLogout } from "../../context/userActions";
import { USER_LOGOUT_SUCCESS } from "../../context/constants/userConstants";
import { Container, Wrapper } from "./NavBarStyle";

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
		<Container>
			<div>
				<h1>Welcome</h1>
			</div>
			<Wrapper>
				<Link to='/'>Home</Link>

				<>
					{!userInfo ? (
						<>
							<Link to='/login'>Login</Link>
							<Link to='/register'>Register</Link>
						</>
					) : (
						<div className='login-info'>
							<Link to='/profile'>View Profile</Link>
							<p>
								Signed in as {userInfo.nameFirst}{" "}
								{userInfo.nameLast}
							</p>
							<button onClick={onClickHandler}>(Sign out)</button>
						</div>
					)}
				</>
			</Wrapper>
		</Container>
	);
};

export default NavBar;
