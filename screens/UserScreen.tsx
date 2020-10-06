import * as React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { fetcher, useUser } from "../hooks/fetcher";
import { Profile } from "../components/Profile";

export default function UserScreen({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "UserProfile"> & {
  route: { params: { userId: number } };
}) {
  const { userId } = route.params;
  const [user, setUser] = React.useState(undefined);
  React.useEffect(() => {
    const { user } = fetcher("/api/user", {
      id: userId,
    }).then((user: any) => {
      setUser(user);
    });
  }, []);

  return <Profile user={user} />;
}
