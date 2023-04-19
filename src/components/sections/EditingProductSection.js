import PocketBase from 'pocketbase';
import { useEffect, useState, useContext } from 'react';
import classes from './EditingProductSection.module.css';
import AuthContext from '../storage/auth-context';
import ThumbnailImg from '../UI/ThumbnailImg';
import { GLOBALIP } from '../globalVars';
import { BsTrash, BsArrowLeft } from 'react-icons/bs';

const client = new PocketBase(`${GLOBALIP}`);

let product = {};

let formData = new FormData();

const EditingProductSection = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	const [isDeleting, setDeleting] = useState(false);
	const authCtx = useContext(AuthContext);

	const deleteHandler = async function () {
		await client
			.collection('products')
			.delete(`${props.id}`);
	};
	const deleteImgHandler = async function (index) {
		console.log(
			'deleting',
			product.imgs[index],
			'from',
			product.id
		);
		await client
			.collection('products')
			.update(`${product.id}`, {
				'imgs-': [`${product.imgs[index]}`],
			});
		setLoaded(false);
	};

	const uploadHandler = function (e) {
		formData.append('imgs', e.target.files[0]);

		console.log('Form Data', Array.from(formData));
	};

	const updateProduct = async function (productId) {
		if (productId != 'new') {
			await client
				.collection('products')
				.update(`${productId}`, formData);
		}
		if (productId === 'new') {
			await client.collection('products').create(formData);
		}

		product = {};
		formData = new FormData();
		setLoaded(false);
	};

	const submitHandler = function (e) {
		e.preventDefault();

		formData.append(
			'title',
			`${e.currentTarget.elements.title.value}`
		);
		formData.append(
			'price',
			e.currentTarget.elements.price.value
		);
		formData.append(
			'unit',
			`${e.currentTarget.elements.unit.value}`
		);
		formData.append(
			'unit',
			e.currentTarget.elements.unit.value
		);
		formData.append(
			'description',
			`${e.currentTarget.elements.description.value}`
		);
		formData.append(
			'producer_id',
			`${authCtx.sellerPageId}`
		);

		updateProduct(props.id);
	};

	useEffect(() => {
		const FETCHFUNC = async function () {
			const responseProduct = await client
				.collection('products')
				.getList(1, 1, {
					filter: `id = "${props.id}"`,
				});
			product = responseProduct.items[0];
			console.log('product', product);

			setLoaded(true);
		};
		if (isLoaded) return;
		if (!isLoaded && props.id != 'new') FETCHFUNC();
		if (props.id === 'new') setLoaded(true);
	});

	if (!isLoaded) {
		return <h1>loading...</h1>;
	}
	if (isLoaded) {
		return (
			<section>
				<div className={classes.idAndDelete}>
					<h2 className={classes.id}>ID: {props.id}</h2>
					<button
						className={`${classes.deleteBtn} buttonOutline`}
						onClick={() => {
							deleteHandler();
							product = {};
							formData = new FormData();
							props.cancelFunction(null);
						}}
					>
						Delete
					</button>
				</div>
				<button
					className={classes.topBackBtn}
					onClick={() => {
						props.cancelFunction(null);
						product = {};
						formData = new FormData();
					}}
				>
					<BsArrowLeft /> Back
				</button>
				<form onSubmit={submitHandler}>
					<ul className={classes.list}>
						<li className={classes.listItem}>
							<label className={classes.label} for="title">
								Title:
							</label>

							<input
								className={classes.input}
								id="title"
								type="text"
								placeholder="Enter your title"
								defaultValue={
									product.title ? product.title : null
								}
							></input>
						</li>
						<li className={classes.listItem}>
							<label className={classes.label} for="price">
								$
							</label>
							<input
								className={`${classes.input} ${classes.price}`}
								id="price"
								type="number"
								placeholder="Price"
								defaultValue={
									product.price ? product.price : null
								}
							></input>
							<p>Per</p>
							<input
								className={`${classes.input} ${classes.unit}`}
								id="unit"
								type="text"
								placeholder="e.g. Dozen"
								defaultValue={
									product.unit ? product.unit : null
								}
							></input>
						</li>
						<li
							className={`${classes.listItem} ${classes.descriptionListItem}`}
						>
							<div className={classes.imgsContainer}>
								{product.imgs
									? product.imgs.map((img, index) => (
											<div
												className={`${
													classes.imgContainer
												} ${
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
													collectionId={
														product.collectionId
													}
													productId={product.id}
													key={index}
												/>
												<div
													onClick={() => {
														console.log('delete', index);
														deleteImgHandler(index);
													}}
													className={`${classes.trashContainer}`}
												>
													<BsTrash
														className={classes.trash}
													/>
												</div>
											</div>
									  ))
									: ''}
							</div>
							{isDeleting ? (
								<div>
									<button
										onClick={() => {
											setDeleting(false);
										}}
									>
										Done
									</button>
								</div>
							) : (
								''
							)}
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
							<button type="submit">Upload</button>
						</li>

						<li className={classes.listItem}>
							<label className={classes.label} for="qty">
								Quantity Available:
							</label>
							<input
								className={`${classes.input} ${classes.price}`}
								id="qty"
								type="number"
								placeholder="e.g. 5"
								defaultValue={
									product.qty ? product.qty : null
								}
							></input>
						</li>
						<li
							className={`${classes.listItem} ${classes.descriptionListItem}`}
						>
							<label
								className={classes.label}
								for="description"
							>
								Description:
							</label>
							<textarea
								className={`${classes.input} ${classes.description}`}
								id="description"
								placeholder="Tell everyone about your product and how it is made or grown."
								defaultValue={
									product.description
										? product.description
										: null
								}
							></textarea>
						</li>
					</ul>

					<div className={classes.buttons}>
						<button
							className="buttonOutline"
							onClick={() => {
								props.cancelFunction(null);
								product = {};
								formData = new FormData();
							}}
						>
							<BsArrowLeft /> Back
						</button>
						<button type="submit">Save</button>
					</div>
				</form>
			</section>
		);
	}
};

export default EditingProductSection;
