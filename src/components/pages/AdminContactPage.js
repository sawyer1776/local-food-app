import PocketBase from 'pocketbase';
import { useEffect, useState, useContext } from 'react';
import { HiOutlineMail, HiPhone } from 'react-icons/hi';
import classes from './AdminContactPage.module.css';
import { GLOBALIP } from '../globalVars';
import BackToAdmin from '../UI/BackToAdmin';
import AuthContext from '../storage/auth-context';
import { NavLink, useHistory } from 'react-router-dom';

const client = new PocketBase(`${GLOBALIP}`);
let contactData = {};

const AdminContactPage = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	const authCtx = useContext(AuthContext);
	const history = useHistory();
	console.log('ctx', authCtx);

	const updateContact = async function (
		sellerPageId,
		data
	) {
		await client
			.collection('producers')
			.update(`${sellerPageId}`, data);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		console.log('submitted');
		const email = e.currentTarget.elements.email.value;
		const phone = e.currentTarget.elements.phone.value;

		const data = {
			public_email: email,
			public_phone: phone,
		};

		updateContact(authCtx.sellerPageId, data);
		history.push({
			pathname: '/seller-admin',
		});

		//send data
	};

	useEffect(() => {
		const loadContact = async function () {
			console.log(authCtx.sellerPageId);
			const responseContact = await client
				.collection('producers')
				.getList(1, 50, {
					filter: `id = "${authCtx.sellerPageId}"`,
				});
			contactData = responseContact.items[0];
			console.log(contactData);
			console.log(contactData.public_phone);
			console.log(contactData.public_email);
			setLoaded(true);
		};
		if (isLoaded) return;
		if (!isLoaded) loadContact();
	});

	if (!isLoaded) {
		return <h1>loading...</h1>;
	}
	if (isLoaded) {
		console.log(contactData);
		return (
			<main className="container">
				<form
					className={classes.form}
					onSubmit={submitHandler}
				>
					<ul className={classes.list}>
						<li>
							<h1>Your Contact Info</h1>
						</li>
						<li>
							<BackToAdmin />
						</li>

						<li
							className={`${classes.listItem} ${classes.descriptionListItem}`}
						>
							<label className={classes.label} for="email">
								<HiOutlineMail className={classes.icon} />
							</label>
							<input
								className={`${classes.input}`}
								id="email"
								type="email"
								placeholder="me@example.com"
								defaultValue={
									contactData.public_email
										? contactData.public_email
										: null
								}
							></input>
							{/* <label className={classes.switch}>
							<input type="checkbox" />
							<span
								className={`${classes.slider} ${classes.round}`}
							></span>
						</label> */}
						</li>

						<li
							className={`${classes.listItem} ${classes.descriptionListItem}`}
						>
							<label className={classes.label} for="phone">
								<HiPhone className={classes.icon} />
							</label>
							<input
								className={classes.input}
								type="tel"
								id="phone"
								minLength="10"
								maxLength="10"
								placeholder="1234567890"
								defaultValue={
									contactData.public_phone
										? contactData.public_phone
										: null
								}
							></input>
						</li>
						<li className={classes.buttons}>
							<button className="buttonOutline">
								<NavLink to={'/seller-admin'}>
									Cancel
								</NavLink>
							</button>
							<button type="submit">Save</button>
						</li>
					</ul>
				</form>
			</main>
		);
	}
};

export default AdminContactPage;
