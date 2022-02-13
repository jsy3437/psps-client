import React, { useState } from 'react';
import styled from 'styled-components';
import DaumPost from '../DaumPostCode';
import checkImg from '../../images/check_btn.svg';
import uncheckImg from '../../images/uncheck_btn.svg';

const UserData = () => {
	const orderUserDataTitle = ['이름', '연락처', '이메일'];
	const receiveUserPlaceholder = [
		'받으시는 분 이름을 입력해주세요.',
		'연락처를 입력해주세요.',
		'내용을 입력해주세요.',
	];

	const [checked, setChecked] = useState(false);
	const [postAddr, setPostAddr] = useState('');
	const [postExtraAddr, setPostExtraAddr] = useState('');
	const [postcodeOpen, setPostcodeOpen] = useState(false);

	const onCheck = () => {
		setChecked(!checked);
	};

	const goDaumPostcode = () => {
		window.open('', 'daum', 'width=500,height=700');
		window.document.write(`<${DaumPost}/>`);
		// setPostcodeOpen(true);

		// new daum.Postcode({
		// 	oncomplete: function (data) {
		// 		// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
		// 		// 각 주소의 노출 규칙에 따라 주소를 조합한다.
		// 		// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
		// 		var addr = ''; // 주소 변수
		// 		var extraAddr = ''; // 참고항목 변수
		// 		//사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
		// 		if (data.userSelectedType === 'R') {
		// 			// 사용자가 도로명 주소를 선택했을 경우
		// 			addr = data.roadAddress;
		// 		} else {
		// 			// 사용자가 지번 주소를 선택했을 경우(J)
		// 			addr = data.jibunAddress;
		// 		}
		// 		// 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
		// 		if (data.userSelectedType === 'R') {
		// 			// 법정동명이 있을 경우 추가한다. (법정리는 제외)
		// 			// 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
		// 			if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
		// 				extraAddr += data.bname;
		// 			}
		// 			// 건물명이 있고, 공동주택일 경우 추가한다.
		// 			if (data.buildingName !== '' && data.apartment === 'Y') {
		// 				extraAddr +=
		// 					extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
		// 			}
		// 			// 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
		// 			if (extraAddr !== '') {
		// 				extraAddr = ' (' + extraAddr + ')';
		// 			}
		// 			// 조합된 참고항목을 해당 필드에 넣는다.
		// 			setPostExtraAddr(extraAddr);
		// 		} else {
		// 			setPostExtraAddr('');
		// 		}
		// 		console.log('data', data);
		// 		// 우편번호와 주소 정보를 해당 필드에 넣는다.
		// 		// document.getElementById('sample6_postcode').value = data.zonecode;
		// 		// document.getElementById('sample6_address').value = addr;
		// 		// 커서를 상세주소 필드로 이동한다.
		// 		document.getElementById('sample6_detailAddress').focus();
		// 	},
		// }).open();
	};
	return (
		<UserDataWrap>
			<OrderUserWrap>
				<Title>보내시는 분</Title>
				<BorderBox>
					{orderUserDataTitle.map((el) => (
						<DataBox order>
							<DataTitle order>{el}</DataTitle>
							<OrderUserText>sadfsf</OrderUserText>
						</DataBox>
					))}
				</BorderBox>
			</OrderUserWrap>
			<ReceiveUserWrap>
				<ReceiveUserTitleBox>
					<Title receive>받으시는 분</Title>
					<CheckImg
						alt="check button"
						src={checked ? checkImg : uncheckImg}
						onClick={onCheck}
					/>
					<CheckInfo>주문자 정보 가져오기</CheckInfo>
				</ReceiveUserTitleBox>
				<BorderBox>
					<DataBox>
						<DataTitle>이름</DataTitle>
						<ReceiveUserInput
							placeholder={receiveUserPlaceholder[0]}
						></ReceiveUserInput>
					</DataBox>
					<DataBox>
						<DataTitle>연락처</DataTitle>
						<ReceiveUserInput
							placeholder={receiveUserPlaceholder[1]}
						></ReceiveUserInput>
					</DataBox>
					<DataBox>
						<DataTitle>배송지</DataTitle>
						<InputBox>
							<InputAndPostcode>
								<ReceiveUserInput></ReceiveUserInput>
								<InputPostcodeBtn onClick={goDaumPostcode}>
									우편번호 찾기
								</InputPostcodeBtn>
							</InputAndPostcode>

							<ReceiveUserInput long destination></ReceiveUserInput>
							<ReceiveUserInput long destination></ReceiveUserInput>
						</InputBox>
					</DataBox>

					<DataBox>
						<DataTitle>배송요청사항</DataTitle>
						<ReceiveUserInput
							long
							placeholder={receiveUserPlaceholder[2]}
						></ReceiveUserInput>
					</DataBox>
				</BorderBox>
			</ReceiveUserWrap>
		</UserDataWrap>
	);
};

