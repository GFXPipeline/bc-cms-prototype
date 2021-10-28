import axios from "axios";

import { authHeader } from "../_helpers";
import { authenticationService } from "../_services";

// GET request to /api/components
async function getPagesByUser() {
  console.log("Inside recycleBinService.getPagesByUser");
  try {
    const requestOptions = {
      headers: authHeader(),
      username: authenticationService.currentUserValue.username,
    };
    const response = await axios.get(
      `/api/recycle-bin/${authenticationService.currentUserValue.username}/pages`,
      requestOptions
    );

    console.log("Response in recycleBinService getPagesByUser: ", response);
    return response?.data;
  } catch (error) {
    console.log("Error in recycleBinService getPagesByUser: ", error);
    throw error;
  }
}

export const recycleBinService = {
  getPagesByUser,
};
