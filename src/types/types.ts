export interface IExpense {
  id: string;
  name: string;
  description: string;
  value: number;
  createdAt: Date;
}

export interface IUser {
  id: string;
  name: string;
  __movements__?: IExpense[];
  username: string;
  password: string;
}
