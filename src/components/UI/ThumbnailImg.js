import classes from './ThumbnailImg.module.css';
import GLOBALIP from '../globalVars';

const ThumbnailImg = (props) => {
	return (
		<img
			className={classes.productImg}
			src={`${GLOBALIP}/api/files/fju2ageazj7ce35/${props.product.id}/${props.product.imgs[0]}`}
		></img>
	);
};

export default ThumbnailImg;
