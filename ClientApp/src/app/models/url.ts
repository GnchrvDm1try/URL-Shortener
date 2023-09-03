import { User } from "./user";

export interface Url {
  id: number;
  url: string;
  shortenUrl: string;
  createdAt: Date;
  createdBy: User;
}
