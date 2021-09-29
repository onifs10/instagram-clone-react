// eslint-disable-next-line import/no-extraneous-dependencies
import Proptypes from 'prop-types';

export default function Image({ src, caption }) {
  return <img src={src} alt={caption} />;
}

Image.propTypes = {
  src: Proptypes.string.isRequired,
  caption: Proptypes.string.isRequired
};
