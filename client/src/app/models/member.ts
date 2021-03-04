import { Photo } from "./photo";

export interface Member {
  UserName: string;
  Gender: string;
  DateOfBirth: string;
  Joined: Date;
  LastActive: Date;
  Description: string;
  Budget: number;
  Interests: string;
  City: string;
  Country: string;
  Photos: Photo[];
}
