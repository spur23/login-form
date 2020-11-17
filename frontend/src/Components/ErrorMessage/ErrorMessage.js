import React from "react";
import Error from "./ErrorMessageStyle";

const ErrorMessage = ({ children }) => {
	return <Error>{children}</Error>;
};

export default ErrorMessage;
