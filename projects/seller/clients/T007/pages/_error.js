import { Box, Heading } from "@chakra-ui/react";

function Error({ statusCode }) {
  return (
    <Box>
      <Heading>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </Heading>
    </Box>
  );
}
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
