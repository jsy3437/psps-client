import React from 'react';
import styled from 'styled-components';
import profileIco from '../../images/ico-profile.svg';
import historyIco from '../../images/ico-history.svg';
import cartIco from '../../images/ico-mobileCart.svg';
import Category from '../HomePage/Category';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MobileMenu = (props) => {
	const history = useHistory();
	const user = useSelector((state) => state.user);
	const privacyBtn = [
		{
			name: '마이페이지',
			src: profileIco,
			url: '/members',
			state: '개인정보관리',
		},
		{
			name: '주문내역',
			src: historyIco,
			url: '/members',
			state: '주문내역',
		},
		{
			name: '장바구니',
			src: cartIco,
			url: '/cart',
			state: '',
		},
	];

	const goPrivacy = (el) => {
		if (!user.login) {
			props.setAlertMsg('로그인 후 이용가능합니다.');
			return props.setAlertState(true);
		}

		history.push({ pathname: el.url, state: { type: el.state } });
		props.setMenuState(false);
	};

	const goIntro = () => {
		history.push('/intro');
		props.setMenuState(false);
	};

	const goService = () => {
		history.push('/service');
		props.setMenuState(false);
	};

	return (
		<MobileMenuWrap>
			<PrivacyBtnWrap>
				{privacyBtn.map((el, idx) => (
					<PrivacyBtnBox key={idx}>
						<PrivacyImgBox
							onClick={() => {
								goPrivacy(el);
							}}
						>
							<PrivacyImg alt={`${el} icon image`} src={el.src} />
						</PrivacyImgBox>
						<PrivacyName>{el.name}</PrivacyName>
					</PrivacyBtnBox>
				))}
			</PrivacyBtnWrap>
			<CategoryWrap>
				<Category navbar={true} setMenuState={props.setMenuState} />
			</CategoryWrap>
			<ServiceWrap>
				<ServiceBtn onClick={goIntro}>품생품사란</ServiceBtn>
				<ServiceBtn onClick={goService}>고객센터</ServiceBtn>
			</ServiceWrap>
		</MobileMenuWrap>
	);
};

export default MobileMenu;

const MobileMenuWrap = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: #fff;
	display: flex;
	align-items: center;
	flex-direction: column;
	/* touch-action: none; */
`;
const PrivacyBtnWrap = styled.div`
	width: 100%;
	padding: 13px;
	display: flex;
	align-items: center;
`;
const PrivacyBtnBox = styled.div`
	width: 70px;
	margin: 12px 2px;
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
`;
const PrivacyImgBox = styled.div`
	width: 36px;
	height: 36px;
`;
const PrivacyImg = styled.img`
	width: 100%;
	height: 100%;
`;
const PrivacyName = styled.p`
	font-size: 12px;
	font-family: 'kr-b';
	letter-spacing: -0.48px;
	color: #5c5c5c;
`;
const CategoryWrap = styled.div`
	width: 100%;
	border-top: 4px solid #f4f4f4;
	border-bottom: 4px solid #f4f4f4;
`;
const ServiceWrap = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: 16px;
`;
const ServiceBtn = styled.h2`
	width: fit-content;
	font-size: 16px;
	font-family: 'kr-b';
	letter-spacing: -0.64px;
	color: #5c5c5c;
	padding: 6px;
	margin-bottom: 16px;
	cursor: pointer;
`;
