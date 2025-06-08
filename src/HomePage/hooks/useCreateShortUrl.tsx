import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../lib/axiousClient";
import type { UrlMapping } from "../types/urlMapping";

const generateShortUrl = async (url: string): Promise<UrlMapping> => {
  const response = await axiosClient.post<UrlMapping>(
    "url/generate-short-url",
    {
      url: url,
    }
  );

  return response.data;
};

export function useCreateShortUrlMutation() {
  return useMutation({
    mutationFn: generateShortUrl,
  });
}
