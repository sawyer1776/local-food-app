import classes from './AboutSection.module.css';

const AboutSection = function (props) {
	console.log(props.aboutText.paragraphs);
	return (
		<section>
			<h1 className={classes.title}>About</h1>

			{props.aboutText.paragraphs.map(
				(paragraph, index) => (
					<p className={classes.aboutParagraph} key={index}>
						{paragraph}
					</p>
				)
			)}

			{/* <p>{props.aboutText}</p> */}
			{/* Add Imgs */}
		</section>
	);
};

export default AboutSection;
