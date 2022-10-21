import classes from './InputsPage.module.css';
import React, { useState } from 'react';
import PocketBase from 'pocketbase';
import ProductDetails from './ProductDetails';
import ProductPage from './ProductPage';
import IfProductSnapshot from './IfProductSnapshot';
import ProductSnapshot from './ProductSnapshot';

const client = new PocketBase('http://127.0.0.1:8090');

const Inputs = (props) => {
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState(0);
	const [unit, setUnit] = useState('');
	const [qty, setQty] = useState(0);
	const [stars, setStars] = useState(0);
	const [description, setDescription] = useState('');
	const [details, setDetails] = useState('');
	const [files, setFile] = useState('');
	const data = {
		title: title,
		price: price,
		unit: unit,
		qty: qty,
		stars: stars,
		description: description,
		details: details,
	};

	const record = async function () {
		await client.records.create('products', data);
	};

	const [productData, setProductData] = useState([]);

	const fetchHandler = async function () {
		const response = await client.records.getFullList(
			'products',
			5 /* batch size */,
			{
				sort: '-created',
			}
		);
		setProductData(response);
		console.log(response);
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
				<label>Stars:</label>
				<input
					type="number"
					onChange={(event) => {
						setStars(event.target.value);
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

			<button onClick={record}>Submit</button>
			<button onClick={fetchHandler}>View</button>
		</div>
	);
};

export default Inputs;
