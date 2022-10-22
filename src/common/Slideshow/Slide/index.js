const Slide = ({ image, isActive }) => {
  return (
    <div
      className={
        isActive
          ? 'active carousel-item relative float-left w-full'
          : 'carousel-item relative float-left w-full'
      }
    >
      <img src={image} className="block w-full" alt="Wild Landscape" />
    </div>
  );
};

export default Slide;
