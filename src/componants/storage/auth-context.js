import React, { useState } from 'react';
import PocketBase from 'pocketbase';

const client = new PocketBase('http://127.0.0.1:8090');

const AuthContext = React.createContext({
	token: '',
	user: { id: 'blank' },
	isLoggedIn: false,
	sellerPageId: null,
	login: (token) => {},
	logout: () => {},
});

export const AuthContextProvider = (props) => {
	const [token, setToken] = useState(null);
	const [user, setUser] = useState({ id: 'blank' });
	const [sellerPageId, setSellerPageId] = useState(null);

	const userIsLoggedIn = !!token;

	const loginHandler = (authData, producerId) => {
		console.log('login handler');
		setToken(authData.token);
		setUser(authData.user);
		if (producerId.items.length > 0) {
			console.log('there is a producer id', producerId);
			setSellerPageId(producerId.items[0].id);
		}
	};

	const logoutHandler = () => {
		setToken(null);
	};

	const contextValue = {
		token: token,
		user: user,
		sellerPageId: sellerPageId,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
