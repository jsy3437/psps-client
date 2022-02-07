import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/red-logo.svg';
import FindItemSelect from '../components/FindInfoPage/FindItemSelect';
import FindId from '../components/FindInfoPage/FindIdInput';
import FindPw from '../components/FindInfoPage/FindPwInput';
import Footer from '../components/Footer';

const FindInfoPage = () => {
	const history = useHistory();
	const [item, setItem] = useState('아이디');

	const goFindID = () => {
		history.push('/find-result');
	};
	const goFindPW = () => {
		alert('비밀번호 찾기로 이동');
	};

	// 기능 아직 없음

	return (
		<div id='container'>
			<Container>
				<FindInfoInside>
					<LogoImg alt='logo' src={logo} />
					<Title>품생품사 아이디/비밀번호 찾기</Title>
					<FindItemSelect item={item} setItem={setItem} />
					{item === '아이디' ? <FindId /> : <FindPw />}

					{item === '아이디' ? (
						<SubmitButton onClick={goFindID}>아이디 찾기</SubmitButton>
					) : (
						<SubmitButton onClick={goFindPW}>비밀번호 찾기</SubmitButton>
					)}
				</FindInfoInside>
				<Footer />
			</Container>
		</div>
	);
};

export default withRouter(FindInfoPage);

const Container = styled.div`
	width: 192rem;
	padding: 10rem 0 10.3rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const FindInfoInside = styled.div`
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
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	margin-top: 5rem;
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
