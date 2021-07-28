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

async function getUserDetails(username) {
  try {
    const headers = authHeader();

    const response = await axios({
      method: "GET",
      url: `/api/user/${username}`,
      headers,
    });

    return response.data;
  } catch (error) {
    console.log("Error in user.service getUserDetails(): ", error);
    throw error;
  }
}

export const userService = {
  getAll,
  getUserDetails,
};
