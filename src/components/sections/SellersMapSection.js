import classes from './SellersMapSection.module.css';
import {
	MapContainer,
	Popup,
	TileLayer,
	useMap,
	Marker,
	Circle,
} from 'react-leaflet';
import { NavLink } from 'react-router-dom';

let sellers = [
	{
		location: [32.525, -85.335],
		title: 'Willow Run Farm',
		seller_id: 'k9rfk6p2epvhe6c',
	},
];

const SellersMapSection = (props) => {
	console.log('all seller data', props.sellers);
	return (
		<MapContainer
			className={classes.map}
			center={[35.58, -82.1]}
			zoom={4.5}
			scrollWheelZoom={false}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/* {props.sellers.map((seller) => (
				<Marker position={seller.lat_long}>
					<Popup>
						<NavLink
							to={`/seller-page/${seller.id}`}
							className={classes.popup}
						>
							<h4>{seller.producer_name}</h4>
							<p>{seller.location}</p>
						</NavLink>
					</Popup>
				</Marker>
			))} */}
			{props.sellers.map((seller) => {
				return seller.lat_long ? (
					<Marker position={seller.lat_long}>
						<Popup>
							<NavLink
								to={`/seller-page/${seller.id}`}
								className={classes.popup}
							>
								<h4>{seller.producer_name}</h4>
								<p>{seller.location}</p>
							</NavLink>
						</Popup>
					</Marker>
				) : (
					''
				);
			})}

			{/* <Circle
				center={props.latLong}
				pathOptions={{ color: 'green', fillColor: 'green' }}
				radius={1200}
			></Circle> */}
		</MapContainer>
	);
};

export default SellersMapSection;
