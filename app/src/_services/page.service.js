import axios from "axios";

import { authHeader } from "../_helpers";
import { authenticationService } from "../_services";

// POST request to /api/page to create a new page
async function create({ data, numberOfCopies, pageType, template, title }) {
  try {
    const headers = authHeader();

    const newPageData = {
      action: "create",
      username: authenticationService.currentUserValue.username,
      numberOfCopies: numberOfCopies || 1,
      pageType: pageType || "topic",
      template: template || "base-template",
      title:
        title ||
        `New Page - ${
          authenticationService.currentUserValue.username
        } - ${Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)}`,
      data: data || "",
    };

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

// POST request to /api/page to clone an existing page
async function clone({ id, languages, numberOfCopies }) {
  try {
    const headers = authHeader();

    const clonePageData = {
      action: "clone",
      username: authenticationService.currentUserValue.username,
      numberOfCopies: numberOfCopies,
      languages: languages,
    };

    const response = await axios({
      method: "POST",
      url: `/api/page/${id}`,
      headers,
      data: clonePageData,
    });

    return response.data;
  } catch (error) {
    console.log("Error in page.service clone: ", error);
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
    };

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

// DELETE request to /api/page/:id
async function markForDeletion(id) {
  try {
    const headers = authHeader();

    const response = await axios({
      method: "DELETE",
      url: `/api/page/${id}`,
      headers,
      data: {
        username: authenticationService.currentUserValue.username,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in page.service delete: ", error);
    throw error;
  }
}

// GET request to /api/pages/all
async function getPageList() {
  try {
    const headers = authHeader();

    const response = await axios({
      method: "GET",
      url: "/api/pages/all",
      headers,
    });

    return response.data;
  } catch (error) {
    console.log("Error in page.service getPageList: ", error);
    throw error;
  }
}

export const pageService = {
  create,
  clone,
  read,
  update,
  markForDeletion,
  getPageList,
};
