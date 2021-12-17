import React, { useEffect, useState } from 'react';
import FirstStep from '../components/RegisterPage/FirstStep';
import SecondStep from '../components/RegisterPage/SecondStep';
import ThirdStep from '../components/RegisterPage/ThirdStep';
import LastStep from '../components/RegisterPage/LastStep';
import Footer from '../components/Footer';

const RegisterPage = () => {
	const [step, setStep] = useState(1);
	const getStep = (step) => {
		setStep(step);
	};

	console.log(step);

	return (
		<div id='container'>
			{step === 1 && <FirstStep getStep={getStep} />}
			{step === 2 && <SecondStep getStep={getStep} />}
			{step === 3 && <ThirdStep getStep={getStep} />}
			{step === 4 && <LastStep getStep={getStep} />}
			<Footer />
		</div>
	);
};

export default RegisterPage;
