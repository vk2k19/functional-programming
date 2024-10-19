import { ChangeEventHandler, ForwardedRef, forwardRef } from "react";

export type Option = {
  id: string;
  value: string;
  label: string;
};

export const Select = forwardRef(
  (
    {
      label,
      required = undefined,
      name,
      options,
      value,
      ...others
    }: {
      label: string;
      required?: boolean;
      name: string;
      value?: string;
      options: Option[];
      onChange?: ChangeEventHandler<HTMLSelectElement>;
    },
    ref: ForwardedRef<HTMLSelectElement>
  ) => (
    <label className="f f-wrap gap mw-content">
      <span>
        {label}:{required && <sup>*</sup>}
      </span>
      <select
        ref={ref}
        className="w-160"
        required={required}
        name={name}
        {...others}
      >
        {options.map((option: Option) => (
          <option value={option.value} key={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
);
