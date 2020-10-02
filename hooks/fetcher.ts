import {
  Meditation,
  User,
  Follow,
} from "../server/node_modules/@prisma/client";
import useSWR from "swr";

const API_URL = "https://mindstreaks-api.onrender.com";
export const fetcher = (url: string, data?: any): any =>
  fetch(API_URL + url, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : "",
  }).then((r) => r.json());

export function useFeed() {
  const { data: feed }: { data?: (Meditation & { user: User })[] } = useSWR(
    "/api/feed",
    fetcher
  );
  return { feed };
}
export function useMe() {
  const {
    data: me,
  }: {
    data?: User & {
      meditations: Meditation[];
      followers: Follow[];
      following: Follow[];
    };
  } = useSWR("/api/me", fetcher);
  return { me };
}
