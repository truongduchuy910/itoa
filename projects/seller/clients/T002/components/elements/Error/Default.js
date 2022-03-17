import { useToast } from "@chakra-ui/react";
const Error = ({ error }) => {
  const toast = useToast();
  const description = error.replace("Error: ", "");
  toast({
    status: "warning",
    description,
    render: () => (
      <div
        style={{
          backgroundColor: `rgba(0,0,0,0.8)`,
          padding: 13,
          color: `#fff`,
          borderRadius: 5,
          textAlign: "center",
        }}
      >
        ⚠️ {description}
      </div>
    ),
  });
  return <div />;
};
export default Error;
