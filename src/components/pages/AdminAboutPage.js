const AdminAboutPage = (props) => {
	return (
		<div>
			<p>this is a long strin</p>
			<p>more here</p>
			{/* <label className={classes.label} for="description">
				Description:
			</label>
			 <textarea
				className={`${classes.input} ${classes.description}`}
				id="description"
				placeholder="Tell everyone about your product and how it is made or grown."
				defaultValue={
					product.description ? product.description : null
				}
			></textarea> */}

			<div contentEditable="true">
				lots of text more text here lots of text and more
				and more don't who whoy ntu here is text
			</div>
		</div>
	);
};

export default AdminAboutPage;
