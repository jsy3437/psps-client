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
			}
		}
	);
};
