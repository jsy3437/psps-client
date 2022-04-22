const deviceSizes = {
	mobile: '500px',
	tablet: '768px',
	laptop: '1024px',
	desktop: '1280px',
};

const device = {
	mobile: `screen and (max-width:${deviceSizes.mobile})`,
	tablet: `screen and (max-width:${deviceSizes.tablet})`,
	laptop: `screen and (max-width:${deviceSizes.laptop})`,
	desktop: `screen and (max-width:${deviceSizes.desktop})`,
};

const theme = {
	device,
};

export default theme;
