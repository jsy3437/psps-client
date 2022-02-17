import * as _payment from './controller/payment';
export const payment_request = (impData, paymentProduct, pasteAddrChecked) => {
	const IMP = window.IMP;
	IMP.init('iamport'); // 가맹점 식별코드자리

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
						payment_products: paymentProduct,
						delivery_price: 3000,
						paste_add: pasteAddrChecked,
					})
					.then((res) => {
						const { success } = res.data;
						if (success) {
							console.log(res);
							window.location.href = `http://localhost:3000/payment/result/${res.data.payment_id}`;
						} else {
							console.error('결제 완료, 서버 전달 실패');
						}
					});
			} else {
				let msg = '결제에 실패하였습니다.';
				msg += '실패사유 : ' + rsp.error_msg;
				alert(msg);
			}
		}
	);
};
