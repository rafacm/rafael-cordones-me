import sanityClient from "@sanity/client";
import sanityConfig from '../../sanity.config'

export default sanityClient(
  sanityConfig
);
