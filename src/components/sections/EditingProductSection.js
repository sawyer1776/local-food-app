import PocketBase from 'pocketbase';
import { useEffect, useState, useContext } from 'react';
import classes from './EditingProductSection.module.css';
import AuthContext from '../storage/auth-context';
import GLOBALIP from '../globalVars';

const client = new PocketBase(`${GLOBALIP}`);

let product = {};

let formData = new FormData();

const EditingProductSection = (props) => {
	const [isLoaded, setLoaded] = useState(false);
	const authCtx = useContext(AuthContext);

	const deleteHandler = async function () {
		await client
			.collection('products')
			.delete(`${props.id}`);
	};

	const uploadHandler = function (e) {
		console.log('file Input', e.target.files[0]);
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
		props.cancelFunction(null);
	};

	const submitHandler = function (e) {
		e.preventDefault();
		// 		data = {
		// 	title: `${e.currentTarget.elements.title.value}`,
		// 	price: e.currentTarget.elements.price.value,
		// 	unit: `${e.currentTarget.elements.unit.value}`,
		// 	qty: e.currentTarget.elements.qty.value,
		// 	description: `${e.currentTarget.elements.description.value}`,
		// 	// producer_id: 'k9rfk6p2epvhe6c',
		// };

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

			// data = {
			// 	title: `${product.title}`,
			// 	price: product.price,
			// 	unit: `${product.unit}`,
			// 	qty: product.qty,
			// 	description: `${product.description}`,
			// 	// producer_id: 'k9rfk6p2epvhe6c',
			// };

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
							Cancel
						</button>
						<button type="submit">Save</button>
					</div>
				</form>
			</section>
		);
	}
};

export default EditingProductSection;
