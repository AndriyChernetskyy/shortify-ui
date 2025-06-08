import { useMutation } from "@tanstack/react-query";
import axiosClient from "../../lib/axiousClient";

const fetchFullUrl = async (shortLink: string): Promise<string> => {
  const response = await axiosClient.get<string>(`url/full-url/${shortLink}`);
  return response.data;
};

export function useNavigateToShortLinkMutation() {
  return useMutation({
    mutationFn: fetchFullUrl,
  });
}
