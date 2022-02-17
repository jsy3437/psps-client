import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import * as _user from '../controller/user';
import UserData from '../components/PaymentPage/UserData';
import ProductData from '../components/PaymentPage/ProductData';
import logo from '../images/red-logo.svg';
import Footer from '../components/Footer';

import { payment_request } from '../payments';
import { useHistory } from 'react-router-dom';

const PaymentPage = () => {
	const history = useHistory();
	const location = useLocation();
	const [user, setUser] = useState('');
	const [checked, setChecked] = useState(false);
	const [pasteAddrChecked, setPasteAddrChecked] = useState(true);
	const [del_name, setDel_name] = useState('');
	const [del_tel, setDel_tel] = useState('');
	const [postAddr, setPostAddr] = useState('');
	const [postZoneCode, setPostZoneCode] = useState('');
	const [detailAddr, setDetailAddr] = useState('');
	const [del_req, setDel_req] = useState('');
	const [postcodeOpen, setPostcodeOpen] = useState(false);
	const paymentProducts = location.state.paymentProducts;
	const productName = location.state.productName;
	const total_amount = location.state.total_amount;

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

	const onOrder = () => {
		const name =
			paymentProducts.length === 1
				? productName
				: `${productName} 외 ${paymentProducts.length - 1}건`;

		const impData = {
			buyer_name: user.name,
			buyer_email: user.email,
			buyer_tel: user.phone_number,
			buyer_addr: postAddr + '/' + detailAddr,
			buyer_postcode: postZoneCode,
			name,
			// TODO 테스트 끝나고 나면 금액 바꿔주기
			// amount: total_price + deliveryPrice,
			amount: 100,
		};
		const delivery = {
			del_name,
			del_tel,
			del_addr: postAddr + '/' + detailAddr,
			del_postcode: postZoneCode,
			del_price: 3000,
			del_req,
		};

		payment_request(impData, paymentProducts, pasteAddrChecked, delivery);
	};

	return (
		<div id="container">
			<Container>
				<LogoImg alt="logo" src={logo} />
				<Title>주문하기</Title>
				<UserData
					user={user}
					checked={checked}
					setChecked={setChecked}
					pasteAddrChecked={pasteAddrChecked}
					setPasteAddrChecked={setPasteAddrChecked}
					postcodeOpen={postcodeOpen}
					setPostcodeOpen={setPostcodeOpen}
					postAddr={postAddr}
					setPostAddr={setPostAddr}
					postZoneCode={postZoneCode}
					setPostZoneCode={setPostZoneCode}
					detailAddr={detailAddr}
					setDetailAddr={setDetailAddr}
					del_name={del_name}
					setDel_name={setDel_name}
					del_tel={del_tel}
					setDel_tel={setDel_tel}
					setDel_req={setDel_req}
				/>
				<ProductData
					paymentProducts={paymentProducts}
					total_amount={total_amount}
				/>
				<BtnBox>
					<SubmitButton onClick={onOrder}> 주문하기</SubmitButton>
				</BtnBox>
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
const BtnBox = styled.div`
	width: fit-content;
	margin: auto;
`;
const SubmitButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	border-radius: 4px;
	font-size: 2.1rem;
	font-family: 'kr-r';
	letter-spacing: -0.84px;
	border: none;
	transition: all 200ms ease;
	background-color: #221814;
	color: #fff;
	margin: 6.05rem auto 0;

	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
