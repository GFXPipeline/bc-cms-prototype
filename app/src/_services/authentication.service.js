import axios from "axios";
import { BehaviorSubject } from "rxjs";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

// Call authentication API and save user object in local storage
async function login(username, password) {
  try {
    const response = await axios.post("/api/users/authenticate", {
      username,
      password,
    });
    console.log("Response in authentication.service login: ", response);
    const user = response?.data;

    localStorage.setItem("currentUser", JSON.stringify(user));
    currentUserSubject.next(user);

    return response.data;
  } catch (error) {
    console.log("Error in authentication.service login: ", error);
    throw error;
  }
}

// Remove user object from local storage to log user out
function logout() {
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
};
