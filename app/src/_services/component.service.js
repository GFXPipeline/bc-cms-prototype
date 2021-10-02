import axios from "axios";

import { authHeader } from "../_helpers";
import { authenticationService } from "../_services";

// GET request to /api/page/:id to read details of a single page
async function read(id) {
  console.log("Inside componentService.read, id: ", id);
  try {
    const requestOptions = {
      headers: authHeader(),
      username: authenticationService.currentUserValue.username,
    };
    const response = await axios.get(`/api/component/${id}`, requestOptions);

    console.log("Response in componentService read: ", response);
    if (response?.data && Array.isArray(response?.data)) {
      return response?.data?.[0];
    } else {
      const error = "Response in componentService.read is not an array";
      throw error;
    }
  } catch (error) {
    console.log("Error in componentService read: ", error);
    throw error;
  }
}

// PUT request to /api/component/:id to update an existing page
async function update({ id, intro, title }) {
  console.log("Inside componentService.update, id: ", id);
  try {
    const headers = authHeader();

    const updatedComponentData = {
      username: authenticationService.currentUserValue.username,
      title: title,
      intro: intro,
    };

    const response = await axios({
      method: "PUT",
      url: `/api/component/${id}`,
      headers,
      data: updatedComponentData,
    });

    return response.data;
  } catch (error) {
    console.log("Error in componentService.update: ", error);
    throw error;
  }
}

// GET request to /api/components/all
async function getComponentList() {
  console.log("Inside componentService.getComponentList");
  try {
    const requestOptions = {
      headers: authHeader(),
      username: authenticationService.currentUserValue.username,
    };
    const response = await axios.get(`/api/components/all`, requestOptions);

    console.log("Response in componentService getComponentList: ", response);
    return response?.data;
  } catch (error) {
    console.log("Error in componentService read: ", error);
    throw error;
  }
}

export const componentService = {
  read,
  update,
  getComponentList,
};
