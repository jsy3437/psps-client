import React from 'react';
import styled from 'styled-components';
import Background1 from '../images/main-banner1.png';

const MainBanner = () => {
	const Backgrounds = [Background1];

	return (
		<MainBannerWrap>
			{Backgrounds.map((el, idx) => (
				<MainBannerList key={idx}>
					<MainBannerImg src={el} />
				</MainBannerList>
			))}
		</MainBannerWrap>
	);
};

export default MainBanner;

const MainBannerWrap = styled.ul`
	display: flex;
	width: 192rem;
	height: 108rem;
	z-index: -5;
	/* overflow-x: hidden; */
`;
const MainBannerList = styled.li`
	width: 100%;
	height: 100%;
`;
const MainBannerImg = styled.img`
	width: 100%;
	height: 100%;
`;
