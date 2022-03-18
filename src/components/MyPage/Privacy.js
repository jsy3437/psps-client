import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as _user from '../../controller/user';
import styled from 'styled-components';
import ChangePw from './Change/ChangePw';
import ChangeTel from './Change/ChangeTel';
import ChangeAddr from './Change/ChangeAddr';

const Privacy = () => {
	const history = useHistory();
	const [user, setUser] = useState('');
	const [changePWState, setChangePWState] = useState(false);
	const [changeTelState, setChangeTelState] = useState(false);
	const [changeAddrState, setChangeAddrState] = useState(false);

	useEffect(() => {
		_user.get_me().then((res) => {
			const { success, user } = res.data;
			if (success) {
				setUser(user);
			}
		});
	}, [changeAddrState, changeTelState]);

	const goWithdrawal = () => {
		history.push('/withdrawal');
		// 회원탈퇴
	};

	return (
		<Container>
			{!changePWState && (
				<PrivacyWrap>
					<Title>회원정보</Title>
					<PrivacyBox>
						<PrivacyItem>
							<PrivacyTitle>이메일</PrivacyTitle>
							<PrivacyText>{user.email}</PrivacyText>
						</PrivacyItem>

						<PrivacyItem>
							<PrivacyTitle>비밀번호</PrivacyTitle>
							<Button
								onClick={() => {
									setChangePWState(true);
								}}
							>
								변경하기
							</Button>
						</PrivacyItem>

						<PrivacyItem>
							<PrivacyTitle>이름</PrivacyTitle>
							<PrivacyText>{user.name}</PrivacyText>
						</PrivacyItem>

						<PrivacyItem>
							<PrivacyTitle>휴대폰</PrivacyTitle>
							<PrivacyText>{user.phone_number}</PrivacyText>
							<Button
								tel
								onClick={() => {
									setChangeTelState(true);
								}}
							>
								변경하기
							</Button>
						</PrivacyItem>

						<PrivacyItem>
							<PrivacyTitle>배송지</PrivacyTitle>
							<PrivacyText>
								{user.address &&
									`(${user.postcode}) ${user.address.split('/')[0]} ${
										user.address.split('/')[1]
									}`}
							</PrivacyText>
							<Button
								addr={user.address}
								onClick={() => {
									setChangeAddrState(true);
								}}
							>
								{user.address ? '수정하기' : '등록하기'}
							</Button>
						</PrivacyItem>

						{/* <PrivacyItem>
							<PrivacyTitle>환불계좌</PrivacyTitle>
							<PrivacyText>
								{user.address &&
									`(${user.postcode}) ${user.address.split('/')[0]} ${
										user.address.split('/')[1]
									}`}
							</PrivacyText>
							<Button
								addr={user.address}
								onClick={() => {
									setChangeAddrState(true);
								}}>
								{user.address ? '수정하기' : '등록하기'}
							</Button>
						</PrivacyItem> */}
					</PrivacyBox>
					<SecessionBtn onClick={goWithdrawal}>회원탈퇴</SecessionBtn>
				</PrivacyWrap>
			)}
			{changePWState && <ChangePw setChangePWState={setChangePWState} />}
			{changeAddrState && (
				<ChangeAddr
					user={user}
					setUser={setUser}
					setChangeAddrState={setChangeAddrState}
				/>
			)}
			{changeTelState && <ChangeTel setChangeTelState={setChangeTelState} />}
		</Container>
	);
};

export default Privacy;

const Container = styled.div`
	width: 69.7rem;
	margin: 3.2rem auto 13.25rem;
`;
const PrivacyWrap = styled.div`
	width: 100%;
`;
const Title = styled.h2`
	font-size: 1.8rem;
	font-family: 'kr-b';
	letter-spacing: -0.72px;
`;
const PrivacyBox = styled.div`
	width: 100%;
	text-align: start;
	padding-top: 1.65rem;
	border-top: 1px solid #e0e0e0;
	border-bottom: 1px solid #e0e0e0;
	margin: 1.25rem auto;
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
`;
const PrivacyItem = styled.div`
	width: 100%;
	margin-bottom: 2rem;
	display: flex;
	align-items: center;
`;
const PrivacyTitle = styled.p`
	width: 5rem;
	margin-right: 4.9rem;
	color: #6b6462;
`;
const PrivacyText = styled.p`
	width: fit-content;
`;
const Button = styled.button`
	padding: 0.5rem 1.8rem;
	background-color: #fff;
	border: 1px solid #8e8e8e;
	border-radius: 8px;
	color: #8e8e8e;
	${(props) => (props.addr || props.tel ? `margin-left:2rem;` : null)}
`;
const SecessionBtn = styled.p`
	width: fit-content;
	font-size: 1.4rem;
	font-family: 'kr-r';
	letter-spacing: -0.56px;
	color: #6b6462;
	text-decoration: underline;
	text-align: end;
	margin-left: auto;
	cursor: pointer;
`;
