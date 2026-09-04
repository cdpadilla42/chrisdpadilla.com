import { render } from '@testing-library/react';
import ArtGrid from '../components/ArtGrid';

jest.mock('next/link', () => ({ children }) => children);
jest.mock('next/image', () => (props) => (
  <img
    src={props.src}
    alt={props.alt}
    sizes={props.sizes}
    data-layout={props.layout}
    data-object-fit={props.objectFit}
  />
));

describe('ArtGrid', () => {
  test('renders square, cover-fitted responsive images', () => {
    const { container } = render(
      <ArtGrid images={[{ src: '/art.jpg', slug: 'art' }]} />,
    );

    const image = container.querySelector('img');
    expect(image).toHaveAttribute('data-layout', 'fill');
    expect(image).toHaveAttribute('data-object-fit', 'cover');
    expect(image).toHaveAttribute(
      'sizes',
      '(max-width: 799px) calc(100vw - 2.5rem), 30vw',
    );
  });
});
