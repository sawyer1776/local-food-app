import LoginSection from '../sections/LoginSection';
import AuthContext from '../storage/auth-context';
import { useContext, useState } from 'react';
import PocketBase from 'pocketbase';
import { NavLink, Redirect } from 'react-router-dom';

const client = new PocketBase('http://127.0.0.1:8090');

const NewSeller = () => {
	const authCtx = useContext(AuthContext);

	const [producerName, setProducerName] = useState('');

	const submitHandler = async function () {
		//Add guard clause
		await client.records.create('producers', {
			producer_name: producerName,
			owner_id: authCtx.user.id,
		});
	};

	if (!authCtx.isLoggedIn) return <LoginSection />;

	if (authCtx.isLoggedIn)
		return (
			<main className="container">
				{authCtx.sellerPageId ? (
					<Redirect
						to={`/seller-admin/${authCtx.user.id}`}
					/>
				) : (
					''
				)}
				<h1>
					Welcome{' '}
					{authCtx.user.profile.name &&
						authCtx.user.profile.name}
				</h1>

				<div>
					<label>
						What would you like to call your farm or garden?
					</label>
					<input
						type="text"
						onChange={(event) => {
							setProducerName(event.target.value);
						}}
					/>

					<NavLink to={`/seller-admin/${authCtx.user.id}`}>
						<button onClick={submitHandler}>
							Create A New Page
						</button>
					</NavLink>
				</div>
			</main>
		);
};

export default NewSeller;
