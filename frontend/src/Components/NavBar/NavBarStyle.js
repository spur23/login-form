import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background: #74b9ff;
	height: 10vh;
`;

export const Wrapper = styled.nav`
	display: flex;
	align-items: flex-end;

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

	& .login-info {
		display: flex;
		margin: 0;
		& p {
			margin: 0;
			color: #ffeaa7;
		}
	}
`;
