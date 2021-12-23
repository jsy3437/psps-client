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
}
#root {
	width: 100vw;
	/* height: 100vh; */
}
#App {
	width:100%;
	height:100%;
	display: flex;
	flex-direction:column;
	align-items:center;
}
#container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-x:hidden;
	position:relative;
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
	background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 6px #00000029;
	border: 2px solid #111a31;
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
