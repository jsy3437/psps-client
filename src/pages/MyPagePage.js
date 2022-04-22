import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as _payment from '../controller/payment';
import styled from 'styled-components';
import logo from '../images/red-logo.svg';
import MenuSelect from '../components/MyPage/MenuSelect';
import OrderHistory from '../components/MyPage/OrderHistory';
import Privacy from '../components/MyPage/Privacy';
import Alert from '../components/Modal/Alert';

const MyPagePage = () => {
	const location = useLocation();
	const [menu, setMenu] = useState('주문내역');
	const [paymentList, setPaymentList] = useState('');
	const [payment_id, setPayment_id] = useState('');
	const [viewDetail, setViewDetail] = useState(false);
	const [changePWState, setChangePWState] = useState(false);
	const [alertState, setAlertState] = useState(false);
	const [alertMsg, setAlertMsg] = useState('');
	const [alertTitle, setAlertTitle] = useState('');

	useEffect(() => {
		_payment.get_list().then((res) => {
			const { success, payment_list } = res.data;
			if (success) {
				setPaymentList(payment_list);
			}
		});
	}, []);

	useEffect(() => {
		if (location.state) {
			if (location.state.type) {
				setMenu(location.state.type);
			} else {
				setPayment_id(location.state.payment_id);
			}
		}
	}, [location]);

	useEffect(() => {
		if (menu === '개인정보관리') {
			setAlertTitle('개인정보관리 안내');
		} else {
			setAlertTitle('교환, 환불 신청 안내');
		}
	}, [menu]);

	return (
		<div id="container">
			<Container>
				<MyPageInside>
					<LogoImg alt="logo" src={logo} />
					<Title>마이페이지</Title>
					<MenuSelect
						menu={menu}
						setMenu={setMenu}
						setViewDetail={setViewDetail}
						setChangePWState={setChangePWState}
					/>
					{menu === '주문내역' && (
						<OrderHistory
							paymentList={paymentList}
							payment_id={payment_id}
							viewDetail={viewDetail}
							setViewDetail={setViewDetail}
							setAlertState={setAlertState}
							setAlertMsg={setAlertMsg}
							setAlertTitle={setAlertTitle}
						/>
					)}
					{menu === '개인정보관리' && (
						<Privacy
							changePWState={changePWState}
							setChangePWState={setChangePWState}
						/>
					)}
				</MyPageInside>
			</Container>
			{alertState && (
				<Alert
					title={alertTitle}
					msg={alertMsg}
					setAlertState={setAlertState}
				/>
			)}
		</div>
	);
};

export default MyPagePage;

const Container = styled.div`
	width: 192rem;
	padding: 10rem 0 10.3rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const MyPageInside = styled.div`
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
