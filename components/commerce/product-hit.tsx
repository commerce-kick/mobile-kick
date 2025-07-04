import currency from "currency.js";
import { useState } from "react";
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import Icon from "~/components/icon";
import Image from "~/components/image";
import { Button } from "~/components/ui/button";
import { H4, Muted } from "~/components/ui/typography";
import { normalizeProduct, ProductLike } from "~/lib/commerce/utils";
import { cn } from "~/lib/utils";

interface ProductCardProps extends TouchableOpacityProps {
  product: ProductLike;
  onWishListToggle?: (productId: string) => void;
  isFavorite?: boolean;
  showDescription?: boolean;
  showWishList?: boolean;
  className?: string;
}

export default function ProductHit({
  product,
  className,
  isFavorite,
  onWishListToggle,
  showWishList = false,
  ...rest
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(isFavorite);

  // Normalize the product data
  const normalizedProduct = normalizeProduct(product);

  // Get the primary image with fallback
  const primaryImage = normalizedProduct.image;

  const handleWishlistToggle = (e: GestureResponderEvent) => {
    e.preventDefault();
    e.stopPropagation();

    onWishListToggle?.(normalizedProduct.id);
    setIsWishlisted(!isWishlisted);
  };

  return (
    <TouchableOpacity {...rest} className={cn("mr-4 w-48 gap-2", className)}>
      <View className="relative">
        {primaryImage ? (
          <Image
            source={primaryImage}
            className="aspect-[8/11] w-full rounded-md border border-zinc-300/20 dark:border-white/20"
          />
        ) : (
          <View className="aspect-[8/11] w-full rounded-md bg-slate-300" />
        )}

        {showWishList && (
          <Button
            size="icon"
            onPress={handleWishlistToggle}
            className="absolute right-4 top-4"
          >
            <Icon
              name={isWishlisted ? "heart" : "heart-outline"}
              className="text-destructive"
            />
          </Button>
        )}
      </View>

      <View className="w-full">
        <H4 numberOfLines={1} className="font-semibold">
          {normalizedProduct.name}
        </H4>
        <Muted numberOfLines={1}>
          {currency(normalizedProduct.price || 0).format()}
        </Muted>
      </View>
    </TouchableOpacity>
  );
}
