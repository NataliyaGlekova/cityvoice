import HomePage from "@/pages/home/HomePage";
import { ProfilePage } from "@/pages/profile";
import { View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1 }}>
      {/* <ProfilePage />;
       */}
      <HomePage />
    </View>
  );
}
