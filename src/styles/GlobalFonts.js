import { createGlobalStyle } from 'styled-components';
import KR_Bold from '../fonts/Noto_Sans_KR_woff/NotoSansKR-Bold.woff';
import KR_Regular from '../fonts/Noto_Sans_KR_woff/NotoSansKR-Regular.woff';

const GlobalFonts = createGlobalStyle`
	@font-face {
		font-family:'kr-b';
		src:local('kr-b'),
		url(${KR_Bold}) format('woff')
	}
	@font-face {
		font-family:'kr-r';
		src:local('kr-r'),
		url(${KR_Regular}) format('woff')
	}
`;
export default GlobalFonts;
