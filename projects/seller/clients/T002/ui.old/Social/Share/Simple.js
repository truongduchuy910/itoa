import { HStack } from "@chakra-ui/react";
import { Fragment } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

export default function ShareSimple({ url, src }) {
  const host = window.location.host;
  return (
    <HStack mt={3}>
      {url && (
        <Fragment>
          <FacebookShareButton
            children={<FacebookIcon size={24} />}
            url={host + "/" + url}
          />
          <TwitterShareButton
            children={<TwitterIcon size={24} />}
            url={host + "/" + url}
          />
        </Fragment>
      )}
      {src && (
        <Fragment>
          <PinterestShareButton
            children={<PinterestIcon size={24} />}
            url={host + "/" + url}
            media={host + "/" + src || "/assets/img/no-image.png"}
          />
        </Fragment>
      )}
    </HStack>
  );
}
