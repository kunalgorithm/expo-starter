import * as React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { useMe } from "../hooks/fetcher";
import { Profile } from "../components/Profile";

export default function UserScreen({
  navigation,
}: StackScreenProps<RootStackParamList, "UserProfile">) {
  const { me } = useMe();

  return <Profile user={me} />;
}
