import LoginSection from './LoginSection';
import AuthContext from '../storage/auth-context';
import { useContext, useState } from 'react';
import PocketBase from 'pocketbase';
import { NavLink } from 'react-router-dom';

const client = new PocketBase('http://127.0.0.1:8090');

const NewSeller = () => {
	const authCtx = useContext(AuthContext);
	console.table(authCtx);

	const [producerName, setProducerName] = useState('');
	const [ownerId, setOwnerId] = useState('');

	const data = {
		producer_name: producerName,
		owner_id: ownerId,
	};

	const submitHandler = async function () {
		setOwnerId(authCtx.user.id);

		await client.records.create('producers', data);
		const responseProducerRecord =
			await client.records.getList('producers', 1, 1, {
				filter: `owner_id = '${authCtx.user.id}'`,
			});

		console.log(responseProducerRecord.items);
	};

	if (!authCtx.isLoggedIn) return <LoginSection />;

	if (authCtx.isLoggedIn)
		return (
			<section>
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
			</section>
		);
};

export default NewSeller;
