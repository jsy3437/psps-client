import React from 'react';
import MainBanner from '../components/HomePage/MainBanner';
import SubBanner from '../components/HomePage/SubBanner';
import RecommendList from '../components/HomePage/RecommendList';
import Induce from '../components/Induce';
import Footer from '../components/Footer';
<<<<<<< HEAD

const HomePage = () => {
	return (
		<div id='container'>
			<MainBanner />
=======
import Category from '../components/HomePage/Category';
import styled from 'styled-components';

const HomePage = () => {
	return (
		<div id="container">
			<MainBanner />
			<Category />
>>>>>>> psps/seoyoon
			<SubBanner />
			<RecommendList />
			<Induce />
			<Footer />
		</div>
	);
};

export default HomePage;
