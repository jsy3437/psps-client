import REACT, { useState } from 'react';
import DaumPostCode from 'react-daum-postcode';

const DaumPost = (props, {}) => {
	console.log(props.inputDetailAddr);
	const style = {
		width: '100%',
		height: '100%',
		padding: '1rem',
	};
	const handleComplete = (data) => {
		let fullAddress = data.address;
		let extraAddress = '';

		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress +=
					extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}

		props.setPostAddr(fullAddress);
		props.setPostZoneCode(data.zonecode);
		props.setPostcodeOpen(false);
		props.inputDetailAddr.current.focus();
	};
	return (
		<DaumPostCode
			onComplete={handleComplete}
			className="post-code"
			style={style}
		/>
	);
};
export default DaumPost;
