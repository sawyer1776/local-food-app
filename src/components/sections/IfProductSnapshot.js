import ProductPage from './ProductPage';
import ProductSnapshot from './ProductSnapshot';

const IfProductSnapshot = (props) => {
	if (typeof props.product == 'object') {
		return <ProductSnapshot product={props.product} />;
	} else {
		return;
	}
};

export default IfProductSnapshot;
