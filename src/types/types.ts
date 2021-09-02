export interface IExpense {
  id: number;
  name: string;
  description: string;
  value: number;
  createdAt: Date;
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  password: string;
}
