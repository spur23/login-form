import React from "react";
import styled from "styled-components";

const Error = styled.span`
	color: #d63031;
	background-color: #fab1a0;
	border: 1px solid #e17055;
	border-radius: 3px;
	height: 2rem;
`;

const ErrorMessage = ({ children }) => {
	return <Error>{children}</Error>;
};

export default ErrorMessage;
