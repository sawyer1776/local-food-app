import classes from './InputsSection.module.css';
import React, { useState, useContext } from 'react';
import PocketBase from 'pocketbase';
import AuthContext from '../storage/auth-context';
//HAS TO BE HERE, function passed in calls it
import { toggleState } from '../storage/helper-functions';
import GLOBALIP from '../globalVars';

const client = new PocketBase(`${GLOBALIP}`);

const InputsPage = (props) => {
	const authCtx = useContext(AuthContext);
	const [title, setTitle] = useState('');
	const [titleIsValid, setTitleIsValid] = useState(true);
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
		await client.records.create('products', data);
	};

	const submitHandler = function () {
		if (title.trim().length <= 0) {
			setTitleIsValid(false);
			return;
		} else {
			record();
			props.addingProductFunc();
		}
	};

	return (
		<div>
			<div className={classes.allInputs}>
				<label>Product Title:</label>
				<input
					className={classes.invalid}
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

			<button onClick={submitHandler}>Submit</button>
		</div>
	);
};

export default InputsPage;
