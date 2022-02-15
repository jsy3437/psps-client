import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import DaumPostcode from '../DaumPostCode';
import checkImg from '../../images/check_btn.svg';
import uncheckImg from '../../images/uncheck_btn.svg';

const UserData = (props) => {
	const inputDetailAddr = useRef();
	const orderUserDataTitle = ['이름', '연락처', '이메일'];
	const receiveUserPlaceholder = [
		'받으시는 분 이름을 입력해주세요.',
		'연락처를 입력해주세요.',
		'내용을 입력해주세요.',
	];

	const onCheck = () => {
		props.setChecked(!props.checked);
		if (props.checked) {
			props.setReceiveUserName('');
			props.setReceiveUserPhNumber('');
			{
				props.user.address && props.setPostAddr('');
			}
		} else {
			props.setReceiveUserName(props.user.name);
			props.setReceiveUserPhNumber(props.user.phone_number);
			{
				props.user.address && props.setPostAddr(props.user.address);
			}
		}
	};

	const onPostcodeClose = () => {
		props.setPostcodeOpen(false);
	};

	const goDaumPostcode = () => {
		props.setPostcodeOpen(true);
	};

	const changeDetailAddr = (e) => {
		props.setDetailAddr(e.target.value);
	};

	const ChangeName = (e) => {
		props.setReceiveUserName(e.target.value);
	};

	const ChangePhNumber = (e) => {
		props.setReceiveUserPhNumber(e.target.value);
	};

	const ChangeRequest = (e) => {
		props.setReceiveUserRequest(e.target.value);
	};
	// console.log(props.checked);

	// console.log('props.user.name', props.user.name);
	// console.log('props.receiveUserName', props.receiveUserName);

	return (
		<UserDataWrap>
			<OrderUserWrap>
				<Title>보내시는 분</Title>
				<BorderBox>
					{orderUserDataTitle.map((el, idx) => (
						<DataBox orderUser key={idx}>
							<DataTitle orderUser>{el}</DataTitle>
							<OrderUserText>
								{idx === 0
									? props.user.name
									: idx === 1
									? props.user.phone_number
									: props.user.email}
							</OrderUserText>
						</DataBox>
					))}
				</BorderBox>
			</OrderUserWrap>
			<ReceiveUserWrap>
				<ReceiveUserTitleBox>
					<Title receive>받으시는 분</Title>
					<CheckImg
						alt="check button"
						src={props.checked ? checkImg : uncheckImg}
						onClick={onCheck}
					/>
					<CheckInfo>주문자 정보 가져오기</CheckInfo>
				</ReceiveUserTitleBox>
				<BorderBox>
					<DataBox>
						<DataTitle>이름</DataTitle>
						<ReceiveUserInput
							placeholder={receiveUserPlaceholder[0]}
							value={props.receiveUserName}
							onChange={ChangeName}
						></ReceiveUserInput>
					</DataBox>
					<DataBox>
						<DataTitle>연락처</DataTitle>
						<ReceiveUserInput
							placeholder={receiveUserPlaceholder[1]}
							onChange={ChangePhNumber}
							value={props.receiveUserPhNumber}
						></ReceiveUserInput>
					</DataBox>
					<DataBox>
						<DataTitle>배송지</DataTitle>
						<InputBox>
							<InputAndPostcode>
								<ReceiveUserInput
									value={props.postZoneCode && props.postZoneCode}
									readOnly
								></ReceiveUserInput>
								<InputPostcodeBtn onClick={goDaumPostcode}>
									우편번호 찾기
								</InputPostcodeBtn>
							</InputAndPostcode>

							<ReceiveUserInput
								value={props.postAddr && props.postAddr}
								long
								destination
								readOnly
							></ReceiveUserInput>
							<ReceiveUserInput
								long
								destination
								ref={inputDetailAddr}
								placeholder={props.postAddr && '상세주소를 입력해주세요'}
								onChange={changeDetailAddr}
							></ReceiveUserInput>
						</InputBox>
					</DataBox>

					<DataBox>
						<DataTitle>배송요청사항</DataTitle>
						<ReceiveUserInput
							long
							placeholder={receiveUserPlaceholder[2]}
							onChange={ChangeRequest}
						></ReceiveUserInput>
					</DataBox>
				</BorderBox>
			</ReceiveUserWrap>
			{props.postcodeOpen && (
				<PostcodeModal>
					<PostcodeBox>
						<DaumPostcode
							setPostcodeOpen={props.setPostcodeOpen}
							setPostZoneCode={props.setPostZoneCode}
							setPostAddr={props.setPostAddr}
							inputDetailAddr={inputDetailAddr}
						/>
						<PostcodeCloseBtn onClick={onPostcodeClose}>닫기</PostcodeCloseBtn>
					</PostcodeBox>
				</PostcodeModal>
			)}
		</UserDataWrap>
	);
};

