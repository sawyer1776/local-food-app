import BearCarousel, {
	TBearSlideItemDataList,
	BearSlideItem,
} from 'bear-react-carousel';
import 'bear-react-carousel/dist/index.css';
import GLOBALIP from '../globalVars';
import classes from './ImgDragSlider.module.css';

const ImgDragSlider = (props) => {
	const bearSlideItemData = props.seller.imgs.map(
		(img, index) => {
			return {
				key: index,
				children: (
					<BearSlideItem
						imageUrl={`${GLOBALIP}/api/files/${props.seller.collectionId}/${props.seller.id}/${props.seller.imgs[index]}`}
					/>
				),
			};
		}
	);

	if (window.innerWidth < 1025) {
		return (
			<BearCarousel
				className={classes.border}
				data={bearSlideItemData}
				// isEnableLoop
				// isEnableNavButton
				isEnablePagination
				// isDebug
				aspectRatio={{ widthRatio: 12, heightRatio: 9 }}
			/>
		);
	} else {
		return (
			<BearCarousel
				data={bearSlideItemData}
				// isEnableLoop
				isEnableNavButton
				isEnablePagination
				// isDebug
				aspectRatio={{ widthRatio: 12, heightRatio: 9 }}
			/>
		);
	}
};

export default ImgDragSlider;
