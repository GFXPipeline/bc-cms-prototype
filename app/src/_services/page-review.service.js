import axios from "axios";

import { authHeader } from "../_helpers";

// GET request to /api/page-review/
async function getAllPages() {
  console.log("pageReviewService.getAllPages()");
  try {
    const headers = authHeader();

    const response = await axios({
      method: "GET",
      url: "/api/page-review/",
      headers,
    });

    return response.data;
  } catch (error) {
    console.log("Error in page.service getPageTypes: ", error);
    throw error;
  }
}

// GET request to /api/page-review/:userId
async function getPagesByUser(username) {
  console.log(`pageReviewService.getPagesByUser(${username})`);
  try {
    const headers = authHeader();

    const response = await axios({
      method: "GET",
      url: `/api/page-review/${username}`,
      headers,
    });

    return response.data;
  } catch (error) {
    console.log("Error in page.service getPageTypes: ", error);
    throw error;
  }
}

export const pageReviewService = {
  getAllPages,
  getPagesByUser,
};
