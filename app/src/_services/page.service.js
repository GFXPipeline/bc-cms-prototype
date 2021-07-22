import axios from "axios";

import { authHeader } from "../_helpers";
import { authenticationService } from "../_services";

// GET request to /api/page/:id
async function read(id) {
  console.log("Inside pageService.read, id: ", id);
  try {
    const requestOptions = {
      headers: authHeader(),
      username: authenticationService.currentUserValue.username,
    };
    console.log("requestOptions: ", requestOptions);
    const response = await axios.get(`/api/page/${id}`, requestOptions);

    console.log("Response in page.service read: ", response);
    if (response?.data && Array.isArray(response?.data)) {
      return response?.data?.[0]?.data;
    } else {
      const error = "Response in page.service.read is not an array";
      throw error;
    }
  } catch (error) {
    console.log("Error in page.service read: ", error);
    throw error;
  }
}

export const pageService = {
  read,
};
