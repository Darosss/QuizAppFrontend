import {AxiosError} from "axios";

export const axiosErrorHandler = ({response, message}: AxiosError) => {
  if (response) {
    return errorStatusHandler(response.status);
  } else {
    return message;
  }
};

const errorStatusHandler = (status: number) => {
  switch (status) {
    case 400:
      return "Bad Request: The server did not understand the request.";

    case 401:
      return "Unauthorized: Authentication is required to access the resource.";

    case 403:
      return "Forbidden: You do not have permission to access the resource.";

    case 404:
      return "Not Found: The requested resource could not be found on the server.";

    case 409:
      return "Conflict: The request could not be completed due to a conflict with the current state of the target resource.";

    case 429:
      return "Too Many Requests: The user has sent too many requests in a given amount of time.";

    case 500:
      return "Internal Server Error: The server encountered an unexpected condition.";

    case 502:
      return "Bad Gateway: The server, while acting as a gateway or proxy, received an invalid response from an inbound server.";

    case 503:
      return "Service Unavailable: The server is not ready to handle the request. Common causes include maintenance or temporary overloading of the server.";

    case 504:
      return "Gateway Timeout: The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server.";

    default:
      return `An unknown error occured`;
  }
};
