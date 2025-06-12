import { PartyQuery } from "@/interfaces/party";
import { getApi } from "./api-base";

export const getParties = (query: PartyQuery) => {
  return getApi("party", query);
};

export const getParty = (id: string) => {
  return getApi(`party/${id}`);
};
