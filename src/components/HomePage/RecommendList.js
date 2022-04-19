import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IMG_ADDRESS } from '../../config';
import * as _product from '../../controller/product';
import styled from 'styled-components';
import logo from '../../images/red-logo.svg';

const RecommendList = () => {
	const history = useHistory();
	const [list, setList] = useState([]);
	const [hover, setHover] = useState('');

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
			<Logo alt="logo" src={logo} />
			<Title>{`품생품사 추천 상품`}</Title>
			<Desc>{`품생품사에서 선별한\n특별한 상품들을 지금 바로 만나보세요!`}</Desc>
			<ListWrap>
				{list &&
					list.map((el, idx) => (
						<List
							key={idx}
							onClick={() => {
								goDetail(el.product_id);
							}}
							onMouseEnter={() => {
								setHover(idx);
							}}
							onMouseLeave={() => {
								setHover('');
							}}
						>
							<ListImgBox>
								<ListImg
									alt="product img"
									src={`${IMG_ADDRESS}/${el.image}`}
									hover={hover === idx}
								/>
							</ListImgBox>
							<ListTitle hover={hover === idx}>{el.title}</ListTitle>
							{/* 상품설명 */}
							<ListDescTotalPrice>
								{el.total_price && `${el.total_price.toLocaleString()}`}
								<DescWon>원</DescWon>
								{el.discount !== 0 && (
									<ListDesc>
										{el.price && `${el.price.toLocaleString()} `}
									</ListDesc>
								)}
							</ListDescTotalPrice>
						</List>
					))}
			</ListWrap>
		</RecommendWrap>
	);
};

export default RecommendList;

const RecommendWrap = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Logo = styled.img`
	width: 6rem;
	height: 6rem;
	margin-bottom: 1rem;
`;
const Title = styled.h2`
	height: 5.8rem;
	line-height: 5.8rem;
	font-size: 4rem;
	font-family: 'kr-b';
	${(props) => props.highLight && `color:red`}
`;
const Desc = styled.p`
	height: 5.1rem;
	font-size: 1.8rem;
	color: #8e8e8e;
	text-align: center;
	margin-bottom: 5rem;
`;
const ListWrap = styled.ul`
	width: 120rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 3.2rem 1.6rem;
`;
const List = styled.li`
	width: 38rem;
	height: 40rem;
	cursor: pointer;
	background-color: #fff;
	border-radius: 24px;
`;
const ListImgBox = styled.div`
	width: 38rem;
	height: 35rem;
	overflow: hidden;
	border-radius: 24px;
	background-color: #fff;
`;
const ListImg = styled.img`
	width: 38rem;
	height: 35rem;
	transition: all 300ms ease;
	${(props) => props.hover && `transform:scale(1.1)`}
`;
const ListTitle = styled.h3`
	height: 2.6rem;
	line-height: 2.6rem;
	font-size: 1.8rem;
	font-family: 'kr-r';
	letter-spacing: -0.72px;
	color: #221814;
	${(props) => props.hover && `text-decoration: underline;`}
`;
const ListDesc = styled.span`
	font-size: 1.4rem;
	font-family: 'ro-r';
	letter-spacing: -0.28px;
	color: #a0a0a0;
	margin-left: 0.4rem;
	text-decoration: line-through;
`;
const ListDescTotalPrice = styled.p`
	font-size: 2.4rem;
	font-family: 'ro-b';
	letter-spacing: -0.4px;
	margin-top: 0.2rem;
`;
const DescWon = styled.span`
	font-family: 'kr-r';
	font-size: 1.4rem;
	color: #a0a0a0;
	margin-left: 0.2rem;
`;
