import { Link } from "react-router-dom";

export const CustomLink = ({
  noExpandingBorder = false,
  className,
  ...others
}: any) => (
  <Link
    className={`${!noExpandingBorder ? "expand" : ""} ${className}`}
    {...others}
  />
);
