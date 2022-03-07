import React from 'react';
import styled from 'styled-components';
import * as category from '../../data/category';

const ProductCategory = (props) => {
	const onChangePart = (e) => {
		props.setPart(e.target.innerText);
	};
	const onChangeSubPart = (e) => {
		const innerText = e.target.innerText;
		innerText === '전체보기'
			? props.setSubPart(null)
			: props.setSubPart(innerText);
	};

	return (
		<ProductCategoryWrap>
			<PartWrap>
				{category.mainCategories.map((el, idx) => (
<<<<<<< HEAD
					<PartList
						key={idx}
						active={props.part === el}
						onClick={onChangePart}>
=======
					<PartList key={idx} active={props.part === el} onClick={onChangePart}>
>>>>>>> psps/seoyoon
						{el}
					</PartList>
				))}
			</PartWrap>
			<SubPartWrap>
<<<<<<< HEAD
				{props.subPartArr.map((el, idx) => (
					<SubPartList
						key={idx}
						active={
							(idx === 0 && props.subPart === null) ||
							(idx > 0 && props.subPart === el)
						}
						onClick={onChangeSubPart}>
						{el}
					</SubPartList>
				))}
=======
				{props.subPartArr &&
					props.subPartArr.arr.map((el, idx) => (
						<SubPartListBox key={idx}>
							<SubPartList
								active={
									(idx === 0 && props.subPart === null) ||
									(idx > 0 && props.subPart === el)
								}
								onClick={onChangeSubPart}
							>
								{el}
							</SubPartList>
							<SubPartListLine
								last={idx === props.subPartArr.arr.length - 1}
							></SubPartListLine>
						</SubPartListBox>
					))}
>>>>>>> psps/seoyoon
			</SubPartWrap>
		</ProductCategoryWrap>
	);
};

export default ProductCategory;

const ProductCategoryWrap = styled.div`
	width: 95.3rem;
	height: 13.2rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	position: absolute;
	top: 50.5rem;
	z-index: 3;
`;
const PartWrap = styled.ul`
	width: 100%;
	height: 7rem;
	display: flex;
	align-items: center;
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 18px #00000029;
	border-radius: 4px;
	cursor: pointer;
`;
const PartList = styled.li`
	width: 12rem;
	height: 7rem;
<<<<<<< HEAD
	line-height: 7rem;
=======
	line-height: 6.5rem;
>>>>>>> psps/seoyoon
	text-align: center;
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #221814;
<<<<<<< HEAD
	letter-spacing: -0.72px;
	${(props) =>
		props.active &&
		`font-family:'kr-b'; border:3px solid #E50011; border-radius:4px;`}
=======
	padding: 0.3rem;
	letter-spacing: -0.72px;
	${(props) =>
		props.active &&
		`font-family:'kr-b'; border:3px solid #E50011; border-radius:4px; padding:0`}
>>>>>>> psps/seoyoon
`;
const SubPartWrap = styled.ul`
	height: 2.6rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;
<<<<<<< HEAD
const SubPartList = styled.li`
	height: 2.6rem;
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #000000;
	padding: 0 0.5rem;
	border-right: 1px solid #000;
=======
const SubPartListBox = styled.li`
	display: flex;
	align-items: center;
	&:nth-last-child(1).SubPartListLine {
		display: none;
	}
`;
const SubPartList = styled.p`
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #000000;
	/* padding: 0 0.3rem; */
	/* border-right: 1px solid #000; */
>>>>>>> psps/seoyoon
	cursor: pointer;
	&:nth-last-child(1) {
		border: none;
	}
	${(props) =>
		props.active && `font-family:'kr-b' ; border-bottom:2px solid #E50011`}
`;
<<<<<<< HEAD
=======
const SubPartListLine = styled.div`
	width: 0.1rem;
	height: 1.3rem;
	background-color: #8e8e8e;
	margin: 0 1rem;
	${(props) => props.last && `display:none`}
`;
>>>>>>> psps/seoyoon
