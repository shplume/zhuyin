export type RoleType = 0 | 1 | 2; // 	Admin 0 | Teacher 1 | Student 2
export interface UserState {
  userId?: number;
  account?: string;
  avatar?: string;
  role?: RoleType;
}

// export interface UserState {
//   name?: string;
//   avatar?: string;
//   job?: string;
//   organization?: string;
//   location?: string;
//   email?: string;
//   introduction?: string;
//   personalWebsite?: string;
//   jobName?: string;
//   organizationName?: string;
//   locationName?: string;
//   phone?: string;
//   registrationDate?: string;
//   accountId?: string;
//   certification?: number;
//   role: RoleType;
// }
