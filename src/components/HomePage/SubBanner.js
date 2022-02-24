import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import * as _banner from '../../controller/banner';
import { IMG_ADDRESS } from '../../config';

const SubBanner = () => {
	const bannerBox = useRef();
	const [bannerList, setBannerList] = useState([]);
	const [bnnNum, setBnnNum] = useState(0);
	// const [autoScrollSwitch, setAutoScrollSwitch] = useState(true);
	let time;

	useEffect(() => {
		_banner.get_list('광고').then((res) => {
			const { success, banner_list } = res.data;
			if (success) {
				setBannerList(banner_list);
			}
		});
	}, []);

	useEffect(() => {
		bannerBox.current.scrollTo({
			left: bnnNum * 1200,
			behavior: 'smooth',
		});
		// if (!autoScrollSwitch) {
		// 	setAutoScrollSwitch(true);
		// }
		autoScroll();
		return () => {
			clearTimeout(time);
		};
	}, [bnnNum]);

	const autoScroll = () => {
		time = setTimeout(() => {
			if (bnnNum === bannerList.length - 1) {
				setBnnNum(0);
			} else if (bnnNum !== bannerList.length - 1) {
				setBnnNum(bnnNum + 1);
			}
		}, 4000);
	};

	return (
		<SubBannerContainer>
			<SubBannerWrap ref={bannerBox}>
				{bannerList &&
					bannerList.map((el, idx) => (
						<SubBannerList key={idx}>
							<SubBannerImg
								alt="sub_banner img"
								src={`${IMG_ADDRESS}/${el.image}`}
							/>
						</SubBannerList>
					))}
				{bannerList.length > 1 && (
					<BnnInfoDotBox>
						{bannerList &&
							bannerList.map((el, idx) => (
								<BnnInfoDot active={bnnNum === idx} key={idx}></BnnInfoDot>
							))}
					</BnnInfoDotBox>
				)}
			</SubBannerWrap>
		</SubBannerContainer>
	);
};

export default SubBanner;

const SubBannerContainer = styled.div`
	position: relative;
	width: 192rem;
	/* height: 56.6rem; */
	margin-top: 1.8rem;
	margin-bottom: 13.2rem;
`;
const SubBannerWrap = styled.ul`
	width: 120rem;
	height: 35rem;
	margin: 0 auto;
	display: flex;
	overflow-x: hidden;
`;
const SubBannerList = styled.li`
	width: 120rem;
	height: 35rem;
`;
const SubBannerImg = styled.img`
	width: 120rem;
	height: 35rem;
`;
const BnnInfoDotBox = styled.ul`
	width: 120rem;
	position: absolute;
	display: flex;
	justify-content: center;
	bottom: 1.4rem;
	z-index: 3;
`;
const BnnInfoDot = styled.li`
	width: 1.6rem;
	height: 1.6rem;
	background-color: #a0a0a0;
	border-radius: 50%;
	margin: 0.7rem;
	transition: all 200ms ease-in;
	${(props) =>
		props.active &&
		`background-color:#E50011; width:3.2rem; border-radius:10px;`}
`;
