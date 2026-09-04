import { render } from '@testing-library/react';
import AlbumStory from '../components/albumStory';
import { useWindowSize } from '../lib/useWindowSize';

jest.mock('../lib/useWindowSize', () => ({
  useWindowSize: jest.fn(),
}));

jest.mock('howler', () => ({
  Howl: class {
    play() {}
    stop() {}
  },
}));

jest.mock('react-transition-group', () => ({
  CSSTransition: ({ children }) => children,
}));

jest.mock('../components/tapEssay/tapEssay', () => () => null);

const storyProps = {
  verticalVideoSrc: '/vertical.mp4',
  horizontalVideoSrc: '/horizontal.mp4',
  audioSrc: '/audio.mp3',
};

describe('AlbumStory', () => {
  test('renders only the desktop video above the breakpoint', () => {
    useWindowSize.mockReturnValue({ width: 801 });

    const { container } = render(<AlbumStory {...storyProps} />);

    expect(container.querySelectorAll('video')).toHaveLength(1);
    expect(container.querySelector('source')).toHaveAttribute(
      'src',
      '/horizontal.mp4',
    );
  });

  test('renders only the mobile video at or below the breakpoint', () => {
    useWindowSize.mockReturnValue({ width: 800 });

    const { container } = render(<AlbumStory {...storyProps} />);

    expect(container.querySelectorAll('video')).toHaveLength(1);
    expect(container.querySelector('source')).toHaveAttribute(
      'src',
      '/vertical.mp4',
    );
  });
});
