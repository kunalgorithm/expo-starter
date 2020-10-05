import {
  Meditation,
  User,
  Like,
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

export interface FeedMeditation extends Meditation {
  user: User;
  likes: (Like & { user: User })[];
}
export interface UserProfile extends User {
  meditations: Meditation[];
  followers: Follow[];
  following: Follow[];
}

export function useFeed() {
  const { data: feed }: { data?: FeedMeditation[] } = useSWR(
    "/api/feed",
    fetcher
  );
  return { feed };
}
export function useUsers() {
  const { data: users }: { data?: User[] } = useSWR("/api/users", fetcher);
  return { users };
}
export function useMe() {
  const {
    data: me,
  }: {
    data?: UserProfile;
  } = useSWR("/api/me", fetcher);
  return { me };
}
export function useUser(userId: number) {
  const {
    data: user,
  }: {
    data?: UserProfile;
  } = useSWR("/api/user", fetcher);
  return { user };
}
