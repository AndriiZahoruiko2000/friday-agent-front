export interface RegisterBody {
  nickname: string;
  email: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  nickname: string;
  email: string;
}
