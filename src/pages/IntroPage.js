import React from 'react';
import styled from 'styled-components';
import Induce from '../components/Induce';
import Footer from '../components/Footer';
import logo from '../images/red-logo.svg';
import ex1 from '../images/ex1.png';

const IntroPage = () => {
	return (
		<div id='container'>
			<WhiteBackground style={{ height: '62.4rem' }} />
			<ShadowUpBackground>
				<TopImg alt='' src={ex1} />
			</ShadowUpBackground>
			<BlackBackground />
			<ShadowDownBackground />
			<WhiteBackground style={{ height: '178.9rem' }}>
				<BottomText first>이를 위한 해결책이 되겠습니다.</BottomText>
				<BottomText second>저희는 품질에 살고, 품질에 죽는</BottomText>
				<BottomBox>
					<BottomLogo alt='logo' src={logo} />
					<BottomBigText>입니다</BottomBigText>
				</BottomBox>
			</WhiteBackground>
			<Induce />
			<Footer />
		</div>
	);
};

export default IntroPage;

const WhiteBackground = styled.div`
	width: 100%;
	background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
	background: #ffffff 0% 0% no-repeat padding-box;
	opacity: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const BlackBackground = styled.div`
	width: 100%;
	height: 145.9rem;
	background: #000000 0% 0% no-repeat padding-box;
`;
const ShadowUpBackground = styled.div`
	width: 100%;
	height: 72.1rem;
	background: transparent linear-gradient(180deg, #ffffff00 0%, #000000 100%)
		0% 0% no-repeat padding-box;
	display: flex;
	justify-content: center;
	position: relative;
`;
const TopImg = styled.img`
	width: 63rem;
	height: 71.7rem;
	position: absolute;
	top: -25%;
`;
const ShadowDownBackground = styled.div`
	width: 100%;
	height: 72.1rem;
	background: transparent linear-gradient(0deg, #ffffff00 0%, #000000 100%) 0%
		0% no-repeat padding-box;
	opacity: 1;
`;
const BottomText = styled.p`
	height: 4.8rem;
	line-height: 4.8rem;
	font-size: 4rem;
	font-family: 'kr-b';
	color: #221814;
	${(props) => props.first && `margin:5.5rem 0 39.2rem 0`}
	${(props) => props.second && `margin-bottom:36.7rem`}
`;
const BottomBox = styled.div`
	display: flex;
	align-items: flex-end;
	margin-bottom: 60.4rem;
`;
const BottomLogo = styled.img`
	width: 41.2rem;
	height: 41.2rem;
`;
const BottomBigText = styled.p`
	margin-left: 4.7rem;
	height: 11.7rem;
	line-height: 11.7rem;
	font-size: 9.8rem;
	font-family: 'kr-b';
	color: #221814;
	letter-spacing: -3.92px;
`;
