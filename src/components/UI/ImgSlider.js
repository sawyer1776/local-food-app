import classes from './ImgSlider.module.css';
import React, { useState } from 'react';

const ImgSlider = (props) => {
	console.log('imgs are', props.imgs.imgs);
	return (
		<div className={classes.sliderContainer}>
			{props.imgs.imgs.map((img, index) => (
				<img
					className={classes.sliderImg}
					data-testid="img"
					src={`http://127.0.0.1:8090/api/files/${props.imgs['@collectionId']}/${props.imgs.id}/${props.imgs.imgs[index]}`}
				></img>
			))}
		</div>
	);
};

export default ImgSlider;
