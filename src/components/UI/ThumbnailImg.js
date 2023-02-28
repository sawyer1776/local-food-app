import classes from './ThumbnailImg.module.css';
import { GLOBALIP } from '../globalVars';

const ThumbnailImg = (props) => {
	console.log('collectionId', props.collectionId);
	console.log('productId', props.productId);
	console.log('Img', props.img);
	return (
		<img
			className={classes.productImg}
			src={`${GLOBALIP}/api/files/${props.collectionId}/${props.productId}/${props.img}`}
		></img>
	);
};

export default ThumbnailImg;
