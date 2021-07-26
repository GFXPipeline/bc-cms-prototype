import axios from "axios";

import { authHeader } from "../_helpers";
import { authenticationService } from "../_services";

// POST request to /api/page
async function create({ data, title }) {
  try {
    const headers = authHeader();

    const newPageData = {
      username: authenticationService.currentUserValue.username,
      title: title,
      data: data,
    }

    const response = await axios({
      method: "POST",
      url: "/api/page",
      headers,
      data: newPageData,
    });

    return response.data;
  } catch (error) {
    console.log("Error in page.service create: ", error);
    throw error;
  }
}

// GET request to /api/page/:id
async function read(id) {
  console.log("Inside pageService.read, id: ", id);
  try {
    const requestOptions = {
      headers: authHeader(),
      username: authenticationService.currentUserValue.username,
    };
    const response = await axios.get(`/api/page/${id}`, requestOptions);

    console.log("Response in page.service read: ", response);
    if (response?.data && Array.isArray(response?.data)) {
      return response?.data?.[0];
    } else {
      const error = "Response in page.service.read is not an array";
      throw error;
    }
  } catch (error) {
    console.log("Error in page.service read: ", error);
    throw error;
  }
}

// PUT request to /api/page/:id
async function update({ id, data, title }) {
  console.log("Inside pageService.update, id: ", id);
  try {
    const headers = authHeader();

    const updatedPageData = {
      username: authenticationService.currentUserValue.username,
      title: title,
      data: data,
    }

    const response = await axios({
      method: "PUT",
      url: `/api/page/${id}`,
      headers,
      data: updatedPageData,
    });

    return response.data;
  } catch (error) {
    console.log("Error in page.service update: ", error);
    throw error;
  }
}

export const pageService = {
  create,
  read,
  update,
};
