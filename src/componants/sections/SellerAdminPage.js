import AuthContext from '../storage/auth-context';
import { useContext, useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import LoginSection from './LoginSection';

const client = new PocketBase('http://127.0.0.1:8090');
let adminData = null;

const SellerAdminPage = () => {
	const [isLoaded, setLoaded] = useState(false);
	const authCtx = useContext(AuthContext);

	useEffect(() => {
		const fetchAdminData = async function () {
			const responseAdminData =
				await client.records.getList('producers', 1, 1, {
					filter: `id = '${authCtx.sellerPageId}'`,
				});
			adminData = responseAdminData.items[0];
			console.log('response Admin Data', adminData);
			setLoaded(true);
		};
		fetchAdminData();
	});

	//This doesn't work, if not logged in it loads null data and error
	if (!authCtx.isLoggedIn) return <LoginSection />;

	if (!isLoaded) {
		return <h1>Loading</h1>;
	}

	if (isLoaded) {
		return (
			<section>
				<h1>Seller Admin Page</h1>
				<h3>
					What you call yourself {adminData.producer_name}
				</h3>
			</section>
		);
	}
};

export default SellerAdminPage;
