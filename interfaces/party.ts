import { DateType, PartyType, SignUpStatus } from "@/enums/party.enum";
import { User } from "./user";

export interface PartyQuery {
  title?: string;
  partyStatus?: string;
  partyType?: string;
}

export interface Party {
  _id: string;
  partyType: PartyType;
  signUpStatus: SignUpStatus;
  dateType: DateType;
  startDate?: string;
  endDate?: string;
  title: string;
  content?: string;
  site?: string;
  address?: string;
  registeredUsers?: User[];

  subParties: SubParty[];
}

export interface SubParty {
  _id: string;
  startDate?: string;
  endDate?: string;
  title: string;
  content?: string;
  site?: string;
  address?: string;
  registeredUsers?: User[];
}
