export {
  Meditation,
  User,
  Like,
  Follow,
} from "./server/node_modules/@prisma/client";

// see https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/advanced-usage-of-generated-types

export type RootStackParamList = {
  Root: undefined;
  FindFriends: undefined;
  Congrats: { duration: number };
  Journal: { meditation?: any; duration?: number };
  NotFound: undefined;
  Feed: undefined;
  Streaks: undefined;
  MyProfile: { userId?: number };
  UserProfile: { userId: number };
  EditProfile: { me: User };
};

export type BottomTabParamList = {
  Home: undefined;
  Streaks: undefined;
  History: undefined;
};
