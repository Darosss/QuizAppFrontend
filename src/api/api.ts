import axios, {AxiosError} from "axios";
import {useEffect, useState} from "react";
import {ErrorDisplay, Loading} from "src/components/common";
import {BACKEND_URL} from "@env";
import {axiosErrorHandler} from "./helpers";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10020,
  headers: {"Content-Type": "application/json"},
  timeoutErrorMessage:
    "Oops! The request took too long to complete. Please check your internet connection and try again.",
});

type ApiDataType<Response> = {
  data: null | Response;
  ApiError: (() => React.JSX.Element) | null;
  Loading: (() => React.JSX.Element) | null;
};

/**
 * - loadingText - text for display when loading
 * - manual - whether api should be called manually
 */
type UseApiOptionalOptions = {
  loadingText?: string;
  manual?: boolean;
};

export const useApi = <Response>(
  url: string,
  method: "GET" | "POST",
  options?: UseApiOptionalOptions,
) => {
  const {loadingText = "Loading", manual = false} = options || {};

  const [apiData, setApiData] = useState<ApiDataType<Response>>({
    data: null,
    ApiError: null,
    Loading: () => Loading({description: loadingText}),
  });

  const fetchData = async (url: string) => {
    try {
      const response = await axiosInstance<Response>(url, {method});
      setApiData({data: response.data, ApiError: null, Loading: null});
    } catch (error) {
      let errorMessage = "";
      if (error instanceof AxiosError) {
        errorMessage = axiosErrorHandler(error);
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = "An unkown error occured. Please try again later.";
      }

      setApiData({
        data: null,
        ApiError: () =>
          ErrorDisplay({
            description: errorMessage,
            onTryAgain: () => fetchData(url),
          }),
        Loading: null,
      });
    }
  };

  useEffect(() => {
    !manual ? fetchData(url) : null;
  }, [url, manual]);

  return {apiData, fetchData};
};
