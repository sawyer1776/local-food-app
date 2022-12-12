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

const client = new PocketBase('http://127.0.0.1:8090');

let userData = {};

const ProfilePage = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	const [ShowOrders, setShowOrders] = useState(false);
	const authCtx = useContext(AuthContext);
	console.log('ctx', authCtx);
	// useEffect(() => {
	// 	const fetchUser = async function () {
	// 		const responseUser = await client.records.getList(
	// 			'producers',
	// 			1,
	// 			100,
	// 			{}
	// 		);
	// 		userData = responseUser.items;

	// 		console.log(userData); //need name and account id

	// 		setLoaded(true);
	// 	};
	// 	if (isLoaded) return;
	// 	if (!isLoaded) fetchUser();
	// });
	if (!authCtx.isLoggedIn) return <LoginSection />;

	// if (!isLoaded) {
	// 	return <h1>loading...</h1>;
	// }
	if (1 < 2) {
		return (
			<main className={classes.profileContainer}>
				<h2>Your Profile </h2>
				<p>Welcome {authCtx.user.profile.name}</p>
				<div className={classes.btns}>
					<button
						className={classes.button}
						onClick={() => {
							toggleState(setShowOrders, ShowOrders);
						}}
					>
						Orders
					</button>
					{ShowOrders ? (
						<OrderSection
							orders={authCtx.user.profile.orders}
						/>
					) : (
						''
					)}
					{authCtx.sellerPageId ? (
						<Link to={`/seller-admin`}>
							<button className={classes.button}>
								Seller Admin
							</button>
						</Link>
					) : (
						<button className={classes.button}>
							Become a Seller
						</button>
					)}

					<button className={classes.resetPassword}>
						Reset Password
					</button>
				</div>
			</main>
		);
	}
};

export default ProfilePage;

// const ProfilePage = (props) => {
// 	//This doesn't work, if not logged in it loads null data and error
// 	if (!authCtx.isLoggedIn) return <LoginSection />;
// 	return (
// 		<main className={classes.profileContainer}>
// 			<h2>Your Profile </h2>
// 			<p>Welcome Clay</p>
// 			<div className={classes.btns}>
// 				<button className={classes.button}>Orders</button>
// 				<button className={classes.button}>
// 					Become a Seller
// 				</button>
// 				<button className={classes.resetPassword}>
// 					Reset Password
// 				</button>
// 			</div>
// 		</main>
// 	);
// };

// export default ProfilePage;
