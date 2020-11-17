import styled from "styled-components";

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	width: 25vw;
	margin: 2rem auto;
	margin-top: 0;
	padding: 1.5rem;

	& button {
		padding: 10px 15px;
		margin-top: 1rem;
		border-radius: 4px;
		border: none;
		box-shadow: 0 0 4px #ecf0f1;
		width: 150px;
		background: #2980b9;
		color: #fff;
		cursor: pointer;
		align-self: flex-end;
	}

	& input {
		padding: 0.5rem;
		border: none;
		border-bottom: 1px solid #777;
		background-color: #ecf0f1;
		outline: none;
		font-size: 1.1rem;
		box-sizing: border-box;
		margin: 0.5em 0 0.5em 0;
	}

	& .input-error {
		height: 1.5rem;
	}
`;

export default StyledForm;
