export interface User {
  name?: string
  username: string;
  password: string
}


export interface UserResponse {
  userId: string
  token: string
  message: string
}
