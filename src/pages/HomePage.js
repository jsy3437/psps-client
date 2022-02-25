import React from 'react';
import MainBanner from '../components/HomePage/MainBanner';
import SubBanner from '../components/HomePage/SubBanner';
import RecommendList from '../components/HomePage/RecommendList';
import Induce from '../components/Induce';
import Footer from '../components/Footer';
import Category from '../components/HomePage/Category';
import styled from 'styled-components';

const HomePage = () => {
	return (
		<div id="container">
			<TestModalBox>{`테스트 아이디\ngusdo3437@naver.com
			\n테스트 비밀번호\nqwert!23`}</TestModalBox>
			<MainBanner />
			<Category />
			<SubBanner />
			<RecommendList />
			<Induce />
			<Footer />
		</div>
	);
};

export default HomePage;

const TestModalBox = styled.div`
	width: 20rem;
	position: fixed;
	background-color: #fff;
	border-radius: 5px;
	top: 10rem;
	right: 10rem;
	font-size: 2rem;
	white-space: pre-wrap;
`;
