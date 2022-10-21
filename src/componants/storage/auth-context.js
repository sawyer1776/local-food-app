import React, { useState } from 'react';

const AuthContext = React.createContext({
	token: '',
	user: { id: '' },
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {},
});

export const AuthContextProvider = (props) => {
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);

	const userIsLoggedIn = !!token;

	const loginHandler = (token, user) => {
		setToken(token);
		setUser(user);
	};

	const logoutHandler = () => {
		setToken(null);
	};

	const contextValue = {
		token: token,
		user: user,
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
