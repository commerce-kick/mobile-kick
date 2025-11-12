import { Image as ExImage } from "expo-image";
import { ComponentPropsWithoutRef } from "react";
import { withUniwind } from "uniwind";

const blurhash = "LKO2?U%2Tw=w]~RBVZRi};RPxuwH";

const StyledImage = withUniwind(ExImage);

export default function Image(
  props: ComponentPropsWithoutRef<typeof StyledImage>,
) {
  return (
    <StyledImage
      contentFit="cover"
      transition={400}
      placeholderContentFit="cover"
      placeholder={{ blurhash }}
      {...props}
    />
  );
}
