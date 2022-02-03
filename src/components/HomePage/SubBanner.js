import React from 'react';
import styled from 'styled-components';
import Image1 from '../../images/sub-banner1.png';

const SubBanner = () => {
	const Images = [Image1];

	return (
		<SubBannerContainer>
			<SubBannerWrap>
				{Images.map((el, idx) => (
					<SubBannerList key={idx}>
						<SubBannerImg alt='sub_banner img' src={el} />
					</SubBannerList>
				))}
			</SubBannerWrap>
		</SubBannerContainer>
	);
};

export default SubBanner;

const SubBannerContainer = styled.div`
	width: 192rem;
	height: 56.6rem;
	display: flex;
	justify-content: center;
`;
const SubBannerWrap = styled.ul`
	width: 120rem;
	height: 35rem;
	margin-bottom: 21.6rem;
	/* overflow-x: hidden; */
`;
const SubBannerList = styled.li`
	width: 100%;
	height: 100%;
`;
const SubBannerImg = styled.img`
	width: 100%;
	height: 100%;
`;
