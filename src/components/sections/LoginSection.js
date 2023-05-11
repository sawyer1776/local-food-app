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
import logo from '../../imgs/logo.png';
import { resetPassword } from '../globalVars';

const client = new PocketBase(`${GLOBALIP}`);

const LoginPage = (props) => {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const confirmPasswordInputRef = useRef();
	const [isLoaded, setLoaded] = useState(true);
	const [error, setError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [pwError, setPwError] = useState(false);
	const [forgot, setForgot] = useState(false);

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
		try {
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
		} catch (err) {
			console.log('err', err);
			setError(true);
		}
		setLoaded(true);
	};

	const createProfile = async function (
		emailIn,
		passwordIn
	) {
		setLoaded(false);
		try {
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
		} catch (err) {
			console.log('err', err);
			setError(true);
		}
		setLoaded(true);
	};

	const checkForDuplicate = async function (emailIn) {
		const duplicate = await client
			.collection('users')
			.getOne({
				filter: `email~"${emailIn}" `,
			});

		console.log('duplicate', duplicate);
	};

	const submitHandler = async (event) => {
		const enteredEmail = emailInputRef.current.value
			? emailInputRef.current.value
			: null;
		if (forgot) {
			setLoaded(false);
			resetPassword(enteredEmail);
			setForgot(false);
			setLoginOrCreateAcct('Login');
			setLoaded(true);

			return;
		}

		const enteredPassword = passwordInputRef.current.value
			? passwordInputRef.current.value
			: null;
		if (loginOrCreateAcct === 'Login' && !forgot) {
			login(enteredEmail, enteredPassword);
		}
		if (
			loginOrCreateAcct === 'create an account' &&
			!forgot
		) {
			setEmailError(false);
			setPwError(false);

			if (
				enteredPassword.length === 0 ||
				enteredEmail.length === 0
			) {
				console.log('password or email is blank');
				setEmailError('password or email is blank');
				return;
			}
			if (enteredPassword.length < 10) {
				console.log('password is too short');
				setPwError(
					'password must be at least 10 characters'
				);
				return;
			}
			if (!enteredEmail.includes('@')) {
				console.log('email is invalid');
				setEmailError('email is invalid');
				return;
			}
			if (!enteredPassword.match(/[0-9]/g)) {
				setPwError('password does not contain a number');
				return;
			}
			if (
				enteredPassword !==
				confirmPasswordInputRef.current.value
			) {
				console.log('passwords do not match');
				setPwError('passwords do not match');
				return;
			}
			// checkForDuplicate(enteredEmail);

			console.log('enteredEmail', enteredEmail.length);
			createProfile(enteredEmail, enteredPassword);
		}
	};
	const keyHandler = (event) => {
		if (event.key === 'Enter') {
			submitHandler();
		}
	};

	//q: listen for enter key?
	//a: https://stackoverflow.com/questions/5597060/detecting-enter-keypress-on-a-input-type-text-field
	return (
		<section
			className={`container ${classes.loginContainer}`}
		>
			<img src={logo} className={classes.logo} />

			<p className={classes.welcome}>
				{forgot
					? 'Enter your email to reset your password'
					: `Welcome, please ${loginOrCreateAcct} `}
			</p>
			{forgot ? (
				<a
					onClick={() => {
						setForgot(false);
						setError(false);
					}}
				>
					{' '}
					Back to login
				</a>
			) : (
				''
			)}

			{isLoaded ? (
				<form onKeyDown={keyHandler}>
					{error ? (
						<p className={classes.error}>
							Invalid email and password combination. Please
							try again.
						</p>
					) : (
						''
					)}
					<label>
						Email:{' '}
						<span className={classes.inlineError}>
							{emailError ? emailError : ''}
						</span>
					</label>

					<input
						className={classes.input}
						type="email"
						id="email"
						required
						ref={emailInputRef}
					></input>
					{!forgot ? (
						<>
							<label>
								Password:{' '}
								<span className={classes.inlineError}>
									{pwError ? pwError : ''}
								</span>
							</label>

							<input
								className={classes.input}
								type="password"
								id="password"
								required
								ref={passwordInputRef}
							></input>
							{loginOrCreateAcct === 'Login' ? (
								<a
									onClick={() => {
										setForgot(true);
									}}
									className={classes.forgotPassword}
								>
									Forgot Password?
								</a>
							) : null}
						</>
					) : null}
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

			<button onClick={submitHandler}>Submit</button>
			<p className={classes.endTitle}>
				{loginOrCreateAcct === 'Login'
					? 'New to the site? '
					: 'Already have an account? '}

				<a
					className={classes.createAccount}
					onClick={() => {
						toggleLogin();
						setForgot(false);
						setError(false);
					}}
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
