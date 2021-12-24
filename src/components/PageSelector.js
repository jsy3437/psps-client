import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Left from '../images/page_left.svg';
import Right from '../images/page_right.svg';

const PageSelector = ({ page, total, onClickPage, style }) => {
	const [pages, setPages] = useState([]);
	const totalPage = Math.ceil(total / 12);
	useEffect(() => {
		const update = [];
		for (let i = 1; i <= totalPage; i++) {
			if (page <= 3) {
				if (1 <= i && i <= 5) {
					update.push(i);
				}
			} else if (totalPage - 2 <= page) {
				if (totalPage - 4 <= i && i <= totalPage) {
					update.push(i);
				}
			} else {
				if (page - 2 <= i && i <= page + 2) {
					update.push(i);
				}
			}
		}
		setPages(update);
	}, [total, page]);

	return (
		<PageList style={style}>
			<PageItem onClick={page === 1 ? null : () => onClickPage(page - 1)}>
				<MoveButton alt='prev button' src={Left} />
			</PageItem>
			{pages.map((el, idx) => (
				<PageItem
					key={idx}
					selected={el === page}
					onClick={() => onClickPage(el)}>
					{el}
				</PageItem>
			))}
			<PageItem
				onClick={page === totalPage ? null : () => onClickPage(page + 1)}>
				<MoveButton alt='next button' src={Right} />
			</PageItem>
		</PageList>
	);
};

export default PageSelector;

const PageList = styled.ul`
	margin-bottom: 6rem;
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const PageItem = styled.li`
	cursor: pointer;
	width: 3.4rem;
	height: 1.8rem;
	line-height: 1.8rem;
	font-size: 1.8rem;
	font-family: 'kr-b';
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	${(props) => (props.selected ? ' color: #E50011;' : 'color:#221814; ')}
	text-align: center;
`;
const MoveButton = styled.img`
	width: 1.1rem;
	height: 1.8rem;
`;
