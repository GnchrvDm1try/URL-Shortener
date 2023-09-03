import { Roles } from "./roles";

export interface User {
  id: number;
  login: string;
  registeredAt: Date;
  role: Roles;
}
