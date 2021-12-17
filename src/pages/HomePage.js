import React from 'react';
import MainBanner from '../components/HomePage/MainBanner';
import SubBanner from '../components/HomePage/SubBanner';
import MainGoods from '../components/HomePage/MainGoods';
import Induce from '../components/Induce';
import Footer from '../components/Footer';

const HomePage = () => {
	return (
		<div id='container'>
			<MainBanner />
			<SubBanner />
			<MainGoods />
			<Induce />
			<Footer />
		</div>
	);
};

export default HomePage;
