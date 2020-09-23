import * as React from "react";
import { AsyncStorage } from "react-native";

export function useMeditations() {
  const [meditations, setMeditations] = React.useState<
    { date: string; duration: number }[]
  >([]);
  React.useEffect(() => {
    AsyncStorage.getItem("meditations").then(
      (data) => data && setMeditations(JSON.parse(data))
    );
  }, []);
  return meditations;
}
