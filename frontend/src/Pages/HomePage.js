import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
	return (
		<div>
			<h3>Welcome!</h3>
			<p>Hello! thanks for visiting my login page.</p>
			<p>
				This web page was created using the MERN stack. Please{" "}
				<Link to='/register'>register</Link> or{" "}
				<Link to='/login'>login</Link> to test the functionality
			</p>
		</div>
	);
};

export default HomePage;
