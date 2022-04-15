import React from 'react';
import { useHistory } from 'react-router-dom';
import { homeCategories } from '../../data/category_icon';
import styled from 'styled-components';

const Category = () => {
	const history = useHistory();
	const onCategory = (title) => {
		history.push({
			pathname: '/product',
			state: { part: title, subPart: null },
		});
	};

	return (
		<Container>
			<CategoryWrap>
				<Title>카테고리</Title>
				<TitleDes>어떤 종류의 식품을 찾고 계신가요?</TitleDes>
				<CategoryBox>
					{homeCategories.map((el, idx) => (
						<IconBox
							key={idx}
							onClick={() => {
								onCategory(el.title);
							}}
						>
							<IconImg alt={`${el.title} image`} src={el.src} />
							<IconTitle>{el.title}</IconTitle>
						</IconBox>
					))}
				</CategoryBox>
			</CategoryWrap>
		</Container>
	);
};

export default Category;
const Container = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 5rem 0;
`;
const CategoryWrap = styled.div`
	max-width: 101.9rem;
	width: 100%;
	margin: auto;
	text-align: center;
`;

const Title = styled.h2`
	font-size: 4rem;
	font-family: 'kr-b';
	letter-spacing: -1.6px;
	color: #221814;
`;
const TitleDes = styled.p`
	font-size: 1.8rem;
	font-family: 'kr-r';
	letter-spacing: -0.72px;
	color: #7c7c7c;
`;
const CategoryBox = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
`;
const IconBox = styled.div`
	width: 14.5rem;
	height: 18.5rem;
	margin: 2.05rem 5.5rem;
	cursor: pointer;
`;
const IconImgBox = styled.div`
	width: 100%;
`;
const IconImg = styled.img`
	width: 14.5rem;
	height: 14.5rem;
`;
const IconTitle = styled.p`
	font-size: 2.8rem;
	font-family: 'kr-b';
	letter-spacing: -1.12px;
	color: #5c5c5c;
`;
