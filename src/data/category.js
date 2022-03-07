import bread from '../images/bnn_bread.png';
import cabbage from '../images/bnn_cabbage.png';
import dish from '../images/bnn_dish.png';
import meat from '../images/bnn_meat.png';
import shrimp from '../images/bnn_shrimp.png';
import side from '../images/bnn_side.png';
import snack from '../images/bnn_snack.png';
import tea from '../images/bnn_tea.png';

export const mainCategories = [
	'농산',
	'수산',
	'축산',
	'건강·음료',
	'생활·주방',
	'간식',
	'반찬',
	'가정 간편식',
];
export const subCategories = [
	'전체보기',
	'과일·수입청과',
	'샐러드·기본채소',
	'즙용·특수채소',
	'버섯·건나물류',
	'쌀·잡곡',
];

export const page = [
	'메인페이지',
	'품생품사란',
	'상품 카테고리',
	'상품 상세보기',
	'고객센터',
	'회원가입',
	'로그인',
];

export const part = [
	{
		title: '농산',
		arr: [
			'전체보기',
			'과일·수입청과',
			'샐러드·기본채소',
			'즙용·특수채소',
			'버섯·건나물류',
			'쌀·잡곡',
		],
		bnnImg: cabbage,
	},
	{
		title: '수산',
		arr: [
			'전체보기',
			'일반생선류',
			'새우·오징어',
			'액젖·젖갈류',
			'김·해조류·건어물',
			'어묵·수산가공',
		],
		bnnImg: shrimp,
	},
	{
		title: '축산',
		arr: [
			'전체보기',
			'닭·오리',
			'무항생제 한우',
			'한우',
			'돼지고기',
			'족발·육포·육가공',
		],
		bnnImg: meat,
	},
	{
		title: '건강·음료',
		arr: [
			'전체보기',
			'건강즙류',
			'천연과즙',
			'홍삼·인삼',
			'죽염·흑마늘',
			'꿀·조청',
		],
		bnnImg: tea,
	},
	{
		title: '생활·주방',
		arr: ['전체보기', '마스크·위생장갑'],
		bnnImg: dish,
	},
	{
		title: '간식',
		arr: ['전체보기', '과자·간식', '떡·빵·한과', '만두'],
		bnnImg: snack,
	},
	{
		title: '반찬',
		arr: ['전체보기', '밑반찬·절임류', '김치류', '나물'],
		bnnImg: side,
	},
	{
		title: '가정 간편식',
		arr: ['전체보기', '국·탕·찌개', '죽·스프·카레'],
		bnnImg: bread,
	},
];
