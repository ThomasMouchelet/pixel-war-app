import { connectUser, createUser, postRequest, postRequestWithoutToken } from "../utils/useApi";

export const login = async (data) => {
  console.log("login servcie", data);
  try {
    // const response = await postRequestWithoutToken("/auth/login", data);
    const response = await connectUser(data);
    console.log("login servcie response", response);
    // localStorage.setItem("token", response.data.access_token);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (data) => {
  try {
    // const response = await postRequest("/auth/signup", data);
    const response = await createUser(data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
