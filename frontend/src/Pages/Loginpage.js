import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 5rem;
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

const Loginpage = () => {
	const [form, setForm] = useState({});

	const handleChange = (e) => {
		const value = e.target.value;
		const type = e.target.name;
		setForm({ ...form, [type]: value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		console.log("submitted");
	};

	return (
		<Container>
			<form>
				<div className='input-container'>
					<label>Email: </label>
					<input
						type='text'
						value={form.email}
						onChange={handleChange}
						name='email'
					/>
				</div>
				<div className='input-container'>
					<label>Password: </label>
					<input
						type='password'
						value={form.password}
						onChange={handleChange}
						name='password'
					/>
				</div>
				<button type='submit' onClick={submitHandler}>
					Submit
				</button>
			</form>
		</Container>
	);
};

export default Loginpage;
