import React from 'react';
import styled from 'styled-components';
import * as info from '../../config';

const ProductInfoTable = (props) => {
	// 항목 수정 필요함. 협의 후 진행하기
	const productInfoArr = [
		'품목명',
		'초신선 돼지 삼겹살',
		'이력관리대상',
		'축산물 유무이력 관리대상, 이력번호는 제품에 별도 표기',
		'내용량/중량',
		'600g(실중량은 제품에 별도 표기)',
		'보관방법',
		'2~10°C 냉장보관',
		'원산지',
		'국내산',
		'소비자 안전을 위한\n주의사항',
		'부정 불량식품 신고:국번없이 1399',
		'유통기한',
		'제품에 별도 표기',
		'소비자상담 전화',
		'1800-0658',
	];
	const deliveryInfoArr = [
		'배송방법',
		'신선/냉장/냉동',
		'배송사',
		'CJ대한통운',
		'배송비',
		'무료배송∙도서산간 추가 배송비 - 제주, 도서산간 지역',
		'묶음배송 여부',
		'가능',
	];
	const supplyInfoArr = [
		'상호/대표자',

		'사업자번호',

		'e-mail',

		'연락처',

		'사업장 소재지',
	];
	const refundInfoArr = [
		'- 식품의 경우 단순 소비자 단순 변심으로 인한 개인적인 사유로는 교환 및 환불이 불가합니다.',
		`- 상품의 변질, 이물질 발견, 아이스박스 및 아이스팩이 파손되어 배송될 경우 마이페이지 결제내역을 통해 교환/환불 요청을 보낼 수 있으며,\n  고객센터(${info.COMPANY_CONTACT})로 전화주시면 바로 교환/환불 해드리겠습니다.`,
		'- 고객센터 운영시간은 평일 오전 9시부터 오후 6시까지 입니다. (점심시간 : 오전 12시부터 오후 1시)',
	];

	return (
		// 홀수개가 들어있는 table은 ItemBox를 하나더 넣으면 border가 생김
		<InfoTableWrap ref={props.infoRef}>
			<Item>
				<Title>상품 정보</Title>
				<InfoTable>
					<InfoItemBox>
						<InfoTitle>품목명</InfoTitle>
						<InfoText>{props.detail && props.detail.title}</InfoText>
					</InfoItemBox>
					<InfoItemBox>
						<InfoTitle>이력관리대상</InfoTitle>
						<InfoText>
							축산물 유무이력관리대상, 이력번호는 제품에 별도 표기
						</InfoText>
					</InfoItemBox>
					<InfoItemBox>
						<InfoTitle>내용량 / 중량</InfoTitle>
						{/* TODO */}
						<InfoText>상세이미지 참조</InfoText>
					</InfoItemBox>
					<InfoItemBox>
						<InfoTitle>보관방법</InfoTitle>
						<InfoText>{props.detail && props.detail.storage}</InfoText>
					</InfoItemBox>
					<InfoItemBox>
						<InfoTitle>원산지</InfoTitle>
						<InfoText>{props.detail && props.detail.origin}</InfoText>
					</InfoItemBox>
					<InfoItemBox>
						<InfoTitle doubleLine>소비자안전을 위한 주의사항</InfoTitle>
						<InfoText>부정불량식품 신고 국번 없이 1399</InfoText>
					</InfoItemBox>
					<InfoItemBox>
						<InfoTitle>유통기한</InfoTitle>
						<InfoText>제품에 별도 표기</InfoText>
					</InfoItemBox>
					<InfoItemBox>
						<InfoTitle>소비자상담 전화</InfoTitle>
						<InfoText>{info.COMPANY_CONTACT}</InfoText>
					</InfoItemBox>
				</InfoTable>
			</Item>
			<Item>
				<Title>배송 정보</Title>
				<InfoTable>
					<InfoItemBox>
						<InfoTitle>배송방법</InfoTitle>
						<InfoText>신선 / 냉장 / 냉동</InfoText>
					</InfoItemBox>
					<InfoItemBox>
						<InfoTitle>배송사</InfoTitle>
						<InfoText>CJ 대한통운</InfoText>
					</InfoItemBox>
					<InfoItemBox>
						<InfoTitle>배송비</InfoTitle>
						<InfoText>
							무료배송 ∙ 도서산간 추가 배송비 - 제주, 도서산간 지역 : 5,000원
						</InfoText>
					</InfoItemBox>
					<InfoItemBox>
						<InfoTitle>묶음배송 여부</InfoTitle>
						<InfoText>가능</InfoText>
					</InfoItemBox>
				</InfoTable>
			</Item>
			<Item>
				<Title>판매자 정보</Title>
				<InfoTable>
					<InfoItemBox>
						<InfoTitle>상호/대표자</InfoTitle>
						<InfoText>
							{props.detail &&
								`${props.detail.supplier_name} / ${props.detail.supplier_owner}`}
						</InfoText>
					</InfoItemBox>
					<InfoItemBox>
						<InfoTitle>사업자 번호</InfoTitle>
						<InfoText>
							{props.detail && props.detail.supplier_business_number}
						</InfoText>
					</InfoItemBox>
					<InfoItemBox>
						<InfoTitle>e-mail</InfoTitle>
						<InfoText>{props.detail && props.detail.supplier_email}</InfoText>
					</InfoItemBox>
					<InfoItemBox>
						<InfoTitle>연락처</InfoTitle>
						<InfoText>{props.detail && props.detail.supplier_tel}</InfoText>
					</InfoItemBox>
					<InfoItemBox>
						<InfoTitle>사업장 소재지</InfoTitle>
						<InfoText>{props.detail && props.detail.supplier_address}</InfoText>
					</InfoItemBox>
					<InfoItemBox></InfoItemBox>
				</InfoTable>
			</Item>
			<Item>
				<Title>교환/환불 안내</Title>
				<InfoItemBox column>
					{refundInfoArr.map((el, idx) => (
						<InfoText long key={idx}>
							{el}
						</InfoText>
					))}
				</InfoItemBox>
			</Item>
		</InfoTableWrap>
	);
};

