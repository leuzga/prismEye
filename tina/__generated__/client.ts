import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: '/api/tina/gql', token: '915b722b1b7421bbe3458a9cefcba45073764ade', queries,  });
export default client;
  