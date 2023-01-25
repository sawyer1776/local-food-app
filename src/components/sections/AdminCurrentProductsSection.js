import ProductAdminItem from '../UI/ProductAdminItem';

const AdminCurrentProductsSection = (props) => {
	console.log('props.productsList', props.productsList);
	return (
		<table>
			<thead>
				<tr>
					<th>Edit</th>
					<th>Title</th>
					<th>Price</th>
					<th>Qty</th>
				</tr>
			</thead>
			<tbody>
				{props.productsList.map((product, index) => (
					<ProductAdminItem
						index={index}
						product={product}
						key={product.id}
						editFunction={props.editFunction}
					/>
				))}
			</tbody>
		</table>
	);
};

export default AdminCurrentProductsSection;
