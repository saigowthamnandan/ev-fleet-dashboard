"use client";
import React, { useEffect, useState } from "react";
import { IconVariants } from "@/app/utils/enums";

// Helper to get size based on variant or custom size
const getSize = (variant: IconVariants, custom?: number) => {
  if (custom) {
    return custom;
  }
  switch (variant) {
    case IconVariants.X_SMALL:
      return 12;
    case IconVariants.SMALL:
      return 16;
    case IconVariants.MEDIUM:
      return 20;
    case IconVariants.LARGE:
      return 24;
    case IconVariants.X_LARGE:
      return 28;
    case IconVariants.NONE:
      return 16;
    default:
      return 16;
  }
};

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string; // SVG file name, e.g. "github.svg"
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  variant?: IconVariants;
}

const SvgLoad = ({
  name,
  width,
  height,
  className,
  variant = width ? IconVariants.NONE : IconVariants.SMALL,
  alt,
  ...rest
}: IconProps) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;
    fetch(`/` + name + ".svg")
      .then((res) => res.text())
      .then((text) => setSvgContent(text))
      .catch(() => setSvgContent(null));
  }, [name]);

  // Render nothing until SVG is loaded
  if (!svgContent) return null;

  return (
    <svg
      width={getSize(variant, Number(width))}
      height={getSize(variant, Number(height))}
      className={className}
      aria-label={alt}
      viewBox="0 0 24 24"
      {...rest}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default SvgLoad;
