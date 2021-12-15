import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import next_btn from '../images/next_btn.svg';
import final_btn from '../images/final_btn.svg';

const PageSelector = ({ page, total, onClickPage, style }) => {
	const [pages, setPages] = useState([]);
	useEffect(() => {
		const _total = Math.ceil(total / 12);
		const update = [];
		for (let i = 1; i <= _total; i++) {
			if (page <= 3) {
				if (1 <= i && i <= 5) {
					update.push(i);
				}
			} else if (_total - 2 <= page) {
				if (_total - 4 <= i && i <= _total) {
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
		<>
			<PageList style={style}>
				{5 < page && (
					<PageItem onClick={() => onClickPage(1)}>
						<img
							style={imgRotateStyle}
							alt='final button'
							src={final_btn}
						/>
					</PageItem>
				)}
				{1 < page && (
					<PageItem onClick={() => onClickPage(page - 1)}>
						<img
							style={imgRotateStyle}
							alt='next button'
							src={next_btn}
						/>
					</PageItem>
				)}
				{pages.map((el, idx) => (
					<PageItem
						selected={el === page}
						key={idx}
						onClick={() => onClickPage(el)}>
						{el}
					</PageItem>
				))}
				{page < Math.ceil(total / 12) && (
					<PageItem onClick={() => onClickPage(page + 1)}>
						<img alt='next button' src={next_btn} />
					</PageItem>
				)}
				{page < Math.ceil(total / 12) && (
					<PageItem onClick={() => onClickPage(Math.ceil(total / 9))}>
						<img alt='final button' src={final_btn} />
					</PageItem>
				)}
			</PageList>
		</>
	);
};

export default PageSelector;

const PageList = styled.ul`
	margin-bottom: 17.4rem;
	width: 30%;
	display: grid;
	grid-template-columns: repeat(9, 1fr);
	column-gap: 0.8rem;
	justify-content: end;
`;
const PageItem = styled.li`
	cursor: pointer;
	width: 2.7rem;
	height: 2.7rem;
	border-radius: 50%;
	font-size: 1.5rem;
	font-family: 'kr-r';
	${(props) =>
		props.selected
			? ' color: white; background-color: #5887FF;'
			: 'color: #585757; background-color: #F4F4F4;'}
	text-align: center;
`;

const imgRotateStyle = { transform: 'rotate(180deg)' };
