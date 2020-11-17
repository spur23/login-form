import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 50vw;
	height: auto;
	margin: 2.5rem auto;
	padding: 1.5rem;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
	border-radius: 4px;

	& .password-requirements {
		height: 30vh;
		width: 40%;
		align-self: center;
		& p {
			margin: 0;
		}
		& .icon {
			width: 5%;
		}
	}

	& .register-error {
		margin-top: 5rem;
	}
`;

export const FormContainer = styled.div`
	display: flex;
	flex-direction: row;
`;
