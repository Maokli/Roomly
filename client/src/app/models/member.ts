import { Photo } from "./photo";

export interface Member {
  userName: string;
  photoUrl: string;
  gender: string;
  dateOfBirth: string;
  joined: Date;
  lastActive: Date;
  description: string;
  budget: number;
  interests: string;
  city: string;
  country: string;
  photos: Photo[];
}
