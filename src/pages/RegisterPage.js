import React, { useEffect, useState } from 'react';
import FirstStep from '../components/RegisterPage/FirstStep';
import SecondStep from '../components/RegisterPage/SecondStep';
import ThirdStep from '../components/RegisterPage/ThirdStep';
import LastStep from '../components/RegisterPage/LastStep';
import Alert from '../components/Modal/Alert';

const RegisterPage = () => {
	const [step, setStep] = useState(1);
	const [alertState, setAlertState] = useState(false);
	const [alertMsg, setAlertMsg] = useState('');

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div id="container">
			{step === 1 && (
				<FirstStep
					setStep={setStep}
					setAlertState={setAlertState}
					setAlertMsg={setAlertMsg}
				/>
			)}
			{step === 2 && <SecondStep setStep={setStep} />}
			{step === 3 && (
				<ThirdStep
					setStep={setStep}
					setAlertState={setAlertState}
					setAlertMsg={setAlertMsg}
				/>
			)}
			{step === 4 && <LastStep setStep={setStep} />}
			{alertState && (
				<Alert
					title={'회원가입 안내'}
					msg={alertMsg}
					setAlertState={setAlertState}
				/>
			)}
		</div>
	);
};

export default RegisterPage;
