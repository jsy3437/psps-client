import React, { useState } from 'react';
import styled from 'styled-components';

const FindIdInput = () => {
	const [name, setName] = useState('');
	const [phone_number, setPhone_number] = useState('');

	const nameController = (e) => {
		console.log('name', name);
		setName(e.target.value);
	};
	const phoneNumberController = (e) => {
		console.log('phoneNumber', phone_number);
		setPhone_number(e.target.value);
	};

	return (
		<ItemsWrap>
			<Items>
				<ItemTitle>이름</ItemTitle>
				<ItemInput
					value={name}
					placeholder={'이름을 입력해주세요.'}
					onChange={nameController}
				/>
			</Items>
			<Items>
				<ItemTitle>휴대폰번호</ItemTitle>
				<ItemInput
					type='number'
					value={phone_number}
					placeholder={`'-'을 제외한 휴대폰 번호를 입력해주세요.`}
					onChange={phoneNumberController}
				/>
			</Items>
		</ItemsWrap>
	);
};

export default FindIdInput;

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
