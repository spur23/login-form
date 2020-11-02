import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.nav`
	background: #74b9ff;
	height: 10vh;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	right: 0;
	left: 0;
	& a {
		margin-right: 2rem;
		text-decoration: none;
		cursor: pointer;
	}
	& a:visited {
		color: #ffeaa7;
	}
	& a:hover {
		transform: scale(1.02);
	}
`;

const routes = [
	{
		path: "/home",
		text: "Home",
	},
	{
		path: "/login",
		text: "Login",
	},
	{
		path: "register",
		text: "Register",
	},
];

const NavBar = () => {
	return (
		<Wrapper>
			{routes.map((route, i) => (
				<Link to={route.path} exact={route.exact} key={i}>
					{route.text}
				</Link>
			))}
		</Wrapper>
	);
};

export default NavBar;
