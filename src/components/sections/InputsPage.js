import classes from './InputsPage.module.css';
import React, { useState, useContext } from 'react';
import PocketBase from 'pocketbase';
import ProductDetails from './ProductDetails';
import ProductPage from './ProductPage';
import IfProductSnapshot from './IfProductSnapshot';
import ProductSnapshot from './ProductSnapshot';
import AuthContext from '../storage/auth-context';

const client = new PocketBase('http://127.0.0.1:8090');

const InputsPage = (props) => {
	const authCtx = useContext(AuthContext);
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState(0);
	const [unit, setUnit] = useState('');
	const [qty, setQty] = useState(0);
	const [description, setDescription] = useState('');
	const [details, setDetails] = useState('');
	const [files, setFile] = useState('');
	const data = {
		title: title,
		price: price,
		unit: unit,
		qty: qty,
		description: description,
		details: details,
		producer_id: authCtx.sellerPageId,
	};

	const record = async function () {
		console.log('Submitting');
		console.log(data);
		await client.records.create('products', data);
	};

	return (
		<div>
			<div className={classes.allInputs}>
				<label>Product Title:</label>
				<input
					type="text"
					onChange={(event) => {
						setTitle(event.target.value);
					}}
				/>
				<label>Price:</label>
				<input
					type="number"
					onChange={(event) => {
						setPrice(event.target.value);
					}}
				/>
				<label>Unit:</label>
				<input
					type="text"
					onChange={(event) => {
						setUnit(event.target.value);
					}}
				/>
				<label>Qty Available:</label>
				<input
					type="number"
					onChange={(event) => {
						setQty(event.target.value);
					}}
				/>

				<label>Description:</label>
				<input
					type="text"
					onChange={(event) => {
						setDescription(event.target.value);
					}}
				/>
				<label>Details:</label>
				<input
					type="text"
					onChange={(event) => {
						setDetails(event.target.value);
					}}
				/>
				<label>Image</label>
				<input
					type="file"
					onChange={(event) => setFile(event.target.value)}
				/>
			</div>

			<button
				onClick={() => {
					record();
					props.addingProductFunc();
				}}
			>
				Submit
			</button>
		</div>
	);
};

export default InputsPage;
