import { createClient } from 'microcms-js-sdk';

const serviceDomain = process.env.NEXT_PUBLIC_SERVICE_ID;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

if (serviceDomain === undefined)
  throw Error('.envファイルにNEXT_PUBLIC_SERVICE_IDを設定してください');
if (apiKey === undefined)
  throw Error('.envファイルにNEXT_PUBLIC_API_KEYを設定してください');

export const client = createClient({
  serviceDomain,
  apiKey,
});
