import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../lib/axiousClient";

const generateShortUrl = async (url: string) => {
  const response = await axiosClient.post("url/generate-short-url", {
    url: url,
  });

  return response.data;
};

export function useShortUrlGenerationMutation() {
  return useMutation({
    mutationFn: generateShortUrl,
  });
}
