import React from 'react';
import styled from 'styled-components';
import logo from '../images/red-logo.svg';
import * as info from '../config';

const Footer = () => {
	const headLeft = ['이용약관', '개인정보처리방침'];
	const headRight = ['자주묻는질문', '문의하기'];
	const bodyRight = [
		['T', info.COMPANY_CONTACT],
		['M', info.OWNER_CONTACT],
	];
	const infoLeft = `${info.COMPANY_NAME} 대표이사 : ${info.COMPANY_OWNER} | 주소 : ${info.COMPANY_PLACE}\n사업자등록번호 : ${info.BUSINESS_NUMBER} | 통신판매신고번호 : ${info.REPORT_NUMBER}\n개인정보관리책임자 : ${info.PRIVACY_PERSON} (${info.PRIVACY_EMAIL})\n\n©2021 CetusStudio Inc.All rights reserved.`;
	const infoRight = `평일:08:30~17:30\n점심:12:00~13:30\n(토,일 및 공휴일 휴일)`;

	return (
		<FooterWrap>
			<FooterHead>
				<FooterHeadInside>
					<FooterHeadLeft>
						{headLeft.map((el, idx) => (
							<HeadLeftText key={idx} effect={idx === 1}>
								{el}
							</HeadLeftText>
						))}
					</FooterHeadLeft>
					<FooterHeadRight>
						{headRight.map((el, idx) => (
							<HeadRightButton key={idx} effect={idx === 1}>
								{el}
							</HeadRightButton>
						))}
					</FooterHeadRight>
				</FooterHeadInside>
			</FooterHead>
			<FooterBody>
				<FooterBodyInside>
					<FooterBodyLeft>
						<BodyLeftImg alt='logo' src={logo} />
						<BodyLeftText>{infoLeft}</BodyLeftText>
					</FooterBodyLeft>
					<FooterBodyRight>
						<BodyRightTitle>고객센터</BodyRightTitle>
						{bodyRight.map((el, idx) => (
							<BodyRightContact key={idx}>
								<RightContactText effect>{el[0]}</RightContactText>
								<RightContactText>{el[1]}</RightContactText>
							</BodyRightContact>
						))}
						<BodyRightText>{infoRight}</BodyRightText>
					</FooterBodyRight>
				</FooterBodyInside>
			</FooterBody>
		</FooterWrap>
	);
};

export default Footer;

const FooterWrap = styled.div`
	width: 100%;
	height: 28.4rem;
	display: flex;
	flex-direction: column;
	border-top: 1px solid #8e8e8e;
`;
const FooterHead = styled.div`
	width: 100%;
	height: 6rem;
	display: flex;
	justify-content: center;
	background: #ffffff 0% 0% no-repeat padding-box;
	border-bottom: 1px solid #e6e6e6;
`;
const FooterHeadInside = styled.div`
	width: 120rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const FooterHeadLeft = styled.div`
	display: flex;
	align-items: center;
`;
const HeadLeftText = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #8e8e8e;
	padding: 0 1rem;
	${(props) =>
		props.effect && 'border-left:1px solid #8e8e8e; font-family:"kr-b";'}
`;

const FooterHeadRight = styled.div`
	display: flex;
	align-items: center;
`;
const HeadRightButton = styled.button`
	width: 10rem;
	height: 3.2rem;
	font-size: 1.4rem;
	font-family: 'kr-b';
	color: #8e8e8e;
	background: #ffffff 0% 0% no-repeat padding-box;
	border: 1px solid #8e8e8e;
	border-radius: 4px;
	${(props) => props.effect && `margin-left:2rem;`}
`;

const FooterBody = styled.div`
	width: 100%;
	height: 22.4rem;
	display: flex;
	justify-content: center;
`;
const FooterBodyInside = styled.div`
	width: 120rem;
	margin-top: 1.9rem;
	display: flex;
	justify-content: space-space-between;
`;
const FooterBodyLeft = styled.div`
	width: 70%;
`;
const BodyLeftImg = styled.img`
	width: 3.6rem;
	height: 3.6rem;
	margin-bottom: 1.7rem;
`;
const BodyLeftText = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #6b6462;
	letter-spacing: -0.28px;
`;
const FooterBodyRight = styled.div`
	width: 30%;
`;
const BodyRightTitle = styled.h3`
	text-align: right;
	font-size: 2.4rem;
	font-family: 'kr-b';
	color: #6b6462;
`;
const BodyRightContact = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	text-align: right;
`;
const RightContactText = styled.p`
	font-size: 2rem;
	font-family: 'kr-b';
	color: #221814;
	text-align: right;
	${(props) => props.effect && `color:#E50011; margin-right:0.2rem`}
`;
const BodyRightText = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #6b6462;
	text-align: right;
`;
