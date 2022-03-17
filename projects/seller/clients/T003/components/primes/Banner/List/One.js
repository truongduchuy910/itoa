const One = ({ server, banners }) => {
  return (
    banners &&
    banners.map((banner) => (
      <Item key={banner.id} {...banner} server={server} />
    ))
  );
};
export default One;
const Item = ({ file, server }) => {
  return file && <img src={server + file?.publicUrl} />;
};
