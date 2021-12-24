import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../images/red-logo.svg';
import FindItemSelect from '../components/FindInfoPage/FindItemSelect';
import FindId from '../components/FindInfoPage/FindIdInput';
import FindPw from '../components/FindInfoPage/FindPwInput';

const FindInfoPage = () => {
	const history = useHistory();
	const [item, setItem] = useState('아이디');
	const getItem = (item) => {
		setItem(item);
	};

	const goFindID = () => {
		history.push('/find-result');
	};
	const goFindPW = () => {
		alert('비밀번호 찾기로 이동');
	};

	return (
		<div id='container'>
			<Container>
				<FindInfoInside>
					<LogoImg alt='로고이미지' src={Logo} />
					<Title>품생품사 아이디/비밀번호 찾기</Title>
					<FindItemSelect getItem={getItem} item={item} />
					{item === '아이디' && <FindId />}
					{item === '아이디' && (
						<SubmitButton onClick={goFindID}>아이디 찾기</SubmitButton>
					)}
					{item === '비밀번호' && <FindPw />}
					{item === '비밀번호' && (
						<SubmitButton onClick={goFindPW}>비밀번호 찾기</SubmitButton>
					)}
				</FindInfoInside>
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
const ItemsWrap = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Items = styled.li`
	position: relative;
	${(props) => (props.last ? `margin-bottom:0.8rem;` : `margin-bottom:2rem`)}
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
const CheckButton = styled.button`
	width: 6.7rem;
	height: 2.8rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #c6c6c6;
	letter-spacing: -0.56px;
	position: absolute;
	top: 1.7rem;
	right: 12px;
	border-radius: 4px;
	border: 1px solid #c6c6c6;
	background-color: unset;
	${(props) =>
		(props.active || props.send) &&
		`border: 2px solid #111a31;color:#111a31; cursor:pointer`}
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
