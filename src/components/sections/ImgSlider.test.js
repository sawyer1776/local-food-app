import { render, screen } from '@testing-library/react';
import ImgSlider from './ImgSlider';

test('contains an image', () => {
	render(<ImgSlider />);
	const img = screen.getByText(/img/i);
	expect(img).toBeInTheDocument();
});
