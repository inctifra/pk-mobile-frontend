import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabsLayout(){
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({color, size})=>(
                <AntDesign name="home" size={size} color={color} />
            ) }} />
            <Tabs.Screen name="search" options={{ title: "Verify Professional", tabBarIcon: ({color, size})=>(
                <AntDesign name="search1" size={size} color={color} />
            ) }} />
            <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({color, size})=>(
                <AntDesign name="user" size={size} color={color} />
            ) }} />
        </Tabs>
    );
}
