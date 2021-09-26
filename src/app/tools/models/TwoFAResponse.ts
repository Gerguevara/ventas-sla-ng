import { Usuario } from "@models/usuario.model";

export interface LoginResponse {
  token: string;
  tokenType: string;
}
