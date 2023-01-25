import classes from './AboutSection.module.css';

const AboutSection = function (props) {
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

			{/* Add Imgs */}
		</section>
	);
};

export default AboutSection;
