import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { rootReducer } from './modules';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import GlobalFonts from './styles/GlobalFonts';

const store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<GlobalStyle />
			<GlobalFonts />
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
