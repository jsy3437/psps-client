import React, { useState } from 'react';
import FirstStep from '../components/RegisterPage/FirstStep';
import SecondStep from '../components/RegisterPage/SecondStep';
import ThirdStep from '../components/RegisterPage/ThirdStep';
import LastStep from '../components/RegisterPage/LastStep';
import Footer from '../components/Footer';

const RegisterPage = () => {
	const [step, setStep] = useState(1);

	return (
		<div id='container'>
			{step === 1 && <FirstStep setStep={setStep} />}
			{step === 2 && <SecondStep setStep={setStep} />}
			{step === 3 && <ThirdStep setStep={setStep} />}
			{step === 4 && <LastStep setStep={setStep} />}
			<Footer />
		</div>
	);
};

export default RegisterPage;
