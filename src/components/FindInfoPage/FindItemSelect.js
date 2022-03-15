import React from 'react';
import styled from 'styled-components';

const FindItemSelect = (props) => {
	const items = ['아이디', '비밀번호'];

	const onChangeItem = (e) => {
		props.setItem(e.target.innerText);
	};

	return (
		<MainCategoryWrap>
			{items.map((el, idx) => (
				<MainCategoryList
					key={idx}
					active={props.item === el}
					onClick={onChangeItem}
				>
					{el}
				</MainCategoryList>
			))}
		</MainCategoryWrap>
	);
};

export default FindItemSelect;

const MainCategoryWrap = styled.ul`
	width: 24rem;
	height: 7rem;
	display: flex;
	align-items: center;
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 18px #00000029;
	border-radius: 14px;
	margin-top: 0;
	margin-bottom: 6rem;
`;
const MainCategoryList = styled.li`
	width: 50%;
	height: 7rem;
	line-height: 7rem;
	text-align: center;
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #221814;
	letter-spacing: -0.72px;
	border-radius: 14px;
	cursor: pointer;
	${(props) => props.active && `font-family:'kr-b'; border:3px solid #E50011;`}

	${(props) =>
		props.active &&
		`font-family:'kr-b'; border:3px solid #E50011;line-height: 6.3rem;
`}
`;
