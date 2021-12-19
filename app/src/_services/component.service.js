import axios from "axios";

import { authHeader } from "../_helpers";
import { authenticationService } from "../_services";

// POST request to /api/component/ to create a new component
async function create({ fields, intro, name, title, type, }) {
  console.log("componentService.create()");
  try {
    const headers = authHeader();

    const newComponentData = {
      username: authenticationService.currentUserValue.username,
      type,
      title,
      intro,
      fields,
      name,
    }

    const response = await axios({
      method: "POST",
      url: "/api/component",
      headers,
      data: newComponentData
    });

    return response.data;
  } catch (error) {
    console.log("Error in componentService.create(): ");
    throw error;
  }
}

// GET request to /api/component/:id to read details of a single page
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
async function update({ id, intro, name, title, fields }) {
  console.log("Inside componentService.update, id: ", id);
  try {
    const headers = authHeader();

    const updatedComponentData = {
      username: authenticationService.currentUserValue.username,
      name: name,
      title: title,
      intro: intro,
      fields: fields,
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

// GET request to /api/components
async function getComponentList() {
  console.log("Inside componentService.getComponentList");
  try {
    const requestOptions = {
      headers: authHeader(),
      username: authenticationService.currentUserValue.username,
    };
    const response = await axios.get(`/api/components`, requestOptions);

    console.log("Response in componentService getComponentList: ", response);
    return response?.data;
  } catch (error) {
    console.log("Error in componentService getComponentList: ", error);
    throw error;
  }
}

function getComponentsByOwner() {
  // TODO: Replace this with user-specific component request
  return getComponentList();
}

async function getComponentsBySearchTerm(input) {
  const search = input.trim().toLowerCase();
  console.log(`getComponentsBySearchTerm(${search}`);

  try {
    const headers = authHeader();

    const response = await axios({
      method: "POST",
      url: `/api/components/search/${search}`,
      headers: headers,
    });

    return response?.data;
  } catch (error) {
    console.log("Error in componentService.getComponentsBySearchTerm: ", error);
    throw error;
  }
}

// GET request to /api/components/type/:id to get all components of one type
async function getComponentsByType(id) {
  console.log("Inside componentService.getComponentsByType, id: ", id);
  try {
    const requestOptions = {
      headers: authHeader(),
      username: authenticationService.currentUserValue.username,
    };
    const response = await axios.get(
      `/api/components/type/${id}`,
      requestOptions
    );

    console.log("Response in componentService getComponentsByType: ", response);
    return response?.data;
  } catch (error) {
    console.log("Error in componentService getComponentsByType: ", error);
    throw error;
  }
}

// GET request to /api/component-types to get a list of available component types
async function getComponentTypeList() {
  console.log("Inside componentService.getComponentTypeList");
  try {
    const requestOptions = {
      headers: authHeader(),
      username: authenticationService.currentUserValue.username,
    };
    const response = await axios.get("/api/component-types", requestOptions);

    console.log(
      "Response in componentService getComponentTypeList: ",
      response
    );
    return response?.data;
  } catch (error) {
    console.log("Error in componentService getComponentTypeList: ", error);
    throw error;
  }
}

// GET request to /api/component/:id/usage to get pages where a component is used
async function getComponentUsage(id) {
  console.log("Inside componentService.getComponentUsage, id: ", id);
  try {
    const requestOptions = {
      headers: authHeader(),
      username: authenticationService.currentUserValue.username,
    };
    const response = await axios.get(
      `/api/component/${id}/usage`,
      requestOptions
    );

    console.log("Response in componentService getComponentUsage: ", response);
    return response?.data;
  } catch (error) {
    console.log("Error in componentService getComponentUsage: ", error);
    throw error;
  }
}

// GET request to /api/contact-field-options to get a list of all available contact fields
async function getContactFieldOptions() {
  console.log("Inside componentService.getContactFieldOptions");
  try {
    const requestOptions = {
      headers: authHeader(),
      username: authenticationService.currentUserValue.username,
    };
    const response = await axios.get("/api/contact-field-options", requestOptions);

    console.log(
      "Response in componentService getContactFieldOptions: ",
      response
    );
    return response?.data;
  } catch (error) {
    console.log("Error in componentService getContactFieldOptions: ", error);
    throw error;
  }
}

async function getContactFieldTypeFromOption(optionId) {
  console.log(
    "Inside componentService.getContactFieldTypeFromOption with ID: ",
    optionId
  );
  try {
    const requestOptions = {
      headers: authHeader(),
      username: authenticationService.currentUserValue.username,
    };
    const response = await axios.get(
      `/api/contact-field-types/option/${optionId}`,
      requestOptions
    );

    console.log(
      "Response in componentService getContactFieldTypeFromOption: ",
      response
    );
    return response?.data[0];
  } catch (error) {
    console.log(
      "Error in componentService getContactFieldTypeFromOption: ",
      error
    );
    throw error;
  }
}

// GET request to /api/contact-field-types to get a list of available contact type fields
async function getContactFieldTypes() {
  console.log("Inside componentService.getContactFieldTypes");
  try {
    const requestOptions = {
      headers: authHeader(),
      username: authenticationService.currentUserValue.username,
    };
    const response = await axios.get(
      "/api/contact-field-types",
      requestOptions
    );

    console.log(
      "Response in componentService getContactFieldTypes: ",
      response
    );
    return response?.data;
  } catch (error) {
    console.log("Error in componentService getContactFieldTypes: ", error);
    throw error;
  }
}

export const componentService = {
  create,
  read,
  update,
  getComponentList,
  getComponentsByOwner,
  getComponentsBySearchTerm,
  getComponentsByType,
  getComponentTypeList,
  getComponentUsage,
  getContactFieldOptions,
  getContactFieldTypeFromOption,
  getContactFieldTypes,
};
