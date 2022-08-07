import { Link } from 'react-router-dom';

const Slide = (props) => {
  const { image, isActive, url } = props;

  return (
    <div
      className={
        isActive
          ? 'active carousel-item relative float-left w-full'
          : 'carousel-item relative float-left w-full'
      }
    >
      <Link to={url}>
        <img src={image} className="block w-full" alt="Wild Landscape" />
      </Link>
    </div>
  );
};

export default Slide;
