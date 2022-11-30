import classes from './ThumbnailImg.module.css';

const ThumbnailImg = (props) => {
	return (
		<img
			className={classes.productImg}
			src={`http://127.0.0.1:8090/api/files/ktbhywrwv3kbqar/${props.product.id}/${props.product.imgs[0]}`}
		></img>
	);
};

export default ThumbnailImg;
