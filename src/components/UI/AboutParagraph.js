import { useRef, useState } from 'react';
import { BsTrash, BsPencil } from 'react-icons/bs';
import classes from './AboutParagraph.module.css';

const AboutParagraph = (props) => {
	const [isEditing, setEditing] = useState(props.isEditing);
	const [isLoaded, setLoaded] = useState(true);
	const titleRef = useRef();
	const paragraphRef = useRef();

	return (
		<div
			className={`${classes.paragraphAndHead} ${
				isEditing ? classes.isEditing : null
			}`}
		>
			<h3
				ref={titleRef}
				contentEditable={isEditing}
				onClick={() => {
					setEditing(true);
				}}
				// className={classes.aboutParagraph}
			>
				{props.title}
			</h3>

			{props.edit ? (
				<div className={classes.btnsDiv}>
					<button
						className="buttonOutline buttonRound"
						onClick={() => {
							setEditing(true);
						}}
					>
						<BsPencil />
					</button>
					<button
						className="buttonOutline buttonRound"
						onClick={() => {
							props.saveFunc(props.index, 'deleteThis');
						}}
					>
						<BsTrash />
					</button>
				</div>
			) : null}

			<p
				ref={paragraphRef}
				contentEditable={isEditing}
				onClick={() => {
					setEditing(true);
				}}
				// className={classes.aboutParagraph}
			>
				{props.paragraph}
			</p>

			{isEditing ? (
				<div className={classes.btns}>
					<button
						onClick={() => {
							props.saveFunc(
								props.index,
								titleRef.current.innerText,
								paragraphRef.current.innerText
							);
							setEditing(false);
						}}
					>
						Save
					</button>
					<button
						className="buttonOutline"
						onClick={() => {
							props.cancelFunc();
							setEditing(false);
						}}
					>
						Cancel
					</button>
				</div>
			) : null}
		</div>
	);
};

export default AboutParagraph;
