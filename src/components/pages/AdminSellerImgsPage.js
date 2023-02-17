import PocketBase from 'pocketbase';
import { useEffect, useState, useContext } from 'react';
import classes from './AdminSellerImgsPage.module.css';
import AuthContext from '../storage/auth-context';
import { useHistory } from 'react-router-dom';
import { GLOBALIP } from '../globalVars';

const client = new PocketBase(`${GLOBALIP}`);

let imgs = {};

let formData = new FormData();
const AdminSellerImgsPage = (props) => {
	const authCtx = useContext(AuthContext);
	const history = useHistory();

	const submitHandler = (e) => {
		console.log('submit');
		e.preventDefault();
		updateImgs(authCtx.sellerPageId);
	};

	const updateImgs = async () => {
		await client
			.collection('producers')
			.update(`${authCtx.sellerPageId}`, formData);
		console.log('uptdated imgs');
		history.push({
			pathname: '/seller-admin',
		});
	};

	const uploadHandler = (e) => {
		formData.append('imgs', e.target.files[0]);

		console.log('Form Data', Array.from(formData));
		console.log('upload');
	};

	const deleteHandler = () => {
		console.log('delete');
	};

	return (
		<main className="container">
			<div className={classes.idAndDelete}>
				{/* <h2 className={classes.id}>ID: {props.id}</h2> */}
				<button
					className={`${classes.deleteBtn} buttonOutline`}
					onClick={() => {
						deleteHandler();
						imgs = {};
						formData = new FormData();
						// props.cancelFunction(null);
					}}
				>
					Delete
				</button>
			</div>
			<form onSubmit={submitHandler}>
				<ul className={classes.list}>
					<li
						className={`${classes.listItem} ${classes.descriptionListItem}`}
					>
						<label
							className={classes.label}
							for="fileInput"
						>
							Upload new image
						</label>
						<input
							className={`${classes.input} ${classes.file}`}
							id="fileInput"
							type="file"
							onChange={(e) => {
								uploadHandler(e);
							}}
						></input>
					</li>
				</ul>

				<div className={classes.buttons}>
					<button
						className="buttonOutline"
						onClick={() => {
							imgs = {};
							formData = new FormData();
							history.push({ pathname: '/seller-admin' });
						}}
					>
						Cancel
					</button>
					<button type="submit">Save</button>
				</div>
			</form>
		</main>
	);
};

export default AdminSellerImgsPage;
