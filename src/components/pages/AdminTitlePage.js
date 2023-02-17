import PocketBase from 'pocketbase';
import { useEffect, useState, useContext } from 'react';
import { HiOutlineMail, HiPhone } from 'react-icons/hi';
import classes from './AdminContactPage.module.css';
import { GLOBALIP } from '../globalVars';
import BackToAdmin from '../UI/BackToAdmin';
import AuthContext from '../storage/auth-context';
import { NavLink, useHistory } from 'react-router-dom';

const client = new PocketBase(`${GLOBALIP}`);
let TitleData = {};

const AdminTitlePage = (props) => {
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
		const title = e.currentTarget.elements.title.value;
		const subtitle =
			e.currentTarget.elements.subtitle.value;

		// format phone vs 2
		// let phoneFormatted = `(${phone.slice(
		// 	0,
		// 	3
		// )}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;

		const data = {
			producer_name: title,
			tagline: subtitle,
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
			const responseSeller = await client
				.collection('producers')
				.getList(1, 50, {
					filter: `id = "${authCtx.sellerPageId}"`,
				});
			TitleData = responseSeller.items[0];
			console.log(TitleData);

			setLoaded(true);
		};
		if (isLoaded) return;
		if (!isLoaded) loadContact();
	});

	if (!isLoaded) {
		return <h1>loading...</h1>;
	}
	if (isLoaded) {
		return (
			<main className="container">
				<form
					className={classes.form}
					onSubmit={submitHandler}
				>
					<ul className={classes.list}>
						<li>
							<h1>Your Store's Title</h1>
						</li>
						<li>
							<BackToAdmin />
						</li>

						<li
							className={`${classes.listItem} ${classes.descriptionListItem}`}
						>
							<label className={classes.label} for="title">
								Title
							</label>
							<input
								className={`${classes.input}`}
								id="title"
								type="text"
								placeholder="e.g. Sonny Hill Farms"
								defaultValue={
									TitleData.producer_name
										? TitleData.producer_name
										: null
								}
							></input>
						</li>

						<li
							className={`${classes.listItem} ${classes.descriptionListItem}`}
						>
							<label
								className={classes.label}
								for="subtitle"
							>
								Subtitle
							</label>
							<input
								className={classes.input}
								type="text"
								id="subtitle"
								placeholder="e.g. A family farm"
								defaultValue={
									TitleData.tagline
										? TitleData.tagline
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

export default AdminTitlePage;
