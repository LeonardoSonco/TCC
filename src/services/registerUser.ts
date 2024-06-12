import axios, { AxiosResponse } from "axios";

export const registerUser = async () => {
  try {
    if (!localStorage.getItem("userId")) {
      const response: AxiosResponse<any> = await axios.post(
        "/api/user/register"
      );

      if (!response.data.id) {
        throw new Error("Failed to register user");
      }

      const userId = response.data.id;

      console.log(`User registered with id: ${userId}`);
      localStorage.setItem("userId", userId);
    } else {
      alert(`USUARIO CRIADO COM O ID ${localStorage.getItem("userId")}`);
    }
  } catch (error) {
    console.error("Failed to register user:", error);
  }
};
