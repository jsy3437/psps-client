import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../images/red-logo.svg';
import Check from '../../images/check-box.svg';
import UnCheck from '../../images/uncheck-box.svg';
import NLogo from '../../images/n-logo.svg';
import KLogo from '../../images/k-logo.svg';

const FirstStep = (props) => {
	const history = useHistory();
	const [agreeCheck, setAgreeCheck] = useState(false);
	const [check, setCheck] = useState({
		email: false,
		password: false,
		confirm: false,
	});
	const arr = [
		{
			title: '이메일',
			placeholder: '이메일 주소를 입력해주세요.',
			errorMessage: '이메일 주소 형식이 틀렸습니다.',
		},
		{
			title: '비밀번호',
			placeholder: '비밀번호를 입력해주세요.',
			errorMessage:
				'비밀번호는 10자리 이상으로 숫자,알파벳,특수문자를 포함해야 합니다.',
		},
		{
			title: '비밀번호 확인',
			placeholder: '비밀번호를 확인해주세요.',
			errorMessage: '비밀번호가 일치하지 않습니다.',
		},
	];
	const agreeCheckController = () => {
		setAgreeCheck(!agreeCheck);
	};
	const goLogin = () => {
		history.push('/login');
	};
	const goNext = () => {
		props.getStep(2);
	};

	return (
		<Container>
			<RegisterInside>
				<LogoImg alt='로고이미지' src={Logo} />
				<Title>품생품사 회원가입</Title>
				{arr.map((el, idx) => (
					<Items key={idx} last={idx === 2}>
						<ItemTitle>{el.title}</ItemTitle>
						<ItemInput placeholder={el.placeholder} />
						{/* 제출을 한 상태이고 잘못된 항목이 있는 경우에만 출력 */}
						{/* <InputError>{el.errorMessage}</InputError> */}
					</Items>
				))}
				<AgreeBox>
					<AgreeLeft>
						<AgreeCheck
							alt=''
							src={agreeCheck ? Check : UnCheck}
							onClick={agreeCheckController}
						/>
						<AgreeAllText onClick={agreeCheckController}>
							품생품사 가입 약관에 모두 동의합니다.
						</AgreeAllText>
					</AgreeLeft>
					<AgreeRight>확인하기</AgreeRight>
				</AgreeBox>
				<AgreeContents>
					품생품사 이용약관(필수), 개인정보취급방침(필수)
				</AgreeContents>
				<SubmitButton onClick={goNext}>다음으로</SubmitButton>
				<EasyBox>
					<EasyLeft>
						<EasyLeftText>SNS계정으로 간편하게 시작하기</EasyLeftText>
						<GoLoginBox>
							<EasyLeftText>이미 회원이신가요?</EasyLeftText>
							<GoLogin onClick={goLogin}>로그인 하기</GoLogin>
						</GoLoginBox>
					</EasyLeft>
					<EasyRight>
						<SocialLogoBox NLogo>
							<SocialLogo alt='아이콘' src={NLogo} />
						</SocialLogoBox>
						<SocialLogoBox KLogo>
							<SocialLogo alt='아이콘' src={KLogo} />
						</SocialLogoBox>
					</EasyRight>
				</EasyBox>
			</RegisterInside>
		</Container>
	);
};

export default withRouter(FirstStep);

const Container = styled.div`
	width: 192rem;
	padding: 10rem 0 10.3rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const RegisterInside = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const LogoImg = styled.img`
	width: 6.4rem;
	height: 6.4rem;
	margin-bottom: 0.8rem;
`;
const Title = styled.h2`
	height: 4.4rem;
	font-size: 3rem;
	font-family: 'kr-b';
	color: #000000;
	margin-bottom: 4rem;
`;
const Items = styled.li`
	position: relative;
	${(props) => (props.last ? `margin-bottom:1.6rem;` : `margin-bottom:2rem`)}
`;
const ItemTitle = styled.p`
	height: 2rem;
	line-height: 2rem;
	position: absolute;
	top: -0.8rem;
	left: 1rem;
	padding: 0 0.5rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #221814;
	background-color: #fff;
`;
const ItemInput = styled.input`
	width: 34.6rem;
	height: 6.4rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #221814;
	padding-left: 1.2rem;
	border: 1px solid #c6c6c6;
	border-radius: 4px;
	background-color: #fff;
	&::placeholder {
		color: #c6c6c6;
	}
	&:focus {
		box-shadow: 2px 6px 15px #00000029;
	}
`;
const InputError = styled.p`
	height: 1.5rem;
	font-size: 1rem;
	font-family: 'kr-r';
	color: #e50011;
`;

const AgreeBox = styled.div`
	width: 34.6rem;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const AgreeLeft = styled.div`
	display: flex;
	align-items: center;
`;
const AgreeCheck = styled.img`
	width: 1.6rem;
	height: 1.6rem;
`;
const AgreeAllText = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-b';
	color: #6b6462;
	margin-left: 0.9rem;
`;
const AgreeRight = styled.div`
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #6b6462;
	text-decoration: underline;
	&:hover {
		color: #e50011;
	}
`;
const AgreeContents = styled.p`
	width: 100%;
	text-align: left;
	margin-top: 0.8rem;
	margin-bottom: 1.6rem;
	font-size: 1rem;
	font-family: 'kr-r';
	color: #a0a0a0;
`;
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	margin-bottom: 4rem;
	font-size: 2.4rem;
	font-family: 'kr-r';
	color: #e50011;
	background-color: #fff;
	border: 1px solid #e50011;
	border-radius: 4px;
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
const EasyBox = styled.div`
	width: 100%;
	height: 5.2rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const EasyLeft = styled.div``;
const EasyLeftText = styled.p`
	font-size: 1.6rem;
	font-family: 'kr-b';
	color: #221814;
`;
const GoLoginBox = styled.div`
	display: flex;
	align-items: center;
`;
const GoLogin = styled.p`
	font-size: 1.6rem;
	font-family: 'kr-r';
	color: #6b6462;
	margin-left: 0.7rem;
	text-decoration: underline;
	&:hover {
		color: #e50011;
	}
`;
const EasyRight = styled.div`
	display: flex;
	align-items: center;
`;
const SocialLogoBox = styled.div`
	width: 5.2rem;
	height: 5.2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	${(props) =>
		props.NLogo
			? `background-color:#50AA34`
			: `background-color: #FFE733; margin-left:0.8rem;`}
`;
const SocialLogo = styled.img`
	width: 3.6rem;
	height: 3.6rem;
`;
