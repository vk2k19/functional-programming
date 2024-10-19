import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export const Input = ({
  label,
  required,
  name,
  align = "right",
  ...others
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  align?: "right" | "left";
  label: string;
}) => (
  <label className="f f-wrap gap mw-content">
    <span className={`${align === "left" ? "" : "w-80 right"}`}>
      {label}:{required && <sup>*</sup>}
    </span>
    <input className="w-160" required={required} name={name} {...others} />
  </label>
);
