import { authenticationService } from "../_services";

// Return an Authorization header with JWT token in OAuth2 format
export function authHeader() {
  const currentUser = authenticationService.currentUserValue;

  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  } else {
    return {};
  }
}
