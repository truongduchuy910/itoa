import { Progress } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TopProcress() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleRouteStart = (url, { shallow }) => {
      setLoading(true);
      console.log(
        `START App is changing to ${url} ${
          shallow ? "with" : "without"
        } shallow routing`,
      );
    };
    const handleRouteComplete = (url, { shallow }) => {
      setTimeout(() => setLoading(false), 500);

      console.log(
        `STOP App is changing to ${url} ${
          shallow ? "with" : "without"
        } shallow routing`,
      );
    };

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteComplete);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, []);
  return (
    loading && (
      <Progress
        size="xs"
        isIndeterminate
        pos="fixed"
        zIndex={99999}
        top="0"
        w="full"
        bg="#494a48"
        colorScheme="gray"
      />
    )
  );
}
