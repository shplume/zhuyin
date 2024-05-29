export type RoleType = 'admin' | 'teacher' | 'student';
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
