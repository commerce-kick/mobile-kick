import { LucideIcon, LucideProps } from "lucide-react-native";
import { withUniwind } from "uniwind";
import { cn } from "~/lib/utils";

type IconProps = LucideProps & {
  as: LucideIcon;
};

function IconImpl({ as: IconComponent, ...props }: IconProps) {
  return <IconComponent {...props} />;
}

const StyledIcon = withUniwind(IconImpl, {
  width: {
    fromClassName: "className",
    styleProperty: "width",
  },
  height: {
    fromClassName: "className",
    styleProperty: "height",
  },
  color: {
    fromClassName: "className",
    styleProperty: "color",
  },
  fill: {
    fromClassName: "className",
    styleProperty: "fill",
  },
});

export default function Icon({
  as: IconComponent,
  size = 16,
  className,
  ...props
}: IconProps) {
  return (
    <StyledIcon
      as={IconComponent}
      className={cn("text-foreground size-5 fill-transparent", className)}
      size={size}
      {...props}
    />
  );
}
