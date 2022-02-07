import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { IMG_ADDRESS } from '../../config';
import * as _product from '../../controller/product';
import styled from 'styled-components';
import logo from '../../images/red-logo.svg';

const RecommendList = () => {
	const history = useHistory();
	const titles = ['품생품사', '추천', '상품'];
	const [list, setList] = useState([]);

	useEffect(() => {
		let isSubscribed = true;
		_product.get_recommend_list().then((res) => {
			isSubscribed &&
				res.data.success &&
				setList(res.data.product_recommend_list);
		});
		return () => {
			isSubscribed = false;
		};
	}, []);

	const goDetail = (product_id) => {
		history.push(`/detail/${product_id}`);
	};

	return (
		<RecommendWrap>
			<Logo alt='logo' src={logo} />
			<BrownBackground />
			<Titles>
				{titles.map((el, idx) => (
					<Title key={idx} highLight={idx === 1}>
						{el}
					</Title>
				))}
			</Titles>
			<Desc>{`품생품사에서 선별한\n특별한 상품들을 지금 바로 만나보세요!`}</Desc>
			<Boundary />
			<ListWrap>
				{list.map((el, idx) => (
					<List key={idx}>
						<ListImg
							alt='product img'
							src={`${IMG_ADDRESS}/${el.image}`}
							onClick={() => {
								goDetail(el.product_id);
							}}
						/>
						<ListTitle
							onClick={() => {
								goDetail(el.product_id);
							}}>
							{el.title}
						</ListTitle>
						{/* 상품설명 */}
						{/* <ListDesc>{el.desc}</ListDesc> */}
					</List>
				))}
			</ListWrap>
		</RecommendWrap>
	);
};

export default withRouter(RecommendList);

const RecommendWrap = styled.div`
	width: 192rem;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Logo = styled.img`
	width: 6rem;
	height: 6rem;
	position: absolute;
	top: -7.2rem;
`;
const BrownBackground = styled.div`
	width: 100%;
	height: 37.3rem;
	background: #221814 0% 0% no-repeat padding-box;
	opacity: 1;
	position: absolute;
	top: 0;
	z-index: -3;
`;
const Titles = styled.div`
	height: 5.8rem;
	margin-top: 0.2rem;
	display: flex;
`;
const Title = styled.h2`
	height: 5.8rem;
	line-height: 5.8rem;
	font-size: 4rem;
	font-family: 'kr-b';
	color: #fff;
	${(props) => props.highLight && `color:red`}
`;
const Desc = styled.p`
	height: 5.1rem;
	font-size: 1.8rem;
	color: #fff;
	text-align: center;
`;
const Boundary = styled.div`
	width: 5.2rem;
	height: 0.2rem;
	margin-top: 2.4rem;
	margin-bottom: 3rem;
	background-color: #fff;
`;
const ListWrap = styled.ul`
	width: 120rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
`;
const List = styled.li`
	width: 38rem;
	height: 40rem;
	margin-bottom: 5.9rem;
`;
const ListImg = styled.img`
	width: 38rem;
	height: 35rem;
`;
const ListTitle = styled.h3`
	height: 2.6rem;
	line-height: 2.6rem;
	font-size: 1.8rem;
	font-family: 'kr-b';
	letter-spacing: -0.72px;
	color: #221814;
`;
const ListDesc = styled.p`
	height: 2rem;
	line-height: 2rem;
	font-size: 1.6rem;
	font-family: 'kr-r';
	letter-spacing: -0.32px;
	color: #8e8e8e;
`;