export default UserData;

const UserDataWrap = styled.div`
	width: 100%;
`;
const OrderUserWrap = styled.div`
	width: 100%;
	margin-bottom: 6rem;
`;
const Title = styled.h2`
	font-size: 1.8rem;
	font-family: 'kr-b';
	letter-spacing: -0.072rem;
	margin: 0 auto 1.3rem 1.5rem;
	${(props) => props.receive && `margin: 0 auto 0.6rem 1.5rem`}
`;
const BorderBox = styled.ul`
	width: 100%;
	padding: 2rem 4rem 0;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	box-shadow: 0px 0px 10px #00000014;
`;
const DataBox = styled.li`
	display: flex;
	align-items: flex-start;
	margin: 3rem 0;
	${(props) => props.order && `margin:0 0 2rem`}
`;

const DataTitle = styled.p`
	width: 7.4rem;
	font-size: 1.4rem;
	font-family: 'kr-b';
	text-align: left;
	letter-spacing: -0.056rem;
	color: #6b6462;
	margin-right: 6.1rem;
	padding-top: 1rem;
	${(props) => props.order && `padding-top:0`}
`;
const OrderUserText = styled.p`
	font-size: 1.4rem;
	font-family: 'kr-r';
	text-align: left;
	letter-spacing: -0.056rem;
	color: #221814;
`;
const ReceiveUserWrap = styled.div`
	width: 100%;
`;
const ReceiveUserTitleBox = styled.div`
	display: flex;
	align-items: center;
`;
const CheckImg = styled.img`
	width: 1.4rem;
	height: 1.4rem;
	cursor: pointer;
`;
const CheckInfo = styled.span`
	font-size: 1.2rem;
	font-family: 'kr-b';
	letter-spacing: -0.048rem;
	color: #6b6462;
	margin: 0 1.5rem 0 1rem;
`;

const ReceiveUserInput = styled.input`
	width: 23.8rem;
	padding: 1.2rem;
	display: block;
	border: 1px solid #c6c6c6;
	border-radius: 4px;
	background-color: #fff;
	letter-spacing: -0.056rem;
	text-align: left;
	font-size: 1.4rem;
	margin-bottom: 2rem;
	&::placeholder {
		letter-spacing: -0.56px;
		color: #c6c6c6;
	}
	&:focus {
		margin-bottom: 1.8rem;
	}
	${(props) => props.long && `width:34.6rem`}
`;
const InputBox = styled.div`
	width: 34.6rem;
`;
const InputAndPostcode = styled.div`
	display: flex;
	justify-content: space-between;
`;
const InputPostcodeBtn = styled.div`
	height: 4.3rem;
	background-color: #f2f2f2;
	border: 1px solid #c6c6c6;
	border-radius: 4px;
	font-size: 1.4rem;
	font-family: 'kr-b';
	letter-spacing: -0.28px;
	padding: 1rem 1rem;
	color: #8e8e8e;
	cursor: pointer;
`;
