import { Ionicons } from "@expo/vector-icons";
import { ComponentPropsWithoutRef } from "react";
import { withUniwind } from "uniwind";
import { cn } from "~/lib/utils";

const StyledIcon = withUniwind(Ionicons);

export default function Icon({
  size = 18,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof StyledIcon>) {
  return (
    <StyledIcon
      className={cn("text-foreground", className)}
      size={size}
      {...props}
    />
  );
}
