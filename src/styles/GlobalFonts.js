import { createGlobalStyle } from 'styled-components';
import CJK_KR_Bold from '../fonts/NotoSansCjkKr/NotoSansCJKkr-Bold.woff';
import CJK_KR_Regular from '../fonts/NotoSansCjkKr/NotoSansCJKkr-Regular.woff';

const GlobalFonts = createGlobalStyle`
	@font-face {
		font-family:"cjk-b";
		src:local("cjk-b"),
		url(${CJK_KR_Bold}) format('woff')
	}
	@font-face {
		font-family:"cjk-r";
		src:local("cjk-r"),
		url(${CJK_KR_Regular}) format('woff')
	}
`;
export default GlobalFonts;
