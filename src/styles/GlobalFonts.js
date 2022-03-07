import { createGlobalStyle } from 'styled-components';
import KR_Regular from '../fonts/Noto_Sans_KR_woff/NotoSansKR-Regular.woff';
import KR_Black from '../fonts/Noto_Sans_KR_woff/NotoSansKR-Bold.woff';
import Roboto_Black from '../fonts/Roboto_woff/Roboto-Bold.woff';
import Roboto_Regular from '../fonts/Roboto_woff/Roboto-Regular.woff';

const GlobalFonts = createGlobalStyle`
	@font-face {
		font-family:'kr-b';
		src:local('kr-b'),
		url(${KR_Black}) format('woff')
	}
	@font-face {
		font-family:'kr-r';
		src:local('kr-r'),
		url(${KR_Regular}) format('woff')
	}
	@font-face {
		font-family:'ro-b';
		src:local('ro-b'),
		url(${Roboto_Black}) format('woff')
	}
	@font-face {
		font-family:'ro-r';
		src:local('ro-r'),
		url(${Roboto_Regular}) format('woff')
	}
	
`;
export default GlobalFonts;
