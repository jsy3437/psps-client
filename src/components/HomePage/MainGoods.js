import React from 'react';
import styled from 'styled-components';
import Logo from '../../images/red-logo.svg';
import Replace from '../../images/replace.jpg';

const MainGoods = () => {
	const titles = ['품생품사', '추천', '상품'];
	const arr = [
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Replace,
		},
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Replace,
		},
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Replace,
		},
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Replace,
		},
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Replace,
		},
		{
			title: '횡성한우 등심 구이용(1+등급)',
			desc: '16,800원 / 600g',
			img: Replace,
		},
	];

	return (
		<MainGoodsWrap>
			<MainGoodsLogo src={Logo} />
			<BrownBackground />
			<MainGoodsTitles>
				{titles.map((el, idx) => (
					<MainGoodsTitle key={idx} highLight={idx === 1}>
						{el}
					</MainGoodsTitle>
				))}
			</MainGoodsTitles>
			<MainGoodsDesc>
				{`품생품사에서 선별한\n특별한 상품들을 지금 바로 만나보세요!`}
			</MainGoodsDesc>
			<MainGoodsBoundary />
			<GoodsListWrap>
				{arr.map((el, idx) => (
					<GoodsList key={idx}>
						<GoodsImg src={el.img} />
						<GoodsTitle>{el.title}</GoodsTitle>
						<GoodsDesc>{el.desc}</GoodsDesc>
					</GoodsList>
				))}
			</GoodsListWrap>
		</MainGoodsWrap>
	);
};

export default MainGoods;

const MainGoodsWrap = styled.div`
	width: 192rem;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const MainGoodsLogo = styled.img`
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
const MainGoodsTitles = styled.div`
	height: 5.8rem;
	margin-top: 0.2rem;
	display: flex;
`;
const MainGoodsTitle = styled.h2`
	height: 5.8rem;
	line-height: 5.8rem;
	font-size: 4rem;
	font-family: 'kr-b';
	color: #fff;
	${(props) => props.highLight && `color:red`}
`;
const MainGoodsDesc = styled.p`
	height: 5.1rem;
	font-size: 1.8rem;
	color: #fff;
	text-align: center;
`;
const MainGoodsBoundary = styled.div`
	width: 5.2rem;
	height: 0.2rem;
	margin-top: 2.4rem;
	margin-bottom: 3rem;
	background-color: #fff;
`;
const GoodsListWrap = styled.ul`
	width: 120rem;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
`;
const GoodsList = styled.li`
	width: 38rem;
	height: 40rem;
	margin-bottom: 5.9rem;
`;
const GoodsImg = styled.img`
	width: 38rem;
	height: 35rem;
`;
const GoodsTitle = styled.h3`
	height: 2.6rem;
	line-height: 2.6rem;
	font-size: 1.8rem;
	font-family: 'kr-b';
	letter-spacing: -0.72px;
	color: #221814;
`;
const GoodsDesc = styled.p`
	height: 2rem;
	line-height: 2rem;
	font-size: 1.6rem;
	font-family: 'kr-r';
	letter-spacing: -0.32px;
	color: #8e8e8e;
`;
