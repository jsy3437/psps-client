import { createGlobalStyle } from 'styled-components';
import KR_Regular from '../fonts/Noto_Sans_KR_woff/NotoSansKR-Regular.woff';
import KR_Black from '../fonts/Noto_Sans_KR_woff/NotoSansKR-Black.woff';

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
	
`;
export default GlobalFonts;
