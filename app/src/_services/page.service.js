import axios from "axios";

import { authHeader } from "../_helpers";
import { authenticationService } from "../_services";

// POST request to /api/page to create a new page
async function create({
  data,
  isOnThisPage,
  navTitle,
  numberOfCopies,
  pageType,
  reviewFrequency,
  template,
  title,
}) {
  try {
    const headers = authHeader();

    const generatedTitle = `New Page - ${
      authenticationService.currentUserValue.username
    } - ${Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)}`;

    const newPageData = {
      action: "create",
      username: authenticationService.currentUserValue.username,
      numberOfCopies: numberOfCopies || 1,
      pageType: pageType || "topic",
      template: template || "base-template",
      title: title || generatedTitle,
      navTitle: navTitle || generatedTitle,
      data: data || "",
      isOnThisPage: isOnThisPage || false,
      reviewFrequencyMonths: reviewFrequency,
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

// GET request to /api/page/:id to read details of a single page
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

// PUT request to /api/page/:id to update an existing page
async function update({ id, data, intro, isOnThisPage, navTitle, title }) {
  console.log("Inside pageService.update, id: ", id);
  try {
    const headers = authHeader();

    const updatedPageData = {
      username: authenticationService.currentUserValue.username,
      title: title,
      navTitle: navTitle,
      data: data,
      intro: intro,
      isOnThisPage: isOnThisPage,
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
async function markForDeletion({
  id,
  deleteType,
  reason,
  isDeleteDateSet,
  timeToDelete,
  isNotificationRequested,
  isSubscriberMessageSet,
  subscriberMessage,
}) {
  console.log("Inside pageService.markForDeletion, id: ", id);
  try {
    const headers = authHeader();

    const response = await axios({
      method: "DELETE",
      url: `/api/page/${id}`,
      headers,
      data: {
        username: authenticationService.currentUserValue.username,
        deleteType: deleteType,
        reason: reason,
        isDeleteDateSet: isDeleteDateSet ? true : false,
        time_to_delete: timeToDelete,
        isNotificationRequested: isNotificationRequested ? true : false,
        isSubscriberMessageSet: isSubscriberMessageSet ? true : false,
        subscriberMessage: subscriberMessage,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error in page.service delete: ", error);
    throw error;
  }
}

// POST request to /api/page/undelete/:id
async function undelete({id, reason}) {
  console.log("pageService.undelete, id: ", id);
  try {
    const headers = authHeader();

    const response = await axios({
      method: "POST",
      url: `/api/page/undelete/${id}`,
      headers,
      data: {
        username: authenticationService.currentUserValue.username,
        reason: reason,
      },
    });

    console.log("response: ", response);

    return response.data;
  } catch (error) {
    console.log("Error in pageService undelete: ", error);
    throw error;
  }
}

// GET request to /api/pages/all
async function getPageList() {
  console.log("pageService.getPageList()");
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

// GET request to /api/pages/tree
async function getPageTree() {
  console.log("pageService.getPageTree()");
  try {
    const headers = authHeader();

    const response = await axios({
      method: "GET",
      url: "/api/pages/tree",
      headers,
    });

    if (
      response?.data &&
      typeof response?.data === "object"
      && response.data.hasOwnProperty("tree")
    ) {
      return response?.data?.tree;
    } else {
      throw new Error("Error in page.service getPageTree: malformed API response");
    }
  } catch (error) {
    console.log("Error in page.service getPageTree: ", error);
    throw error;
  }
}

// GET request to /api/page-navigation-types/
async function getPageNavigationTypes() {
  console.log("pageService.getPageNavigationTypes()");
  try {
    const headers = authHeader();

    const response = await axios({
      method: "GET",
      url: "/api/page-navigation-types/",
      headers,
    });

    return response.data;
  } catch (error) {
    console.log("Error in pageService.getPageNavigationTypes: ", error);
    throw error;
  }
}

// GET request to /api/page-templates/
async function getPageTemplates() {
  console.log("pageService.getPageTemplates()");
  try {
    const headers = authHeader();

    const response = await axios({
      method: "GET",
      url: "/api/page-templates/",
      headers,
    });

    return response.data;
  } catch (error) {
    console.log("Error in page.service getPageTemplates: ", error);
    throw error;
  }
}

// GET request to /api/page-types/
async function getPageTypes() {
  console.log("pageService.getPageTypes()");
  try {
    const headers = authHeader();

    const response = await axios({
      method: "GET",
      url: "/api/page-types/",
      headers,
    });

    return response.data;
  } catch (error) {
    console.log("Error in page.service getPageTypes: ", error);
    throw error;
  }
}

export const pageService = {
  create,
  clone,
  read,
  update,
  markForDeletion,
  undelete,
  getPageList,
  getPageTree,
  getPageNavigationTypes,
  getPageTemplates,
  getPageTypes,
};
