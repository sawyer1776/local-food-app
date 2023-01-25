import AuthContext from '../storage/auth-context';
import { useContext, useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import LoginSection from '../sections/LoginSection';
import ProductAdminItem from '../UI/ProductAdminItem';
import InputsSection from '../sections/InputsSection';
import LoadingSpinner from '../UI/LoadingSpinner';
import { toggleState } from '../storage/helper-functions';
import classes from './SellerAdminPage.module.css';
import { BsPencil } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ImgDragSlider from '../UI/ImgDragSlider';
import ImgAdminItem from '../UI/ImgAdminItem';
import GLOBALIP from '../globalVars';
import PickupAdminItem from '../UI/PickupAdminItem';

const client = new PocketBase(`${GLOBALIP}`);
let adminData = null;
let productList = [];
let pickupMeetups = [];

const abandonedSellerAdminPage = () => {
	const [isLoaded, setLoaded] = useState(false);
	const [addingAProduct, setAddingAProduct] =
		useState(false);

	const [expand, setExpand] = useState();

	const [description, setDescription] = useState(
		'Enter what you want people to know about you and how you grow food.'
	);
	const [tagline, setTagline] = useState(
		'Enter your tagline here.'
	);

	const [hideAddress, setHideAddress] = useState(false);
	const authCtx = useContext(AuthContext);

	const fetchListedProducersProducts = async function () {
		//CREATE EXCEPTION FOR LOADING MANY PRODUCTS
		const responseProducts = await client
			.collection('products')
			.getList(1, 100, {
				filter: `producer_id = '${authCtx.sellerPageId}'`,
			});
		productList = responseProducts.items;
	};
	const fetchListedProducersMeetups = async function () {
		const responseMeetups = await client
			.collection('pickup_meetups')
			.getList(1, 25, {
				filter: `producer_id = '${authCtx.sellerPageId}'`,
			});

		pickupMeetups = responseMeetups.items;
	};

	const fetchAdminData = async function () {
		const responseAdminData = await client
			.collection('producers')
			.getList(1, 1, {
				filter: `id = '${authCtx.sellerPageId}'`,
			});
		adminData = responseAdminData.items[0];
	};
	const fetchData = async function () {
		await fetchListedProducersProducts();
		await fetchListedProducersMeetups();
		await fetchAdminData();
		setLoaded(true);
	};

	const deleteProduct = async function (recordId) {
		await client.collection('products').delete(recordId);
		setLoaded(false);
		fetchData();
	};

	const addingProductFunc = () => {
		toggleState(setAddingAProduct, addingAProduct);
		setLoaded(false);
		fetchData();
	};

	useEffect(() => {
		if (authCtx.isLoggedIn) {
			fetchData();
		}
	});

	//This doesn't work, if not logged in it loads null data and error
	if (!authCtx.isLoggedIn) return <LoginSection />;

	if (isLoaded)
		return (
			<main className="container">
				<h1>Seller Admin Page</h1>

				<ul className={classes.adminSections}>
					<li className={classes.adminSection}>
						<h2 className={classes.titleLine}>
							{isLoaded ? (
								adminData.producer_name
							) : (
								<LoadingSpinner />
							)}
							<BsPencil />
						</h2>
					</li>
					<li className={classes.adminSection}>
						<p>
							{adminData.tagline
								? adminData.tagline
								: 'Edit to fill in this section'}{' '}
							<BsPencil />
						</p>
					</li>
					<li className={classes.adminSection}>
						<ImgDragSlider seller={adminData} />

						{expand === 'imgs' ? (
							<table className={classes.adminTable}>
								<thead>
									<tr>
										<th>filename</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>
									{adminData.imgs ? (
										adminData.imgs.map((img) => (
											<ImgAdminItem
												img={img}
												key={img}
												deleteFunc={deleteProduct}
											/>
										))
									) : (
										<LoadingSpinner />
									)}
									<tr>
										<td className={classes.imgTitle}></td>
										<td>
											<button
												className={classes.smallBtn}
												onClick={() => {
													setExpand('');
												}}
											>
												Hide
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						) : (
							<h3
								className={classes.sectionTitle}
								onClick={() => {
									setExpand('imgs');
								}}
							>
								Edit current images <BsPencil />
							</h3>
						)}

						{adminData.imgs.length < 10 ? (
							<button className={classes.smallBtn}>
								Upload New Image
							</button>
						) : (
							<span className={classes.warn}>
								You have reached the max number of images!
							</span>
						)}
					</li>

					<li className={classes.adminSection}>
						<h2 className={classes.title}>About:</h2>

						<textarea
							className={classes.textAreaAbout}
							id="id"
							wrap="soft|hard"
							value={description}
						></textarea>
						<div className={classes.buttons}>
							<button>Cancel</button>
							<button>Save</button>
						</div>
					</li>

					<li className={classes.adminSection}>
						<h2 className={classes.title}>Products:</h2>

						{expand === 'products' ? (
							<table className={classes.adminTable}>
								<thead>
									<tr>
										<th>Edit</th>
										<th>Title</th>
										<th>Price</th>
										<th>Qty</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>
									{isLoaded ? (
										productList.map((product, index) => (
											<ProductAdminItem
												index={index}
												product={product}
												key={product.id}
												deleteFunc={deleteProduct}
											/>
										))
									) : (
										<LoadingSpinner />
									)}
									<tr className={classes.listItemContainer}>
										<td>
											<button
												onClick={() => {
													setExpand('');
												}}
												className={classes.smallBtn}
											>
												Hide
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						) : (
							<h3
								className={classes.sectionTitle}
								onClick={() => {
									setExpand('products');
								}}
							>
								Show current products <BsPencil />
							</h3>
						)}
						<div>
							{addingAProduct ? (
								<InputsSection
									addingProductFunc={addingProductFunc}
								/>
							) : null}
							<button
								className={classes.addBtn}
								onClick={() => {
									toggleState(
										setAddingAProduct,
										addingAProduct
									);
								}}
							>
								{addingAProduct
									? 'Nevermind '
									: 'Add A Product'}
							</button>
						</div>
					</li>
					<li className={classes.adminSection}>
						<h2 className={classes.title}>
							Meetups and Pickups:
						</h2>

						{expand === 'meetups' ? (
							<table className={classes.adminTable}>
								<thead>
									<tr>
										<th>Edit</th>
										<th>Type</th>
										<th>Location</th>
										<th>Time</th>
										<th>Delete</th>
									</tr>
								</thead>
								<tbody>
									{pickupMeetups.map((meetup) => (
										<PickupAdminItem
											meetup={meetup}
											key={meetup.id}
											deleteFunc={deleteProduct}
										/>
									))}

									<tr className={classes.listItemContainer}>
										<td>
											<button
												onClick={() => {
													setExpand('');
												}}
												className={classes.smallBtn}
											>
												Hide
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						) : (
							<h3
								className={classes.sectionTitle}
								onClick={() => {
									setExpand('meetups');
								}}
							>
								Show your meetups and pickup options{' '}
								<BsPencil />
							</h3>
						)}
						<button className={classes.smallBtn}>
							New Pickup / Meetup
						</button>
					</li>
					<li className={classes.adminSection}>
						<h2 className={classes.title}>Contact info:</h2>

						<textarea
							className={classes.textAreaTagline}
							id="id"
							wrap="soft|hard"
							value={tagline}
						></textarea>
						<div className={classes.buttons}>
							<button>Cancel</button>
							<button>Save</button>
						</div>
					</li>
					<li className={classes.adminSection}>
						<h2 className={classes.title}>
							Address:{' '}
							<span>
								{hideAddress ? 'HIDDEN' : 'VISIBLE'}
							</span>{' '}
						</h2>
						<div className={classes.addressBtn}>
							<h3>Hide address?</h3>
							<label className={classes.switch}>
								<input
									onClick={() => {
										toggleState(
											setHideAddress,
											hideAddress
										);
									}}
									type="checkbox"
								/>
								<span
									className={`${classes.slider} ${classes.round}`}
								></span>
							</label>
						</div>
						<p>
							If hidden users will have to request your
							address from you to pickup from you.
						</p>
						<textarea
							className={classes.textAreaTagline}
							id="id"
							wrap="soft|hard"
							value={tagline}
						></textarea>
						<div className={classes.buttons}>
							<button>Cancel</button>
							<button>Save</button>
						</div>
					</li>
				</ul>
			</main>
		);
};
export default abandonedSellerAdminPage;
