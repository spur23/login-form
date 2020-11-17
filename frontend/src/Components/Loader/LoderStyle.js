import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const Container = styled.div`
	align-self: center;
	justify-self: center;
	height: 10vw;
	width: 10vw;
	margin: auto;
	border: 3px solid lightgrey;
	border-top-color: #3498db;
	border-bottom-color: #3498db;
	border-radius: 50%;
	animation: ${rotate} 3s linear infinite;
`;

export default Container;
