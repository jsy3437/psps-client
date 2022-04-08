import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import * as _user from '../controller/user';
import logo from '../images/red-logo.svg';
import FindItemSelect from '../components/FindInfoPage/FindItemSelect';
import FindId from '../components/FindInfoPage/FindIdInput';
import FindPw from '../components/FindInfoPage/FindPwInput';
import Alert from '../components/Modal/Alert';

const FindInfoPage = () => {
	const history = useHistory();
	const location = useLocation().state;
	const [item, setItem] = useState('아이디');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone_number, setPhone_number] = useState('');
	const [confirmNum, setConfirmNum] = useState('');
	const [getConfirmNum, setGetConfirmNum] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [findIdState, setFindIdState] = useState(false);
	const [findPwState, setFindPwState] = useState(false);
	const [alertState, setAlertState] = useState(false);
	const [alertMsg, setAlertMsg] = useState('');
	const [checkLength, setCheckLength] = useState({
		name: false,
		phone_number: false,
		email: false,
		confirmNum: false,
	});

	useEffect(() => {
		if (location) {
			setItem(location);
		}
	}, [location]);

	useEffect(() => {
		setName('');
		setPhone_number('');
		setEmail('');
		setConfirmNum('');
		setGetConfirmNum(false);
		setConfirm(false);
		setCheckLength({
			name: false,
			phone_number: false,
			email: false,
			confirmNum: false,
		});
	}, [item]);

	useEffect(() => {
		if (item === '아이디') {
			if (checkLength.name && checkLength.phone_number) {
				setFindIdState(true);
			} else {
				setFindIdState(false);
			}
		} else if (item === '비밀번호') {
			if (
				checkLength.email &&
				checkLength.phone_number &&
				checkLength.confirmNum &&
				getConfirmNum &&
				confirm
			) {
				setFindPwState(true);
			} else {
				setFindPwState(false);
			}
		}
	}, [checkLength, confirm, getConfirmNum, item]);

	const goFindID = () => {
		if (findIdState) {
			const data = {
				name,
				phone_number,
			};

			_user.find_email(data).then((res) => {
				const { success, email } = res.data;
				if (success) {
					history.push({ pathname: '/find-result/id', state: { name, email } });
				} else {
					history.push('/find-result/id');
				}
			});
		}
	};
	const goFindPW = () => {
		if (findPwState) {
			history.push({ pathname: '/find-result/pw', state: email });
		}

		// const data = {
		// 	email,
		// 	// password,
		// };
		// _user.find_Pw_change(data).then((res) => {
		// 	const { success } = res.data;
		// 	success && console.log(res.data);
		// });
	};

	return (
		<div id="container">
			<Container>
				<FindInfoInside>
					<LogoImg alt="logo" src={logo} />
					<Title>품생품사 아이디/비밀번호 찾기</Title>
					<FindItemSelect item={item} setItem={setItem} />
					{item === '아이디' ? (
						<FindId
							name={name}
							setName={setName}
							phone_number={phone_number}
							setPhone_number={setPhone_number}
							checkLength={checkLength}
							setCheckLength={setCheckLength}
						/>
					) : (
						<FindPw
							name={name}
							setName={setName}
							email={email}
							setEmail={setEmail}
							phone_number={phone_number}
							setPhone_number={setPhone_number}
							confirmNum={confirmNum}
							setConfirmNum={setConfirmNum}
							checkLength={checkLength}
							setCheckLength={setCheckLength}
							getConfirmNum={getConfirmNum}
							setGetConfirmNum={setGetConfirmNum}
							confirm={confirm}
							setConfirm={setConfirm}
							setAlertMsg={setAlertMsg}
							setAlertState={setAlertState}
						/>
					)}
					{item === '아이디' ? (
						<SubmitButton onClick={goFindID} state={findIdState}>
							아이디 찾기
						</SubmitButton>
					) : (
						<SubmitButton onClick={goFindPW} state={findPwState}>
							비밀번호 찾기
						</SubmitButton>
					)}
				</FindInfoInside>
			</Container>
			{alertState && (
				<Alert
					title={'인증 안내'}
					msg={alertMsg}
					setAlertState={setAlertState}
				/>
			)}
		</div>
	);
};

export default FindInfoPage;

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
	color: #a0a0a0;
	background-color: #fff;
	border: 1px solid #a0a0a0;
	border-radius: 14px;
	cursor: default !important;
	${(props) =>
		props.state &&
		`border: 1px solid #e50011;color: #e50011; cursor:pointer !important;
		 &:hover {
		background-color: #e50011;
		color: #fff;
		
	}`}
`;
