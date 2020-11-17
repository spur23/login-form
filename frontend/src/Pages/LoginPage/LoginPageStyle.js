import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: auto;
	margin-top: 5rem;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
	border-radius: 4px;
	width: 50vw;
	& form {
		display: flex;
		flex-direction: column;
		width: 20vw;
		align-items: center;
		justify-items: center;
		& button {
			width: 5rem;
			margin-top: 1rem;
		}
		& .input-container {
			margin-top: 1rem;
			display: flex;
			flex-direction: column;
		}
	}
`;

export default Container;
