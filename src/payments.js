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
			}
		}
	);
};
