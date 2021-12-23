import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as request from '../../controller/user';
import styled from 'styled-components';
import Logo from '../../images/red-logo.svg';

const ThirdStep = (props) => {
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [phone_number, setPhone_number] = useState('');
	const [certification, setCertification] = useState('');

	useEffect(() => {
		if (history.location.state) {
			setEmail(history.location.state.email);
			setPassword(history.location.state.password);
		}
	}, []);

	const goBack = () => {
		props.getStep(1);
	};
	const nameController = (e) => {
		setName(e.target.value);
	};
	const phone_numberController = (e) => {
		setPhone_number(e.target.value);
	};
	const certificationController = (e) => {
		setCertification(e.target.value);
	};

	const onSubmit = () => {
		const Data = { email, password, name, phone_number };
		console.log(Data);
		request.register(Data).then((res) => {
			console.log(res.data);
			if (res.data.success) {
				props.getStep(4);
				history.push({ state: name });
			}
		});
	};

	return (
		<Container>
			<RegisterInside>
				<LogoImg alt='로고이미지' src={Logo} />
				<Title>품생품사 회원가입-정보입력</Title>
				<Items>
					<ItemTitle>이름</ItemTitle>
					<ItemInput
						onChange={nameController}
						placeholder='이름을 입력해주세요'
					/>
				</Items>
				<Items>
					<ItemTitle>휴대폰번호</ItemTitle>
					<ItemInput
						onChange={phone_numberController}
						placeholder='휴대폰번호를 입력해주세요'
					/>
				</Items>
				<Items>
					<ItemTitle>인증번호</ItemTitle>
					<ItemInput
						onChange={certificationController}
						placeholder='인증번호를 입력해주세요'
					/>
				</Items>

				<SubmitButton
					enter
					// onClick={goNext}
					onClick={onSubmit}>
					가입하기
				</SubmitButton>
				<SubmitButton back onClick={goBack}>
					이전으로
				</SubmitButton>
			</RegisterInside>
		</Container>
	);
};

export default ThirdStep;

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
const Items = styled.div`
	width: 34.6rem;
	height: 6.2rem;
	position: relative;
	margin-bottom: 2rem;
`;
const ItemTitle = styled.p`
	height: 2rem;
	line-height: 2rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #221814;
	padding: 0 0.5rem;
	position: absolute;
	top: -0.8rem;
	left: 1rem;
	background-color: #fff;
`;
const ItemInput = styled.input`
	width: 34.6rem;
	height: 6.2rem;
	font-size: 1.4rem;
	font-family: 'kr-r';
	color: #221814;
	padding-left: 1.2rem;
	background-color: #fff;
	border-radius: 4px;
	border: 1px solid #c6c6c6;
	&::placeholder {
		color: #c6c6c6;
	}
	&:focus {
		box-shadow: 2px 6px 15px #00000029;
	}
`;
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	line-height: 6.2rem;
	border-radius: 4px;
	font-size: 2.4rem;
	font-family: 'kr-r';
	border: none;
	${(props) =>
		props.enter && `background-color:#E50011; color:#fff ; margin-top:2rem`}
	${(props) =>
		props.back &&
		`background-color:#fff; color: #E50011; border: 1px solid #E50011; margin-top:1.2rem`};
`;
