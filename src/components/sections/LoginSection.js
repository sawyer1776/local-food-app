import { NavLink, Route } from 'react-router-dom';
import {
	useRef,
	useState,
	useContext,
	useEffect,
} from 'react';
import ButtonElement from '../UI/ButtonElement';
import classes from './LoginSection.module.css';
import PocketBase from 'pocketbase';
import AuthContext from '../storage/auth-context';

const client = new PocketBase('http://127.0.0.1:8090');

const LoginPage = (props) => {
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const confirmPasswordInputRef = useRef();

	const authCtx = useContext(AuthContext);

	let [loginOrCreateAcct, setLoginOrCreateAcct] =
		useState('Login');

	const toggleLogin = () => {
		if (loginOrCreateAcct === 'Login') {
			setLoginOrCreateAcct('Create Account');
		} else {
			setLoginOrCreateAcct('Login');
		}
	};

	const submitHandler = async (event) => {
		//REMOVE AFTER TESTING DUMMY LOGIN
		// event.preventDefault();
		console.log('Ouch');

		//Validate inputs
		//return error if inputs invalid

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		//Add Validation

		if (loginOrCreateAcct === 'Login') {
			//RETURN AFTER DUMMY LOGIN
			// const authData = await client.users.authViaEmail(
			// 	`${enteredEmail}`,
			// 	`${enteredPassword}`
			// );
			const authData = await client.users.authViaEmail(
				`blackcreekproductions@gmail.com`,
				`12345678`
			);
			const producerId = await client.records.getList(
				'producers',
				1,
				1,
				{
					filter: `owner_id = '${authData.user.id}'`,
				}
			);

			authCtx.login(authData, producerId);
		} else {
			const createProfile = await client.users.create({
				email: `${enteredEmail}`,
				password: `${enteredPassword}`,
				// passwordConfirm: `${enteredConfirmPassword}`,
			});
			console.log(createProfile);
		}
	};

	useEffect(() => {
		submitHandler();
	});

	return (
		<section className={classes.loginContainer}>
			<h2 className={classes.title}> Welcome </h2>
			<h3> {loginOrCreateAcct} </h3>
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
				{loginOrCreateAcct === 'Create Account' && (
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

			<button onClick={submitHandler}>Submit</button>

			<button> Trouble Logging in?</button>
			<button onClick={toggleLogin}>Create Account</button>
		</section>
	);
};

export default LoginPage;
