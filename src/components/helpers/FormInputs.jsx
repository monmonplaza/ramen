import { useField } from "formik";
import { Check } from "lucide-react";
import React from "react";
import { NumericFormat } from "react-number-format";

export const InputTextArea = ({
  label,
  required = true,
  onChange = null,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea
        className={meta.touched && meta.error ? "error-show" : null}
        {...field}
        {...props}
        autoComplete="off"
        onChange={(e) => {
          onChange !== null && onChange(e);
          field.onChange(e);
        }}
      ></textarea>
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputText = ({
  label = "",
  required = true,
  className = "",
  onChange = null,
  refVal = null,
  ...props
}) => {
  const [field, meta] = useField(props);

  if (props.number === "number") {
    return (
      <>
        {label !== "" && (
          <label htmlFor={props.id || props.name}>{label}</label>
        )}
        <NumericFormat
          {...field}
          {...props}
          allowLeadingZeros
          autoComplete="off"
          className={`${
            meta.touched && meta.error ? "error-show" : null
          }  ${className}`}
          onChange={(e) => {
            onChange !== null && onChange(e);
            field.onChange(e);
          }}
        />

        {meta.touched && meta.error ? (
          <span className={`error-show`}>{meta.error}</span>
        ) : null}
      </>
    );
  }

  return (
    <>
      {label !== "" && <label htmlFor={props.id || props.name}>{label}</label>}
      <input
        {...field}
        {...props}
        className={meta.touched && meta.error ? `error-show ` : className}
        onChange={(e) => {
          onChange !== null && onChange(e);
          field.onChange(e);
        }}
        autoComplete="off"
        ref={refVal}
      />

      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputSelect = ({
  label,
  required = true,
  onChange = null,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>

      <select
        {...field}
        {...props}
        className={meta.touched && meta.error ? "error-show" : null}
        onChange={(e) => {
          onChange !== null && onChange(e);
          field.onChange(e);
        }}
        autoComplete="off"
      />

      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputPhotoUpload = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
};

export const InputFileUpload = React.forwardRef(({ label, ...props }, ref) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input {...field} {...props} ref={ref} />
      {meta.touched && meta.error ? (
        <span className="error-show">{meta.error}</span>
      ) : null}
    </>
  );
});

export const InputCheckbox = ({ label, onChange = null, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="flex items-center gap-2 mb-5">
        <span className="relative flex cursor-pointer items-center justify-center rounded-full">
          <input
            {...field}
            {...props}
            className={
              meta.touched && meta.error
                ? "w-auto h-auto error-show"
                : "p-2 before:content-[''] peer relative h-auto w-auto cursor-pointer border border-gray-200 appearance-none rounded-sm transition-all   checked:border-accent bg-gray-100  bg-opacity-10"
            }
            onChange={(e) => {
              onChange !== null && onChange(e);
              field.onChange(e);
            }}
          />
          <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 opacity-0  transition-opacity peer-checked:opacity-100 peer-checked:text-accent ">
            <Check className="h-4 w-4" />
          </span>
        </span>

        <label
          htmlFor={props.id || props.name}
          className="cursor-pointer  m-0  "
        >
          {label}
        </label>
      </div>
    </>
  );
};
