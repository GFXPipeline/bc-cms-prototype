import axios from "axios";

import { authHeader } from "../_helpers";

// Get a list of all users
const getAll = async () => {
  try {
    const requestOptions = {
      headers: authHeader(),
    };
    const result = await axios("/api/users/all", requestOptions);
    return result.data;
  } catch (error) {
    console.log("Error in user.service getAll(): ", error);
    throw error;
  }
};

export const userService = {
  getAll,
};
