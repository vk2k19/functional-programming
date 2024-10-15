import { ChangeEventHandler } from "react";

export const Input = ({
  label,
  required = undefined,
  name,
  ...others
}: {
  label: string;
  required?: boolean;
  type: "text" | "password" | "email" | "search";
  name: string;
  pattern?: string;
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) => (
  <label className="f f-wrap gap mw-content">
    <span className="w-80 right">
      {label}:{required && <sup>*</sup>}
    </span>
    <input className="w-160" required={required} name={name} {...others} />
  </label>
);
