import * as React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Loading } from './components';
import LoginScreen from './pages/LoginScreen';

// lazy import
const Activate = React.lazy(() => import('./pages/Activate'));
const Reset = React.lazy(() => import('./pages/Reset'));

function UnauthApp(): JSX.Element {
	return (
		<>
			<React.Suspense fallback={<Loading />}>
				<Routes>
					<Route path="/" element={<LoginScreen />} />
					<Route path="/activate" element={<Activate />} />
					<Route path="/reset" element={<Reset />} />
					<Route path="*" element={<Navigate to={{ pathname: '/' }} />} />
				</Routes>
			</React.Suspense>
		</>
	);
}

export default UnauthApp;
