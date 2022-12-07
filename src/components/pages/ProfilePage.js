import classes from './ProfilePage.module.css';

const ProfilePage = (props) => {
	return (
		<main className={classes.profileContainer}>
			<h2>Your Profile </h2>
			<p>Welcome Clay</p>
			<button className={classes.button}>Orders</button>
			<button className={classes.button}>
				Become a Seller
			</button>
			<button className={classes.resetPassword}>
				Reset Password
			</button>
		</main>
	);
};

export default ProfilePage;
