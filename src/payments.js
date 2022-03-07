<<<<<<< HEAD
export const payment_request = () => {
	const IMP = window.IMP;
	IMP.init('iamport');
	IMP.request_pay(
		{
			merchant_uid: 'merchant_' + new Date().getTime(),
			name: '결제테스트',
			amount: 100,
			buyer_email: 'iamport@siot.do',
			buyer_name: '구매자',
			buyer_tel: '010-50007-4116',
			buyer_addr: '경기도 안산시',
			buyer_postcode: '123-456',
		},
		function (rsp) {
			if (rsp.success) {
				let msg = '결제가 완료되었습니다';
				msg += '고유ID : ' + rsp.imp_uid;
				msg += '상점 거래ID : ' + rsp.merchant_uid;
				msg += '결제 금액 : ' + rsp.paid_amount;
				msg += '카드 승인번호 : ' + rsp.apply_num;
			} else {
				let msg = '결제에 실패하였습니다.';
				msg += '에러내용 : ' + rsp.error_msg;
=======
import * as _payment from './controller/payment';
import { IMP_ID } from './config';
export const payment_request = (
	impData,
	pasteAddrChecked,
	delivery,
	payment_product_list
) => {
	const IMP = window.IMP;
	IMP.init(`${IMP_ID}`); // 가맹점 식별코드자리

	IMP.request_pay(
		{
			...impData,
			pay_method: 'card',
			merchant_uid: 'merchant_' + new Date().getTime(),
		},
		function (rsp) {
			if (rsp.success) {
				_payment
					.payment({
						imp_result: rsp,
						payment_products: payment_product_list,
						paste_add: pasteAddrChecked,
						delivery,
					})
					.then((res) => {
						const { success } = res.data;
						if (success) {
							// window.location.href = `http://localhost:3000/payment/result/${res.data.payment_id}`;
							window.location.href = `http://makinet.kr/payment/result/${res.data.payment_id}`;
						} else {
							alert(`${res.data.msg}`);
						}
					});
			} else {
				let msg = '결제에 실패하였습니다.';
				msg += '실패사유 : ' + rsp.error_msg;
				alert(msg);
>>>>>>> psps/seoyoon
			}
		}
	);
};
