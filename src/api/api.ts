import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {ErrorDisplay, Loading} from "src/components/common";
import {BACKEND_URL} from "@env";
import {getApiErrorData} from "./helpers";

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10020,
  headers: {"Content-Type": "application/json"},
  timeoutErrorMessage:
    "Oops! The request took too long to complete. Please check your internet connection and try again.",
});

export const setAxiosDefaultHeaderAuthorization = (
  accessToken: string | null,
) => {
  axiosInstance.defaults.headers.common.Authorization = accessToken
    ? `Bearer ${accessToken}`
    : null;
};

type ApiDataType<Response> = {
  data: null | Response;
  ApiError: (() => React.JSX.Element) | null;
  Loading: (() => React.JSX.Element) | null;
};

/**
 * - loadingText - text for display when loading
 * - manual - whether api should be called manually
 */

type UseApiBaseOptions<BodyData> = {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  body?: BodyData;
};

type UseApiOptionalOptions = {
  loadingText?: string;
  manual?: boolean;
};

export const useApi = <Response, BodyData = unknown>(
  {url, method, body}: UseApiBaseOptions<BodyData>,
  options?: UseApiOptionalOptions,
) => {
  const {loadingText = "Loading", manual = false} = options || {};

  const [apiData, setApiData] = useState<ApiDataType<Response>>({
    data: null,
    ApiError: null,
    Loading: null,
  });

  const fetchData = async (url: string) => {
    try {
      const response = await axiosInstance<Response>(url, {method, data: body});
      setApiData({
        data: response.data,
        ApiError: null,
        Loading: () => Loading({description: loadingText}),
      });
    } catch (error) {
      const {message, statusCode} = getApiErrorData(error);

      setApiData({
        data: null,
        ApiError: () =>
          ErrorDisplay({
            description: message,
            statusCode,
            onTryAgain: () => fetchData(url),
          }),
        Loading: null,
      });
    } finally {
      setApiData(prevState => ({...prevState, Loading: null}));
    }
  };

  useEffect(() => {
    !manual ? fetchData(url) : null;
  }, [url, manual]);

  const refetchData = useCallback(
    async (customUrl?: string) => {
      fetchData(customUrl ? customUrl : url);
    },
    [fetchData, url],
  );

  return {apiData, refetchData};
};
