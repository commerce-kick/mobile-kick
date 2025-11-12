
import { cva, type VariantProps } from "class-variance-authority";
import { Pressable } from "react-native";
import { TextClassContext } from "~/components/ui/text";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
  cn(
    "group shrink-0 flex-row items-center justify-center gap-2 rounded-full shadow-none"
  ),
  {
    variants: {
      variant: {
        default: cn("bg-primary active:bg-primary/90 "),
        destructive: cn(
          "bg-destructive active:bg-destructive/90 dark:bg-destructive/60 "
        ),
        outline: cn(
          "border-border bg-background active:bg-accent dark:bg-input/30 dark:border-input dark:active:bg-input/50 border "
        ),
        secondary: cn("bg-secondary active:bg-secondary/80 "),
        ghost: cn("active:bg-accent dark:active:bg-accent/50"),
        link: "",
      },
      size: {
        default: cn("h-10 px-4 py-2 sm:h-9"),
        xs: "h-8 w-8 rounded-lg",
        sm: cn("h-9 gap-1.5 rounded-md px-3 sm:h-8"),
        lg: cn("h-11  px-6 sm:h-10"),
        icon: "h-10 w-10 sm:h-9 sm:w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva(cn("text-foreground text-sm font-medium"), {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-white",
      outline: cn("group-active:text-accent-foreground"),
      secondary: "text-secondary-foreground",
      ghost: "group-active:text-accent-foreground",
      link: cn("text-primary group-active:underline"),
    },
    size: {
      default: "",
      xs: "",
      sm: "",
      lg: "",
      icon: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        className={cn(
          props.disabled && "opacity-50",
          buttonVariants({ variant, size }),
          className
        )}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };

