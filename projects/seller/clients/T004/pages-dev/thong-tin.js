import { gql, useQuery, useSubscription } from "@apollo/client";
import { useState } from "react";

const Info = () => {
  const [count, setCount] = useState(1);
  const { data, loading, error } = useQuery(
    gql`
      query {
        allProductCartItems {
          id
        }
      }
    `
  );
  if (loading) return "...";
  if (error) return "error";

  return (
    <div>
      huy
      <Line x={54} />
      tran
      <Line />
      {JSON.stringify(data)}
      <button
        onClick={() => {
          setCount((count) => ++count);
        }}
      >
        +
      </button>
    </div>
  );
};

export default Info;

const Line = (props) => {
  const { x } = props;
  return <hr style={{ marginBottom: x }} />;
};
