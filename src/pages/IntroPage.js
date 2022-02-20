import React from 'react';
import styled from 'styled-components';
import Induce from '../components/Induce';
import Footer from '../components/Footer';
import bnnTop from '../images/intro_bnn_top.png';
import bnnBottom from '../images/intro_bnn_bottom.png';

import cabbage from '../images/intro_cabbage.png';
import dish from '../images/intro_dish.png';
import egg from '../images/intro_egg.png';
import watermelon from '../images/intro_watermelon.png';

const IntroPage = () => {
	const intro = [
		{
			title: `안녕하세요!\n품생품사입니다.`,
			text: `저희 임직원은 상품의 본질에 가치를 더해 생산자와 소비자의\n눈 맞춤 MD 역량에 핵심가치를 두고 있습니다.\n2011년 02월 설립 이후, 일본 Creative Yoko와 펫 파라다이스\n한국 총판 계약을 통한 국내 반려동물 온라인 시장을 개척하였고,\n이후 온라인 및 홈쇼핑 방송을 통한 “온라인 기반 역량”을 축적하였습니다.`,
			point: `상품의 본질에 가치를 더해 ——`,
		},
		{
			title: `품생품사는\n찾고 있습니다.`,
			text: `자사의 온라인 역량을 기반으로\n온・오프라인 종합 플랫폼 서비스를 제공받을\n품생품사의 파트너를 찾고 있습니다.`,
			point: `‘온・오프라인\n종합 플랫폼 서비스’`,
			src: dish,
		},
		{
			src: cabbage,
			text: `생산자 기반 역량은 가지고 있으나\n채널 구축에 대해 고민하고 있는 파트너`,
			point: `채널 구축에 대한 고민`,
		},
		{
			src: watermelon,
			text: `오프라인 역량은 시장에서 충분하나\n온라인 영역에서의 시장을 고민하고 있는 파트너`,
			point: `온라인 영역에 대한 고민`,
		},
		{
			src: egg,
			text: `기존 온라인 시장 진출은 하였으나\n확대 전력을 고민하고 있는 파트너`,
			point: `확대 전력에 대한 고민`,
		},
		{
			title: `“상품의 작은\n차이를 만들어 간다”`,
			text: `저희 임직원은 “상품의 작은 차이를 만들어 간다”라는 비전 아래\n최종 소비자와 유통사에 더 높은 가치의 제품과 서비스를\n제공하는 기업이 되도록 노력하고 있습니다. 감사합니다.`,
			point: `(주)엔투디 권영성 대표`,
		},
	];
	return (
		<div id="container">
			<Container>
				<BackgroundImg alt="intro banner" src={bnnTop} />
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
				<IntroTextBox bottom>
					<IntroTextTitle>{intro[5].title}</IntroTextTitle>
					<IntroText>{intro[5].text}</IntroText>
					<IntroTextPoint>{intro[5].point}</IntroTextPoint>
				</IntroTextBox>
				<BackgroundImg alt="intro banner" src={bnnBottom} />
			</Container>
			<Induce />
			<Footer />
		</div>
	);
};

export default IntroPage;

const Container = styled.div`
	width: 192rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 5rem;
`;
const BackgroundImg = styled.img`
	width: 100%;
	height: 66.2rem;
`;
const IntroTextBox = styled.div`
	width: 120rem;
	margin: auto;
	white-space: pre-wrap;
	${(props) => props.top && `text-align:start; position:relative; top:-17rem;`}
	${(props) =>
		props.middle &&
		`width:83.7rem; height:83.7rem; text-align:end; background-image:url(${props.middle}); background-size:100% 100%; padding:16.8rem 17rem 17rem 20rem; margin:-25em 18.7rem 0 auto; `}
		${(props) => props.bottom && `margin-bottom:-15rem; z-index:99`}
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
	color: #221814;
	margin-bottom: 3rem;
`;
const IntroTextPoint = styled.p`
	font-size: 5.2rem;
	font-family: 'kr-r';
	letter-spacing: -0.208rem;
	color: #221814;
`;
const IntroWorryBox = styled.div`
	width: 125rem;
	margin: -23rem auto 0;
	${(props) => props.top && `text-align:start; z-index:99`}
	${(props) =>
		props.middle && `text-align:center; margin: -24rem auto 0;z-index:98;`}
	${(props) =>
		props.bottom && `text-align:end; margin: -22rem auto 0; z-index:97;`}
`;
const WorryImg = styled.img`
	width: 38rem;
	height: 50.1rem;
	margin-bottom: -9rem;
`;
