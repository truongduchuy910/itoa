const One = ({ variant: { height = 21 } }) => {
  return (
    <div
      style={{
        width: "100%",
        maxHeight: height,
        height: "50vh",
        backgroundColor: "rgba(0,0,0,0.05)",
        margin: 0,
        padding: 0,
      }}
    />
  );
};
export default One;
