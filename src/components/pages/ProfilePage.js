import classes from './ProfilePage.module.css';
import AuthContext from '../storage/auth-context';
import { useContext, useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import LoginSection from '../sections/LoginSection';
import ProductAdminItem from '../UI/ProductAdminItem';
import InputsSection from '../sections/InputsSection';
import LoadingSpinner from '../UI/LoadingSpinner';
import { toggleState } from '../storage/helper-functions';
import OrderSection from '../sections/OrdersSection';
import { Link } from 'react-router-dom';
import { GLOBALIP } from '../globalVars';

const client = new PocketBase(`${GLOBALIP}`);

let orderData = {};

const ProfilePage = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	const [ShowOrders, setShowOrders] = useState(false);
	const [becomingASeller, setBecomingASeller] =
		useState(false);
	const authCtx = useContext(AuthContext);
	console.log('ctx', authCtx);

	const submitHandler = (e) => {
		e.preventDefault();
		console.log('submitting');
		const producerName =
			e.currentTarget.elements.name.value;
		console.log(producerName);

		const data = {
			owner_id: authCtx.user.id,
			about_description: JSON.stringify([
				{
					title: 'Enter your title',
					paragraph:
						'Tell everyone about what you do and why you do it. Let them feel connected and help them understand how you grow and raise your food.',
				},
			]),
			producer_name: producerName,
		};

		const createProducer = async function () {
			await client.collection('producers').create(data);

			const producerId = await client
				.collection('producers')
				.getList(1, 1, {
					filter: `owner_id = '${authCtx.user.id}'`,
				});
			let authData = {
				token: authCtx.token,
				record: authCtx.user,
			};

			authCtx.login(authData, producerId);
			console.log('authCtx ', authCtx);
		};
		createProducer();
		setBecomingASeller(false);
	};

	useEffect(() => {
		console.log('fetching orders');
		const fetchOrders = async function () {
			console.log('authCtx.user.id', authCtx.user.id);
			const responseOrders = await client
				.collection('orders')
				.getList(1, 50, {
					filter: `buyer_id = "${authCtx.user.id}"`,
					sort: `-created `,
				});

			orderData = responseOrders.items;
			setLoaded(true);
		};
		if (isLoaded) return;
		if (!isLoaded) fetchOrders();
	});
	if (!authCtx.isLoggedIn) return <LoginSection />;

	return (
		<main className="container">
			<h2>Your Profile </h2>
			<p>Welcome {authCtx.user.name}</p>
			<div className={classes.btns}>
				{ShowOrders ? (
					isLoaded ? (
						<OrderSection orders={orderData} />
					) : (
						<LoadingSpinner />
					)
				) : (
					''
				)}
				{becomingASeller ? (
					<>
						<h3>Welcome! We are glad to have you!</h3>
						<form
							className={classes.form}
							onSubmit={submitHandler}
						>
							<label className={classes.label} for="name">
								<p className={classes.paragraph}>
									What would you like your page to be
									called?
								</p>
							</label>
							<input
								className={classes.input}
								type="text"
								id="name"
								maxLength="200"
								placeholder="eg. Jordan's Garden or Hillside Farm"
							></input>
							<button
								className={classes.submitBtn}
								type="submit"
							>
								Save
							</button>
						</form>
					</>
				) : (
					''
				)}
				{authCtx.sellerPageId ? (
					<>
						<Link className="wide" to={`/seller-admin`}>
							<button className="buttonOutline">
								Seller Admin
							</button>
						</Link>
						<Link
							className="wide"
							to={`/seller-admin/orders`}
						>
							<button className="buttonOutline">
								Orders You Sold
							</button>
						</Link>
					</>
				) : (
					<button
						className="buttonOutline"
						onClick={() => {
							toggleState(
								setBecomingASeller,
								becomingASeller
							);
						}}
					>
						{!becomingASeller
							? 'Become a Seller'
							: 'Cancel'}
					</button>
				)}

				<button
					className="buttonOutline"
					onClick={() => {
						toggleState(setShowOrders, ShowOrders);
					}}
				>
					Orders You Bought
				</button>

				<button
					className={classes.resetPassword}
					onClick={() => {
						authCtx.logout();
					}}
				>
					Log Out
				</button>
				<button className={classes.resetPassword}>
					Reset Password
				</button>
			</div>
		</main>
	);
};

export default ProfilePage;
