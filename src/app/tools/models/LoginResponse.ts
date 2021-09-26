export interface LoginResponse {
  token: string;
  tokenType: string;
  locked?: number;
}
