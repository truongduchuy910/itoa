import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export default function Process({ UI = {} }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    var time;
    const handleRouteStart = (url, { shallow }) => {
      setLoading(true);
      console.log(
        `START ${url} ${shallow ? "with" : "without"} shallow routing`,
      );
    };

    const handleRouteComplete = (url, { shallow }) => {
      time = setTimeout(() => setLoading(false), 500);
      console.log(
        `STOP ${url} ${shallow ? "with" : "without"} shallow routing`,
      );
    };
    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteComplete);
    return () => {
      clearTimeout(time);
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, []);
  return useMemo(() => <UI loading={loading} />, [loading, UI.name]);
}
