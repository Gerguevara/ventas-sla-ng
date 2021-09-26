import { Usuario } from "src/app/core/models/usuario.model";

export interface LoginResponse {
  token: string;
  tokenType: string;
}
