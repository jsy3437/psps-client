import React, { useEffect, useState, useRef } from 'react';
import * as _banner from '../../controller/banner';
import { IMG_ADDRESS } from '../../config';
import styled from 'styled-components';

const SubBanner = () => {
	const bannerBox = useRef();
	const banner = useRef();
	const [bannerList, setBannerList] = useState([]);
	const [bnnNum, setBnnNum] = useState(0);
	const [autoScrollSwitch, setAutoScrollSwitch] = useState(true);
	let bannerWidth = banner.current && banner.current.offsetWidth;
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
		if (bannerList.length !== 1) {
			if (autoScrollSwitch && bnnNum === 0) {
				bannerBox.current.scrollTo({ left: 0 });
			}
			bannerBox.current.scrollTo({
				left: (bnnNum + 1) * bannerWidth,
				behavior: 'smooth',
			});
			setAutoScrollSwitch(true);
			autoScroll();
		}
		return () => {
			clearTimeout(time);
		};
		// eslint-disable-next-line
	}, [bnnNum]);

	const autoScroll = () => {
		time = setTimeout(() => {
			bnnNum === bannerList.length - 1
				? setBnnNum(0)
				: setBnnNum(bnnNum + 1);
		}, 4000);
	};

	const firstLoad = () => {
		bannerBox.current.scrollTo({ left: banner.current.offsetWidth });
	};

	return (
		<SubBannerContainer>
			<SubBannerWrap ref={bannerBox} onLoad={firstLoad}>
				<SubBannerList>
					{bannerList.length > 1 && (
						<TempSubBannerImg
							ref={banner}
							alt='sub banner image'
							src={`${IMG_ADDRESS}/${
								bannerList[bannerList.length - 1].image
							}`}
						/>
					)}
					{bannerList.map((el, idx) => (
						<SubBannerImg
							key={idx}
							ref={banner}
							alt='sub_banner img'
							src={`${IMG_ADDRESS}/${el.image}`}
						/>
					))}
					{bannerList.length > 1 && (
						<TempSubBannerImg
							alt='sub banner image'
							src={`${IMG_ADDRESS}/${bannerList[0].image}`}
						/>
					)}
				</SubBannerList>
				{bannerList.length > 1 && (
					<BnnInfoDotBox>
						{bannerList.map((el, idx) => (
							<BnnInfoDot key={idx} active={bnnNum === idx}></BnnInfoDot>
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
	margin-top: 1.8rem;
	margin-bottom: 13.2rem;
`;
const SubBannerWrap = styled.div`
	width: 120rem;
	height: 35rem;
	margin: 0 auto;
	display: flex;
	overflow: hidden;
`;
const SubBannerList = styled.div`
	display: flex;
	width: 120rem;
	height: 35rem;
`;
const SubBannerImg = styled.img`
	min-width: 100%;
	max-width: 100%;
	width: 100%;
	height: 35rem;
	object-fit: fill;
`;
const TempSubBannerImg = styled(SubBannerImg)``;
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
