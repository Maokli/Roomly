import { User } from "./user";

export class UserParams {
  gender = "";
  country: string;
  minAge = 18;
  maxAge = 99;
  pageNumber = 1;
  pageSize = 6;

  constructor(user: User) {
    this.country = user.country;
  }
}