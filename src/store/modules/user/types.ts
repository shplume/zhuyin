export type RoleType = 0 | 1 | 2; // 	Admin 0 | Teacher 1 | Student 2
export interface UserState {
  userId?: number;
  account?: string;
  avatar?: string;
  role?: RoleType;
  name?: string;
  college?: string;
  phone?: string;
  number?: string;
}
