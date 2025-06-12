export interface CompetitorQuery {
  partyId: string;
  subPartyId?: string;
}

export interface Competitor {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  odds: number;
}
