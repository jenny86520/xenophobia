import { PartyQuery } from "@/interfaces/party";
import { getApi } from "./api-base";

export const getParties = (query: PartyQuery) => {
  return [];
  // TODO: return getApi("party/main", query);
};

export const getParty = (query: PartyQuery) => {
  return getApi("party/detail", query);
};