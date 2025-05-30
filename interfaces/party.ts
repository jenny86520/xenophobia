export interface PartyQuery {
  title?: string;
  partyStatus?: string;
  partyType?: string;
}

// 活動相關類型
export interface Party {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  isOnline: boolean;
  capacity: number;
  registeredUsers: string[];
  imageUrl?: string;
  subParties: SubParty[];
  createdAt: string;
  updatedAt: string;
}

export interface SubParty {
  _id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  capacity: number;
  registeredUsers: string[];
  event: string;
  createdAt: string;
  updatedAt: string;
}
