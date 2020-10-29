const responseError = (res, status, errorMessage) => {
	res.status(status);
	throw new Error(errorMessage);
};

export default responseError;
