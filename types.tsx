export {
  Meditation,
  User,
  Like,
  Follow,
} from "./server/node_modules/@prisma/client";

// see https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/advanced-usage-of-generated-types

export type RootStackParamList = {
  Root: { screen?: string };
  FindFriends: undefined;
  Congrats: { duration: number };
  Journal: { meditation?: any; duration?: number };
  NotFound: undefined;
  Feed: undefined;
  Streaks: undefined;
  MyProfile: { userId?: number };
  UserProfile: { userId: number };
  EditProfile: { me: User };
  Onboarding_1: undefined;
  Onboarding_2: undefined;
  Onboarding_3: undefined;
  Onboarding_4: undefined;
  Onboarding_5: { name: string };
  Onboarding_6: undefined;
  Login: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Streaks: undefined;
  History: undefined;
};
