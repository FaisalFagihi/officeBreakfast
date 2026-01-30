const ImageWithFallback = ({ src, alt, ...props }) => {
  const fallback = "/assets/no-image.png";

  return (
    <img
      src={src || fallback}
      alt={alt}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = fallback;
      }}
      {...props}
    />
  );
};

export default ImageWithFallback;
