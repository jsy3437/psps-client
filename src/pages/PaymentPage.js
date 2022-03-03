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
	const [payment_product_list, setPayment_product_list] = useState([]);
	const [payment_name, setPayment_name] = useState('');
	const { orderCalc, amount, delivery_price } = location.state;
	const [orderState, setOrderState] = useState(false);

	useEffect(() => {
		if (!!!user) {
			_user.get_me().then((res) => {
				const { success, user } = res.data;
				if (success) {
					setUser(user);
				} else {
					history.push('/login');
				}
			});
		}
	}, []);

	useEffect(() => {
		if (del_name && del_tel && postAddr && detailAddr && postZoneCode) {
			setOrderState(true);
		} else {
			setOrderState(false);
		}
	}, [del_name, del_tel, postAddr, detailAddr, postZoneCode]);

	useEffect(() => {
		if (orderCalc) {
			let count = 0;
			let name;
			let productList = [];
			orderCalc.map((el) => {
				if (el.total !== 0) {
					el.checked_product_list.map((list) => {
						count++;
						name = list.product_title;
						productList = [
							...productList,
							{
								product_option_id: list.product_option_id,
								quantity: list.quantity,
							},
						];
					});
				}
			});
			if (count === 1) {
				setPayment_name(name);
			} else {
				setPayment_name(`${name} 외 ${count - 1}건`);
			}
			setPayment_product_list(productList);
		}
	}, []);

	const goBack = () => {
		history.goBack();
	};

	const onOrder = () => {
		if (orderState) {
			const impData = {
				buyer_name: user.name,
				buyer_email: user.email,
				buyer_tel: user.phone_number,
				buyer_addr: user.address,
				buyer_postcode: user.postcode,
				name: payment_name,
				amount: amount + delivery_price,
			};
			const delivery = {
				del_name,
				del_tel,
				del_addr: postAddr + '/' + detailAddr,
				del_postcode: postZoneCode,
				del_price: delivery_price,
				del_req,
			};

			payment_request(
				impData,
				pasteAddrChecked,
				delivery,
				payment_product_list
			);
		}
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
					orderCalc={orderCalc}
					delivery_price={delivery_price}
					amount={amount}
				/>
				<BtnBox>
					<SubmitButton onClick={onOrder} state={orderState}>
						주문하기
					</SubmitButton>
					<BackButton onClick={goBack}>이전으로</BackButton>
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
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: fit-content;
	margin: auto;
	height: 19.7rem;
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
	background-color: #a0a0a0;
	color: #fff;
	margin: 6.05rem auto 0;
	cursor: default !important;
	${(props) =>
		props.state &&
		`background-color: #221814;
		cursor:pointer !important;
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
	`}
`;
const BackButton = styled.button`
	width: 34.6rem;
	height: 6.2rem;
	border-radius: 4px;
	font-size: 2.1rem;
	font-family: 'kr-r';
	letter-spacing: -0.84px;
	border: 1px solid #e50011;
	color: #e50011;
	background-color: #fff;
	transition: all 200ms ease;
	&:hover {
		background-color: #e50011;
		color: #fff;
	}
`;
