import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import * as _user from '../controller/user';
import UserData from '../components/PaymentPage/UserData';
import ProductData from '../components/PaymentPage/productData';
import logo from '../images/red-logo.svg';
import Footer from '../components/Footer';

const PaymentPage = () => {
	const [user, setUser] = useState('');
	const [checked, setChecked] = useState(false);
	const [receiveUserName, setReceiveUserName] = useState('');
	const [receiveUserPhNumber, setReceiveUserPhNumber] = useState('');
	const [postAddr, setPostAddr] = useState('');
	const [postZoneCode, setPostZoneCode] = useState('');
	const [detailAddr, setDetailAddr] = useState('');
	const [receiveUserRequest, setReceiveUserRequest] = useState('');
	const [postcodeOpen, setPostcodeOpen] = useState(false);

	useEffect(() => {
		if (!!!user) {
			_user.get_me().then((res) => {
				const { success, user } = res.data;
				if (success) {
					setUser(user);
				}
			});
		}
	}, []);
	console.log('dd', user);

	return (
		<div id="container">
			<Container>
				<LogoImg alt="logo" src={logo} />
				<Title>주문하기</Title>
				<UserData
					user={user}
					checked={checked}
					setChecked={setChecked}
					postcodeOpen={postcodeOpen}
					setPostcodeOpen={setPostcodeOpen}
					postAddr={postAddr}
					setPostAddr={setPostAddr}
					postZoneCode={postZoneCode}
					setPostZoneCode={setPostZoneCode}
					setDetailAddr={setDetailAddr}
					receiveUserName={receiveUserName}
					setReceiveUserName={setReceiveUserName}
					receiveUserPhNumber={receiveUserPhNumber}
					setReceiveUserPhNumber={setReceiveUserPhNumber}
					setReceiveUserRequest={setReceiveUserRequest}
				/>
				<ProductData />
			</Container>
			<Footer />
		</div>
	);
};

export default PaymentPage;

const Container = styled.div`
	width: 69.7rem;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 100px auto;
`;
const LogoImg = styled.img`
	width: 6.4rem;
	height: 6.4rem;
`;
const Title = styled.h2`
	font-size: 3rem;
	font-family: 'kr-b';
	letter-spacing: -1.2px;
	margin: 1rem auto;
`;
