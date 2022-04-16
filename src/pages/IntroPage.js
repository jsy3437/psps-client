import React, { useEffect } from 'react';
import { intro } from '../data/intro';
import styled from 'styled-components';
import bnn_top from '../images/intro_bnn_top.png';
import bnn_bottom from '../images/intro_bnn_bottom.png';
import Induce from '../components/Induce';

const IntroPage = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div id="container">
			<Container>
				<BackgroundImg alt="intro banner" src={bnn_top} />
				<InsideWarp>
					<IntroTextBox top>
						<IntroTextTitle>{intro[0].title}</IntroTextTitle>
						<IntroText>{intro[0].text}</IntroText>
						<IntroTextPoint>{intro[0].point}</IntroTextPoint>
					</IntroTextBox>
					<IntroTextBox middle={intro[1].src}>
						<IntroTextTitle>{intro[1].title}</IntroTextTitle>
						<IntroText>{intro[1].text}</IntroText>
						<IntroTextPoint>{intro[1].point}</IntroTextPoint>
					</IntroTextBox>
					<WorryWrap>
						<IntroWorryBox top>
							<WorryImg alt="worry image" src={intro[2].src} />
							<IntroTextPoint>{intro[2].point}</IntroTextPoint>
							<IntroText>{intro[2].text}</IntroText>
						</IntroWorryBox>
						<IntroWorryBox middle>
							<WorryImg alt="worry image" src={intro[3].src} />
							<IntroTextPoint>{intro[3].point}</IntroTextPoint>
							<IntroText>{intro[3].text}</IntroText>
						</IntroWorryBox>
						<IntroWorryBox bottom>
							<WorryImg alt="worry image" src={intro[4].src} />
							<IntroTextPoint>{intro[4].point}</IntroTextPoint>
							<IntroText>{intro[4].text}</IntroText>
						</IntroWorryBox>
					</WorryWrap>
					<IntroTextBox bottom>
						<IntroTextTitle>{intro[5].title}</IntroTextTitle>
						<IntroText>{intro[5].text}</IntroText>
						<IntroTextPoint>{intro[5].point}</IntroTextPoint>
					</IntroTextBox>
				</InsideWarp>
				<BackgroundImg alt="intro banner" src={bnn_bottom} />
			</Container>
			<Induce />
		</div>
	);
};

export default IntroPage;

const Container = styled.div`
	width: 192rem;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 5rem;
	-ms-user-select: none;
	-moz-user-select: -moz-none;
	-khtml-user-select: none;
	-webkit-user-select: none;
	user-select: none;
`;
const BackgroundImg = styled.img`
	width: 100%;
	height: 66.2rem;
	height: 100%;
	object-fit: contain;
`;
const InsideWarp = styled.div`
	max-width: 137.3rem;
	width: 100%;
	z-index: 99;
	padding: 0 2rem;
`;
const IntroTextBox = styled.div`
	width: 120rem;
	width: 100%;
	margin: auto;
	white-space: pre-wrap;
	${(props) => props.top && `text-align:start; position:relative; top:-17rem;`}
	${(props) =>
		props.middle &&
		`width:83.7rem; height:83.7rem; text-align:end; background-image:url(${props.middle}); background-size:100% 100%; padding:16rem 17rem 17rem 20rem; margin:-25em  0 0 auto; `}
		${(props) => props.bottom && `margin-bottom:-15rem;`}
`;
const IntroTextTitle = styled.h2`
	font-size: 8rem;
	font-family: 'kr-b';
	letter-spacing: -0.32rem;
	color: #221814;
	line-height: 10rem;
	margin-bottom: 2.5rem;
`;
const IntroText = styled.p`
	font-size: 2.1rem;
	font-family: 'kr-r';
	letter-spacing: -0.084rem;
	color: #6b6462;
	margin-bottom: 3rem;
	margin-top: 2.6rem;
`;
const IntroTextPoint = styled.p`
	font-size: 5.2rem;
	font-family: 'kr-r';
	letter-spacing: -0.208rem;
	color: #221814;
`;
const WorryWrap = styled.div`
	width: 100%;
	padding-right: 17rem;
`;
const IntroWorryBox = styled.div`
	width: 125rem;
	width: 100%;
	margin: -23rem auto 0;
	${(props) => props.top && `text-align:start;`}
	${(props) => props.middle && `text-align:center; margin: -4rem auto 0;`}
	${(props) => props.bottom && `text-align:end; margin: -2rem auto 0;`}
`;
const WorryImg = styled.img`
	width: 38rem;
	/* height: 50.1rem; */
	margin-bottom: -5rem;
`;
