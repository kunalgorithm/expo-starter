import useSWR from "swr";

const API_URL = "https://fullstack-twitter.onrender.com"; // TODO
export const fetcher = (url: string, data?: any): any =>
  fetch(API_URL + url, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  })
    .then((r) => r.json())
    .catch((error) => {
      console.error(error);
    });

export function useFeed() {
  const { data: feed }: { data?: any[] } = useSWR("/api/feed", fetcher);
  return { feed };
}
export function useUsers() {
  const { data: users }: { data?: any[] } = useSWR("/api/users", fetcher);
  return { users };
}
export function useMe() {
  const {
    data: me,
  }: {
    data?: any;
  } = useSWR("/api/me", fetcher, { refreshInterval: 1500 });
  return { me };
}
export function useUser(userId: number) {
  const {
    data: user,
  }: {
    data?: any;
  } = useSWR("/api/user", fetcher);
  return { user };
}
