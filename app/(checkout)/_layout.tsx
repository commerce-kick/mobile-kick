import { useHeaderHeight } from "@react-navigation/elements";
import { Tabs } from "expo-router";
import {
  CreditCard,
  Home,
  ReceiptIcon,
  Rocket,
  User
} from "lucide-react-native";
import { useWindowDimensions, View } from "react-native";
import Icon from "~/components/ui/icon";

export default function CheckoutLayout() {
  const { width, height } = useWindowDimensions();
  const h = useHeaderHeight();

  return (
    <View style={{ width, height: height - h }}>
      <Tabs
        screenListeners={{
          tabPress: (e) => {
            e.preventDefault();
            return;
          },
        }}
      >
        <Tabs.Screen
          name="customer"
          options={{
            tabBarIcon: ({ focused }) => <Icon as={User} />,
          }}
        />
        <Tabs.Screen
          name="address"
          options={{
            tabBarIcon: ({ focused }) => <Icon as={Home} />,
          }}
        />
        <Tabs.Screen
          name="shipping"
          options={{
            tabBarIcon: ({ focused }) => <Icon as={Rocket} />,
          }}
        />
        <Tabs.Screen
          name="payment"
          options={{
            tabBarIcon: ({ focused }) => <Icon as={CreditCard} />,
          }}
        />
        <Tabs.Screen
          name="review"
          options={{
            tabBarIcon: ({ focused }) => <Icon as={ReceiptIcon} />,
          }}
        />
      </Tabs>
    </View>
  );
}
