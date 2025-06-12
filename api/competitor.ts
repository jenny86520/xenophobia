import { CompetitorQuery } from "@/interfaces/competitor";
import { getApi } from "./api-base";

export const getCompetitors = (query: CompetitorQuery) => {
  return getApi("competitor", query);
};