import classes from './ImgSlider.module.css';

const ImgSlider = (props) => {
	return (
		<div>
			<img
				className={classes.sliderImg}
				data-testid="img"
				src={`http://127.0.0.1:8090/api/files/${props.imgs['@collectionId']}/${props.imgs.id}/${props.imgs.imgs[0]}`}
			></img>
		</div>
	);
};

export default ImgSlider;
