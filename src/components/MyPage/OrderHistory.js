import React from 'react';
import styled from 'styled-components';
import ex1 from '../../images/ex1.png';

const OrderHistory = () => {
	const list = Array(5).fill('주문내용');

	return (
		<OrderHistoryWrap>
			{list.map((el, idx) => (
				<OrderHistoryList key={idx}>
					<ListImg alt='product img' src={ex1} />
					<ListContents></ListContents>
					<ListButtons>
						<ListButton>배송조회</ListButton>
						<ListButton>주문상세보기</ListButton>
						<ListButton last>교환,반품 신청</ListButton>
					</ListButtons>
				</OrderHistoryList>
			))}
		</OrderHistoryWrap>
	);
};

export default OrderHistory;

const OrderHistoryWrap = styled.ul`
	margin-bottom: 5.2rem;
`;
const OrderHistoryList = styled.li`
	margin-bottom: 2rem;
	width: 69.7rem;
	height: 17.6rem;
	box-shadow: 2px 6px 18px #00000014;
	border-radius: 4px;
	display: flex;
	&:nth-last-child(1) {
		margin: 0;
	}
`;
const ListImg = styled.img`
	width: 27.5%;
	height: 100%;
	border: 1px solid red;
`;
const ListContents = styled.div`
	width: 47.5%;
	height: 100%;
`;
const ListButtons = styled.div`
	width: 25%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: 1px solid red;
`;
const ListButton = styled.button`
	width: 13.5rem;
	height: 4rem;
	margin-bottom: 0.6rem;
	${(props) =>
		props.last ? null : `margin-bottom:0; background-color:#221814`}
`;
