// TODO: 統一api
export const getApi = (uri: string, query: any = {}) => {
  const domain = process.env.NEXT_PUBLIC_API_URL;
  if (!domain) {
    throw Error("NEXT_PUBLIC_API_URL not found");
  }
  const params = new URLSearchParams();
  Object.keys(query).forEach((key) => params.append(key, query[key]));
  const option = {
    method: "GET",
  };
  // return fetch('').then(() => []);
  return fetch(`${domain}/${uri}?${params}`, option).then((res) => res.json());
};
