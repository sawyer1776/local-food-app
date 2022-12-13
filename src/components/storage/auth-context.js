import React, { useState } from 'react';
import PocketBase from 'pocketbase';
import { BsJustifyLeft } from 'react-icons/bs';

const client = new PocketBase('http://127.0.0.1:8090');

let userCart = [
	{ id: 'x1e7z6qjcjjg4hs', qty: 2 },
	{ id: 'a9mocdst87l86rv', qty: 3 },
	{ id: 'c2eloyp1mpbfxem', qty: 1 },
];

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
		setToken(authData.token);
		setUser(authData.user);
		if (producerId.items.length > 0) {
			setSellerPageId(producerId.items[0].id);
		}
	};

	const logoutHandler = () => {
		setToken(null);
	};
	// THIS IS THE ONE TO USE, DISABLED FOR TESTING
	const contextValue = {
		token: token,
		user: user,
		sellerPageId: sellerPageId,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};
	// const contextValue = {
	// 	token:
	// 		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2N…XIifQ.VmkfwAMj6hBVLTBoXzO8f9RN-iFMZj8MFGrUtUamxDs',
	// 	user: { id: 'zighdqt8mozdiw6' },
	// 	sellerPageId: 'zighdqt8mozdiw6',
	// 	isLoggedIn: true,
	// 	login: loginHandler,
	// 	logout: logoutHandler,
	//};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
