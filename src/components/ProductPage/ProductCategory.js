import React, { useState } from 'react';
import styled from 'styled-components';
import * as category from '../../data/category';

const ProductCategory = (props) => {
	console.log(props.mainCategory);
	const mainCategoryController = (e) => {
		props.getMainCategory(e.target.innerText);
	};
	const subCategoryController = (e) => {
		props.getSubCategory(e.target.innerText);
	};
	return (
		<ProductCategoryWrap>
			<MainCategoryWrap>
				{category.mainCategories.map((el, idx) => (
					<MainCategoryList
						key={idx}
						active={props.mainCategory === el}
						onClick={mainCategoryController}>
						{el}
					</MainCategoryList>
				))}
			</MainCategoryWrap>
			<SubCategoryWrap>
				{category.subCategories.map((el, idx) => (
					<SubCategoryList
						key={idx}
						active={props.subCategory === el}
						onClick={subCategoryController}>
						{el}
					</SubCategoryList>
				))}
			</SubCategoryWrap>
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
const MainCategoryWrap = styled.ul`
	width: 100%;
	height: 7rem;
	display: flex;
	align-items: center;
	background: #ffffff 0% 0% no-repeat padding-box;
	box-shadow: 0px 3px 18px #00000029;
	border-radius: 4px;
`;
const MainCategoryList = styled.li`
	width: 12rem;
	height: 7rem;
	line-height: 7rem;
	text-align: center;
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #221814;
	letter-spacing: -0.72px;
	${(props) =>
		props.active &&
		`font-family:'kr-b'; border:3px solid #E50011; border-radius:4px;`}
`;
const SubCategoryWrap = styled.ul`
	height: 2.6rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const SubCategoryList = styled.li`
	height: 2.6rem;
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #000000;
	padding: 0 0.5rem;
	border-right: 1px solid #000;
	&:nth-last-child(1) {
		border: none;
	}
	${(props) =>
		props.active && `font-family:'kr-b' ; border-bottom:2px solid #E50011`}
`;
