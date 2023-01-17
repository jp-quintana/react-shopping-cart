const Slide = ({ image, isActive, className }) => {
  return (
    <div
      className={
        isActive
          ? `active carousel-item relative float-left w-full ${className}`
          : `carousel-item relative float-left w-full ${className}`
      }
    >
      <img src={image} className="block w-full" alt="Wild Landscape" />
    </div>
  );
};

export default Slide;
