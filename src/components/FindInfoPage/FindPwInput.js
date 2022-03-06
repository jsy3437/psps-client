import React, { useState } from 'react';
import styled from 'styled-components';
import { regexp } from '../../data/regexp';

const FindPwInput = (props) => {
	const emailController = (e) => {
		regexp.email.test(e.target.value)
			? props.setCheckLength({ ...props.checkLength, email: true })
			: props.setCheckLength({ ...props.checkLength, email: false });
		props.setEmail(e.target.value);
	};
	const phoneNumberController = (e) => {
		if (isNaN(e.target.value)) {
			return;
		} else {
			regexp.phone_number.test(e.target.value)
				? props.setCheckLength({ ...props.checkLength, phone_number: true })
				: props.setCheckLength({ ...props.checkLength, phone_number: false });
			props.setPhone_number(e.target.value);
		}
	};
	const confirmNumberController = (e) => {
		if (isNaN(e.target.value)) {
			return;
		} else {
			props.setConfirmNum(e.target.value);
		}
	};
	const getConfirmNumber = () => {
		if (props.checkLength.phone_number) {
			// 인증하기
			alert('인증번호 1234');
			props.setGetConfirmNum(true);
		} else {
			return alert('휴대폰 번호를 정확하게 입력해주세요.');
		}
	};

	const checkConfirmNumber = () => {
		if (props.getConfirmNum) {
			// 인증번호와 입력된 값이 같을 경우
			return alert('인증 확인되었습니다.');
			// 아닐 경우
			// return alert('인증번호를 확인해주세요.')
		}
	};

	return (
		<ItemsWrap>
			<Items>
				<ItemTitle>이메일</ItemTitle>
				<ItemInput
					value={props.email}
					placeholder={'이메일 주소를 입력해주세요.'}
					onChange={emailController}
				/>
			</Items>
			<Items>
				<ItemTitle>휴대폰번호</ItemTitle>
				<ItemInput
					type="text"
					maxLength={11}
					value={props.phone_number}
					placeholder={`'-'을 제외한 휴대폰 번호를 입력해주세요.`}
					onChange={phoneNumberController}
				/>
				<CheckButton
					active={props.checkLength.phone_number}
					onClick={getConfirmNumber}
				>
					인증하기
				</CheckButton>
			</Items>
			<Items>
				<ItemTitle>인증번호</ItemTitle>
				<ItemInput
					type="text"
					maxLength={6}
					value={props.confirmNum}
					placeholder={'발송된 인증번호를 입력해주세요.'}
					onChange={confirmNumberController}
				/>
				<CheckButton
					// active={props.confirmSend}
					onClick={checkConfirmNumber}
				>
					인증확인
				</CheckButton>
			</Items>
		</ItemsWrap>
	);
};

export default FindPwInput;

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