export default ProductInfoTable;

const InfoTableWrap = styled.div`
	width: 192rem;
	margin-bottom: 7.75rem;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Item = styled.div``;
const Title = styled.p`
	height: 4rem;
	line-height: 4rem;
	font-size: 2.8rem;
	font-family: 'kr-b';
	color: #000000;
	margin-bottom: 1.15rem;
`;
const InfoTable = styled.div`
	margin-bottom: 4.6rem;
	width: 120rem;
	border-top: 1px solid #e0e0e0;
	border-left: 1px solid #e0e0e0;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
`;
const InfoItemBox = styled.div`
	display: flex;
	align-items: center;
	font-size: 1.8rem;
	letter-spacing: -0.72px;
	color: #6b6462;
	border-bottom: 1px solid #e0e0e0;
	${(props) =>
		props.column &&
		`flex-direction: column; border-top:1px solid #e0e0e0; width:120rem; padding:3.05rem 0`}
`;
const InfoTitle = styled.p`
	width: 18rem;
	height: 7.4rem;
	font-family: 'kr-b';
	background-color: #f8f8f8;
	padding: 2.4rem 2rem;
	${(props) => props.doubleLine && `padding:1.1rem 2rem;`}
`;
const InfoText = styled.p`
	font-family: 'kr-r';
	padding: 0 0.5rem 0 2rem;
	max-width: 42rem;
	${(props) =>
		props.long && `padding:0; max-width:none; width:120rem; font-size:2rem`}
`;
const InfoList = styled.li`
	width: 18rem;
	height: 7.4rem;
	line-height: 7.4rem;
	font-size: 1.8rem;
	font-family: 'kr-r';
	color: #6b6462;
	padding-left: 2rem;
	white-space: pre-wrap;
	/* border-top: 1px solid #e0e0e0;
	border-bottom: 1px solid #e0e0e0; */
	background: #f8f8f8 0% 0% no-repeat padding-box;
	&:nth-child(2n) {
		width: 42rem;
		background-color: #fff;
	}
	&:nth-last-child(1) {
		/* border-top: 1px solid #e0e0e0; */
	}
`;
const InfoTextBox = styled.div`
	margin: 1.15rem 0;
	padding: 3.05rem 0;
	border-top: 1px solid #e0e0e0;
	border-bottom: 1px solid #e0e0e0;
`;
// const InfoText = styled.p`
// 	font-size: 2rem;
// 	font-family: 'kr-r';
// 	color: #6b6462;
// `;
