import { Address } from "./address.model";
import { Gender } from "./gender.model";

export interface Student {
  id: String;
  firstName: string;
  lastName: string;
  DateOfBirth: string;
  email: string;
  mobile: number;
  profileImageUrl: string;
  genderId: string;
  gender: Gender;
  address: Address;
}
