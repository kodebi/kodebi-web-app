import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import { App } from './app';
import { LayoutProvider } from './context/LayoutContext';
import { AuthProvider } from './context/AuthContext';

const app = document.getElementById('root');
const root = createRoot(app);

root.render(
	<React.StrictMode>
		<Router>
			<LayoutProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</LayoutProvider>
		</Router>
	</React.StrictMode>
);
