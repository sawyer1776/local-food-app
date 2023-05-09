import { NavLink, Route } from 'react-router-dom';
import {
	useRef,
	useState,
	useContext,
	useEffect,
} from 'react';
import classes from './LoginSection.module.css';
import AuthContext from '../storage/auth-context';
import PocketBase from 'pocketbase';
import { GLOBALIP } from '../globalVars';
import { FaCarrot } from 'react-icons/fa';
import LoadingSpinner from '../UI/LoadingSpinner';

const client = new PocketBase(`${GLOBALIP}`);

const LoginPage = (props) => {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const confirmPasswordInputRef = useRef();
	const [isLoaded, setLoaded] = useState(true);

	const authCtx = useContext(AuthContext);

	let [loginOrCreateAcct, setLoginOrCreateAcct] =
		useState('Login');

	const toggleLogin = () => {
		if (loginOrCreateAcct === 'Login') {
			setLoginOrCreateAcct('create an account');
		} else {
			setLoginOrCreateAcct('Login');
		}
	};

	const login = async function (email, password) {
		setLoaded(false);
		const authData = await client
			.collection('users')
			.authWithPassword(`${email}`, `${password}`);
		console.log('authData', authData);

		const producerId = await client
			.collection('producers')
			.getList(1, 1, {
				filter: `owner_id = '${authData.record.id}'`,
			});

		authCtx.login(authData, producerId);
		setLoaded(true);
	};

	const createProfile = async function (
		emailIn,
		passwordIn
	) {
		setLoaded(false);
		const createProfile = await client
			.collection('users')
			.create({
				email: `${emailIn}`,
				password: `${passwordIn}`,
				passwordConfirm: `${confirmPasswordInputRef.current.value}`,
				cart: JSON.stringify({
					items: [],
				}),
			});
		console.log('createProfile', createProfile);
		await login(emailIn, passwordIn);
		setLoaded(true);
	};

	const submitHandler = async (event) => {
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		if (loginOrCreateAcct === 'Login') {
			login(enteredEmail, enteredPassword);
		} else {
			createProfile(enteredEmail, enteredPassword);
		}
	};

	// useEffect(() => {
	// 	submitHandler();
	// });

	return (
		<section
			className={`container ${classes.loginContainer}`}
		>
			<FaCarrot className={classes.carrot} />

			<p className={classes.welcome}>
				Welcome, please {loginOrCreateAcct}{' '}
			</p>
			{isLoaded ? (
				<form>
					<label>Email:</label>
					<input
						className={classes.input}
						type="email"
						id="email"
						required
						ref={emailInputRef}
					></input>
					<label>Password:</label>
					<input
						className={classes.input}
						type="password"
						id="password"
						required
						ref={passwordInputRef}
					></input>
					{loginOrCreateAcct === 'create an account' && (
						<>
							<label>Confirm Password:</label>
							<input
								className={classes.input}
								type="password"
								id="confirm-password"
								required
								ref={confirmPasswordInputRef}
							></input>
						</>
					)}
				</form>
			) : (
				<LoadingSpinner />
			)}

			<button onClick={submitHandler}>Sign In</button>
			<p className={classes.endTitle}>
				{loginOrCreateAcct === 'Login'
					? 'New to the site? '
					: 'Already have an account? '}

				<a
					className={classes.createAccount}
					onClick={toggleLogin}
				>
					{loginOrCreateAcct === 'Login'
						? 'create account'
						: 'login'}
				</a>
			</p>
		</section>
	);
};

export default LoginPage;
