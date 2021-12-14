import React from 'react';
import MainBanner from '../components/MainBanner';
import SubBanner from '../components/SubBanner';
import MainGoods from '../components/MainGoods';
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
