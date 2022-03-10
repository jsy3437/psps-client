import React, { useEffect, useRef, useState } from 'react';
import { regexp } from '../../data/regexp';
import * as _user from '../../controller/user';
import styled from 'styled-components';

const FindPwInput = (props) => {
	const confirmEl = useRef();
	const [time, setTime] = useState(180);
	const [sec, setSec] = useState(0);
	const [min, setMin] = useState(0);

	useEffect(() => {
		let interval;
		if (props.getConfirmNum && time > -1) {
			setMin(parseInt(time / 60));
			setSec(time % 60);
			interval = setTimeout(() => {
				setTime(time - 1);
			}, 1000);
		}
		return () => {
			clearTimeout(interval);
		};
	}, [props.getConfirmNum, time]);

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
				: props.setCheckLength({
						...props.checkLength,
						phone_number: false,
				  });
			props.setPhone_number(e.target.value);
			props.setConfirm(false);
			props.setGetConfirmNum(false);
		}
	};
	const confirmNumberController = (e) => {
		if (isNaN(e.target.value)) {
			return;
		} else {
			if (e.target.value.length === 6) {
				props.setCheckLength({ ...props.checkLength, confirmNum: true });
			} else {
				props.setCheckLength({ ...props.checkLength, confirmNum: false });
			}
			return props.setConfirmNum(e.target.value);
		}
	};

	const getConfirmNumber = () => {
		if (props.checkLength.phone_number) {
			_user.send_sms({ phone_number: props.phone_number }).then((res) => {
				const { success } = res.data;
				console.log(res.data);
				if (success) {
					alert('인증번호가 발송되었습니다.');
					confirmEl.current.focus();
					setTime(180);
					props.setGetConfirmNum(true);
					props.setConfirmNum('');
				} else {
					alert(res.data.msg);
				}
			});
		}
	};
	const checkConfirmNumber = () => {
		if (time > 0) {
			if (
				props.getConfirmNum &&
				props.checkLength.confirmNum &&
				!props.confirm
			) {
				console.log('aa');
				const data = {
					phone_number: props.phone_number,
					code: props.confirmNum,
				};
				console.log(data);
				_user.check_sms(data).then((res) => {
					console.log(res.data);
					if (res.data.success) {
						props.setConfirm(true);
						return alert('인증 확인되었습니다.');
					} else {
						return alert(res.data.msg);
					}
				});
			}
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
					type='text'
					maxLength={11}
					value={props.phone_number}
					placeholder={`'-'을 제외한 휴대폰 번호를 입력해주세요.`}
					onChange={phoneNumberController}
				/>
				<CheckButton
					active={props.checkLength.phone_number}
					onClick={getConfirmNumber}>
					인증하기
				</CheckButton>
			</Items>
			<Items>
				<ItemTitle>인증번호</ItemTitle>
				<ItemInput
					ref={confirmEl}
					type='text'
					maxLength={6}
					value={props.confirmNum}
					placeholder={
						props.getConfirmNum && `0${min}:${sec < 10 ? '0' + sec : sec}`
					}
					onChange={confirmNumberController}
				/>
				<CheckButton
					active={
						props.getConfirmNum &&
						props.checkLength.confirmNum &&
						time > 0
					}
					onClick={checkConfirmNumber}>
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
