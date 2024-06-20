import axios, { AxiosResponse } from "axios";

export const registerUser = async () => {
  try {
    if (!localStorage.getItem("userId")) {
      const response: AxiosResponse<any> = await axios.post(
        "/api/user/register"
      );

      if (!response.data.id) {
        throw new Error("Falha ao registrar o usuário");
      }

      const userId = response.data.id;

      localStorage.setItem("userId", userId);
    } else {
      alert(`USUÁRIO CRIADO COM O ID: ${localStorage.getItem("userId")}`);
    }
  } catch (error) {
    console.error("Falha ao registrar o usuário:", error);
  }
};
