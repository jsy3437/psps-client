import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
	box-sizing: border-box;
}
html {
	font-size: 62.5%;
}
body {
	margin: 0;
	overflow-x:hidden;

}
#root {
	width: 100vw;
}
#App {
	width:100%;
	height:100%;
	display: flex;
	flex-direction:column;
	align-items:center;
	position:relative;
	padding-top:8rem;
}
#container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-x:hidden;
	position:relative;
	-ms-user-select: none;
	-moz-user-select: -moz-none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	user-select: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
	margin: 0;
}
ul,
li {
	list-style: none;
	padding-left: 0;
}
p {
	margin: 0;
	word-break: keep-all;
	white-space: pre-wrap;
}
textarea {
	resize: none;
}
input {
	background: #f4f4f4 0% 0% no-repeat padding-box;
	border: 2px solid #e5e6ed;
	border-radius: 4px;
}
input:focus,
textarea:focus {
	outline: none;	
	background: #fff 0% 0% no-repeat padding-box;
	box-shadow: 2px 6px 15px #00000029;
}
input:focus::placeholder {
	color: #111a31;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance:none;
}
input[type='number']{
	-moz-appearance: textfield;
}
button:hover {
	cursor: pointer;
}

`;

export default GlobalStyle;
