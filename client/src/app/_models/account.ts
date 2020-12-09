import { Role } from "./role";
import { Expense } from "./expense";

export class Account {
  id: string;
  reportId?: string;
  reportsManagerId?: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  jwtToken?: string;
  created: string;
  isVerified: boolean;
  updated: string;
  studentExpenses?: [Expense];
  studentExpensesCount?: number;
  reportsManager?:any;
  reportsManagerStudentsCount?: number;
  reportsManagerExpensesCount?: number;
  reportsManagerReports?: any;
  studentReport?: any;
}
