import PocketBase from 'pocketbase';
import { useEffect, useState, useContext } from 'react';
import classes from './AdminSellerImgsPage.module.css';
import AuthContext from '../storage/auth-context';
import { useHistory } from 'react-router-dom';
import { GLOBALIP } from '../globalVars';
import LoadingSpinner from '../UI/LoadingSpinner';
import ThumbnailImg from '../UI/ThumbnailImg';
import { BsTrash, BsPencil } from 'react-icons/bs';

const client = new PocketBase(`${GLOBALIP}`);

let imgs = {};
let oldImgs = {};
let formData = new FormData();

const AdminSellerImgsPage = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	const [isDeleting, setDeleting] = useState(false);
	const authCtx = useContext(AuthContext);
	const history = useHistory();

	const submitHandler = (e) => {
		e.preventDefault();
		updateImgs(authCtx.sellerPageId);
	};

	const updateImgs = async () => {
		await client
			.collection('producers')
			.update(`${authCtx.sellerPageId}`, formData);
		console.log('uptdated imgs');
		setDeleting(false);
		setLoaded(false);
	};

	const uploadHandler = (e) => {
		formData.append('imgs', e.target.files[0]);

		console.log('Form Data', Array.from(formData));
		console.log('upload');
	};

	const deleteHandler = async function (index) {
		console.log('deleting', oldImgs[index]);
		await client
			.collection('producers')
			.update(`${authCtx.sellerPageId}`, {
				'imgs-': [`${oldImgs[index]}`],
			});
		setLoaded(false);
	};

	useEffect(() => {
		const fetchImgs = async function () {
			const responseOldImgs = await client
				.collection('producers')
				.getList(1, 1, {
					filter: `id = "${authCtx.sellerPageId}"`,
				});
			oldImgs = responseOldImgs.items[0].imgs;
			console.log('old imgs', oldImgs);
			setLoaded(true);
		};
		if (isLoaded) return;
		if (!isLoaded) fetchImgs();
	});

	if (!isLoaded) {
		return <LoadingSpinner />;
	}

	if (isLoaded) {
		return (
			<main className="container">
				<form onSubmit={submitHandler}>
					<ul className={classes.list}>
						<li>
							<div className={classes.imgsContainer}>
								{oldImgs.map((img, index) => (
									<div
										className={`${classes.imgContainer} ${
											isDeleting
												? classes.show
												: classes.hidden
										}`}
										onClick={() => {
											setDeleting(true);
										}}
									>
										<ThumbnailImg
											img={img}
											collectionId={'5akj8mva7bqg8s9'}
											productId={authCtx.sellerPageId}
											key={index}
										/>

										<div
											onClick={() => {
												deleteHandler(index);
											}}
											className={`${classes.trashContainer}`}
										>
											<BsTrash className={classes.trash} />
										</div>
									</div>
								))}
							</div>
						</li>
						{isDeleting ? (
							<li>
								<button
									onClick={() => {
										setDeleting(false);
									}}
								>
									Done
								</button>
							</li>
						) : (
							''
						)}
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
						<button type="submit">Upload</button>
					</div>
					<button
						onClick={() => {
							history.push({
								pathname: '/seller-admin',
							});
						}}
					>
						Return to Admin
					</button>
				</form>
			</main>
		);
	}
};

export default AdminSellerImgsPage;
