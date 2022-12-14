import BearCarousel, {
	TBearSlideItemDataList,
	BearSlideItem,
} from 'bear-react-carousel';
import 'bear-react-carousel/dist/index.css';

const ImgDragSlider = (props) => {
	const bearSlideItemData = props.seller.imgs.map(
		(img, index) => {
			return {
				key: index,
				children: (
					<BearSlideItem
						imageUrl={`http://127.0.0.1:8090/api/files/${props.seller['@collectionId']}/${props.seller.id}/${props.seller.imgs[index]}`}
					/>
				),
			};
		}
	);

	if (window.innerWidth < 1025) {
		return (
			<BearCarousel
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
