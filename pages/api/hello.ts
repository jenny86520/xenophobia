import Axios from "axios";
import getConfig from 'next/config'
// Only holds serverRuntimeConfig and publicRuntimeConfig
export const { env } = getConfig()
const axios = Axios.create({
  baseURL: process.env.NEST_PUBLIC_SERVER_HOST,
});

export const getMessage = () => axios.get("1101110");