export default UserData;

const UserDataWrap = styled.div`
	width: 100%;
`;
const OrderUserWrap = styled.div`
	width: 100%;
	margin-bottom: 6rem;
`;
const Title = styled.h2`
	font-size: 1.8rem;
	font-family: 'kr-b';
	letter-spacing: -0.072rem;
	margin: 0 auto 1.3rem 1.5rem;
	${(props) => props.receive && `margin: 0 auto 0.6rem 1.5rem`}
`;
const BorderBox = styled.ul`
	width: 100%;
	padding: 2rem 4rem 0;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	box-shadow: 0px 0px 10px #00000014;
`;
const DataBox = styled.li`
	display: flex;
	align-items: flex-start;
	margin: 3rem 0;
	${(props) => props.orderUser && `margin:0 0 2rem`}
`;

const DataTitle = styled.p`
	width: 7.4rem;
	font-size: 1.4rem;
	font-family: 'kr-b';
	text-align: left;
	letter-spacing: -0.056rem;
	color: #6b6462;
	margin-right: 6.1rem;
	padding-top: 1rem;
	${(props) => props.orderUser && `padding-top:0`}
`;
const OrderUserText = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
	text-align: left;
	letter-spacing: -0.056rem;
	color: #221814;
`;
const ReceiveUserWrap = styled.div`
	width: 100%;
`;
const ReceiveUserTitleBox = styled.div`
	display: flex;
	align-items: center;
`;
const CheckImg = styled.img`
	width: 1.4rem;
	height: 1.4rem;
	cursor: pointer;
`;
const CheckInfo = styled.span`
	font-size: 1.2rem;
	font-family: 'kr-b';
	letter-spacing: -0.048rem;
	color: #6b6462;
	margin: 0 1.5rem 0 1rem;
`;

const ReceiveUserInput = styled.input`
	width: 23.8rem;
	padding: 1.2rem;
	display: block;
	border: 1px solid #c6c6c6;
	border-radius: 4px;
	background-color: #fff;
	letter-spacing: -0.056rem;
	text-align: left;
	font-size: 1.4rem;
	margin-bottom: 2rem;
	&::placeholder {
		letter-spacing: -0.56px;
		color: #c6c6c6;
	}
	&:focus {
		margin-bottom: 1.8rem;
	}
	${(props) =>
		props.readOnly &&
		`&:focus {border: 1px solid #c6c6c6; box-shadow:none; margin-bottom: 2rem;}`}
	${(props) => props.long && `width:34.6rem`}
`;
const InputBox = styled.div`
	width: 34.6rem;
`;
const InputAndPostcode = styled.div`
	display: flex;
	justify-content: space-between;
`;
const InputPostcodeBtn = styled.div`
	height: 4.3rem;
	background-color: #f2f2f2;
	border: 1px solid #c6c6c6;
	border-radius: 4px;
	font-size: 1.4rem;
	font-family: 'kr-b';
	letter-spacing: -0.28px;
	padding: 1rem 1rem;
	color: #8e8e8e;
	cursor: pointer;
`;
const PostcodeModal = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: #000000a0;
	position: fixed;
	top: 0;
	left: 0;
`;
const PostcodeBox = styled.div`
	width: 80%;
	height: 80%;
	max-width: 500px;
	max-height: 500px;
	margin: 10% auto;
	background-color: #fff;
`;
const PostcodeCloseBtn = styled.button`
	width: 15%;
	height: 3rem;
	margin: 1rem 0 0 85%;
	padding: 0.2rem 0.4rem;
	border-radius: 5px;
	border: 1px solid #fff;
`;
