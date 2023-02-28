import classes from './AboutSection.module.css';

import { useRef, useState } from 'react';
import AboutParagraph from '../UI/AboutParagraph';

const AboutSection = function (props) {
	console.log(props.aboutText);

	return (
		<section>
			<h1 className={classes.title}>About</h1>

			{props.aboutText.map((section, index) => (
				<AboutParagraph
					edit={props.edit}
					key={index}
					index={index}
					title={section.title}
					paragraph={section.paragraph}
					saveFunc={props.saveFunc}
					cancelFunc={props.cancelFunc}
					isEditing={
						section.isEditing ? section.isEditing : false
					}
				/>
			))}
		</section>
	);
};

export default AboutSection;
