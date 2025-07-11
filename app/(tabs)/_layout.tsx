import { useQuery } from "@tanstack/react-query";
import { router, Tabs } from "expo-router";
import {
  Pressable
} from "react-native";
import Icon from "~/components/icon";
import { AuthTypes } from "~/integrations/salesforce/enums";
import { getBasketQueryOptions } from "~/integrations/salesforce/options/basket";
import { getCustomerQueryOptions } from "~/integrations/salesforce/options/customer";

/* Main Tabs */
export default function TabsLayout() {
  const { data: customer } = useQuery(getCustomerQueryOptions());
  const { data: basket } = useQuery(getBasketQueryOptions());

  return (
    <Tabs>
      <Tabs.Screen
        name="(drawer)"
        options={{
          headerShown: false,
          title: "(drawer)",
          tabBarIcon: ({ size, color, focused }) => (
            <Icon
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarButton: ({ onPress, ...props }) => {
            return (
              /* Reset the drawer */
              //@ts-ignore
              <Pressable
                onPress={() => {
                  router.replace("/");
                }}
                {...props}
              />
            );
          },
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ size, color, focused }) => (
            <Icon
              name={focused ? "search" : "search-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="wishlist"
        listeners={{
          tabPress: (e) => {
            if (customer?.authType !== AuthTypes.REGISTERED) {
              e.preventDefault();
              router.push("/login");
            }
          },
        }}
        options={{
          title: "Wislist",
          tabBarIcon: ({ size, color, focused }) => (
            <Icon
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ size, color, focused }) => (
            <Icon
              name={focused ? "basket" : "basket-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarBadge: basket?.productItems?.length || undefined,
        }}
      />

      <Tabs.Screen
        name="customer"
        redirect={customer?.authType !== AuthTypes.REGISTERED}
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color, focused }) => (
            <Icon
              name={focused ? "people" : "people-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="login"
        redirect={customer?.authType === AuthTypes.REGISTERED}
        options={{
          title: "Login",
          tabBarIcon: ({ size, color, focused }) => (
            <Icon
              name={focused ? "people" : "people-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
