import { HiHome } from 'react-icons/hi';
import { Link, NavLink } from 'react-router-dom';

const CheckoutPage = (props) => {
	const linkToVenmo = () => {
		let link = `https://venmo.com/?txn=charge&audience=private&recipients=GibsonsGardens&amount=1&note=test`;
	};

	return (
		<main className="container">
			<h1>This is an example page</h1>
			<p>
				You will not be Charged. Thank you for visiting,
				this has been built by Clay Gibson as a portfolio
				project. To see more visit{' '}
				<a href="https://clay-gibson-dev.com/">
					https://clay-gibson-dev.com/
				</a>
			</p>
			<p>
				Since this application is currently not live with
				real buyers and sellers I have disabled the actual
				checkout. It will intigrate with Venmo for easy
				secure payments.
			</p>

			<NavLink to="./all-sellers">
				<button>
					<HiHome />
				</button>
			</NavLink>

			{/* <p>
				If you want to see how this intigrates with Venmo.
				<strong>DO NOT ACTUALLY PAY</strong>
			</p>

			//If you want to support this project feel free to buy me some chicken feed by sending a payment to the below user on Venmo

			<NavLink
				to={`https://venmo.com/?txn=charge&audience=private&recipients=GibsonsGardens&amount=${props.total}&note=${props.orderId}`}
			>
				<button onClick={linkToVenmo}>
					Pay With Venmo
				</button>
			</NavLink> */}
		</main>
	);
};
export default CheckoutPage;
