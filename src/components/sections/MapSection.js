import classes from './MapSection.module.css';
import {
	MapContainer,
	Popup,
	TileLayer,
	useMap,
	Marker,
	Circle,
} from 'react-leaflet';

const MapSection = (props) => {
	return (
		<MapContainer
			className={classes.map}
			center={props.latLong}
			zoom={12}
			scrollWheelZoom={false}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			<Circle
				center={props.latLong}
				pathOptions={{ color: 'green', fillColor: 'green' }}
				radius={1200}
			></Circle>
		</MapContainer>
	);
};

export default MapSection;
