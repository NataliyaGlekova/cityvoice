import { AxiosInstance } from "axios";
import axiosInstance from "../../../shared/api/axiosInstance";
import { LoginFormT, RegisterFormT, UserT } from "../model/types";
import { authApiResponseSchema } from "../model/schema";

class UserService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async register(data: RegisterFormT): Promise<UserT> {
    const response = await this.client.post("/auth/register", data);
    return authApiResponseSchema.parse(response.data).user;
  }

  async refresh(): Promise<UserT> {
    const response = await this.client.get("/auth/refresh");
    return authApiResponseSchema.parse(response.data).user;
  }

  async logout(): Promise<void> {
    await this.client.delete("/auth/logout");
  }

  async login(data: LoginFormT): Promise<UserT> {
    const response = await this.client.post("/auth/login", data);
    return authApiResponseSchema.parse(response.data).user;
  }
}

export default new UserService(axiosInstance);
