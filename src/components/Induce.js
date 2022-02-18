import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import img from '../images/induce.png';
import * as _banner from '../controller/banner';

const Induce = () => {
	const [subBannerList, setSubBannerList] = useState([]);

	useEffect(() => {
		_banner.get_list('광고').then((res) => {
			console.log(res.data);
			const { success, banner_list } = res.data;
			if (success) {
				setSubBannerList(banner_list);
			}
		});
	}, []);

	return (
		<InduceContainer>
			<InduceImg alt="" src={img} />
		</InduceContainer>
	);
};

export default Induce;

const InduceContainer = styled.div`
	width: 192rem;
	height: 39rem;
	display: flex;
	justify-content: center;
`;
const InduceImg = styled.img`
	width: 120rem;
	height: 25rem;
	margin-top: 4rem;
`;
