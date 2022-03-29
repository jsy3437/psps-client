import React from 'react';
import MainBanner from '../components/HomePage/MainBanner';
import SubBanner from '../components/HomePage/SubBanner';
import Category from '../components/HomePage/Category';
import RecommendList from '../components/HomePage/RecommendList';
import Induce from '../components/Induce';

const HomePage = () => {
	return (
		<div id="container">
			<MainBanner />
			<Category />
			<SubBanner />
			<RecommendList />
			<Induce />
		</div>
	);
};

export default HomePage;
