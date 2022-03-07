import React from 'react';
import styled from 'styled-components';

const MenuSelect = (props) => {
	const menuController = (e) => {
		props.setMenu(e.target.innerText);
	};

	return (
		<MenuWrap>
			{['주문내역', '개인정보관리'].map((el, idx) => (
				<MenuList
					key={idx}
					active={props.menu === el}
					onClick={menuController}>
					{el}
				</MenuList>
			))}
		</MenuWrap>
	);
};

export default MenuSelect;

const MenuWrap = styled.ul`
	width: 30.4rem;
	height: 7rem;
	display: flex;
	align-items: center;
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 18px #00000029;
	border-radius: 4px;
	margin-top: 0;
	margin-bottom: 2.8rem;
`;
const MenuList = styled.li`
	width: 50%;
	height: 7rem;
	line-height: 7rem;
	text-align: center;
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #221814;
	letter-spacing: -0.72px;
	cursor: pointer;
	${(props) =>
		props.active &&
		`font-family:'kr-b'; border:3px solid #E50011;border-radius: 4px; line-height: 6.5rem;
`}
`;
