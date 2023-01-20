import { HiHome } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

const CheckoutPage = (props) => {
	return (
		<div className="container">
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
				Although the checkout does not currently function I
				am working to make this a functional application.
				One day you will be able to find the local producers
				of quality meats and vegitables in your area, so
				check back in the future.
			</p>

			<NavLink to="./all-sellers">
				<button>
					<HiHome />
				</button>
			</NavLink>
		</div>
	);
};
export default CheckoutPage;
