import React from "react";
import {
  TextArea,
  TextInput,
  RadioButtonGroup,
  ImageInput,
  DateInput,
  SelectInput,
  SelectInputNormal,
} from "./useInput";
export interface Option {
  value: string;
  label: string;
}
export type FieldProps = {
  id: string;
  name: string;
  title: string;
  type: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  value: string;
  options?: Option[] | any;
  setFieldValue?:any;
  error?: string;
};


export type TextInputProps = {
  fields?: FieldProps | FieldProps[] | any;
  field?: FieldProps | FieldProps[] | any;
  touched?: boolean;
  error?: string | undefined;
  options?: Option[] | any;
  formik?:any;
};
const FieldGroup: React.FC<TextInputProps> = ({ fields, formik, options }) => {
  return (
    <>
      {fields.map((field : any) => {
        switch (field.type) {
          case "textarea":
            return (
              <TextArea
                key={field.id}
                field={{
                  ...field,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  value: formik.values[field.name],
                }}
                touched={formik.touched[field.name]}
                error={formik.errors[field.name]}
              />
            );
          case "radio":
            return (
              <RadioButtonGroup
                key={field.id}
                field={{
                  ...field,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  value: formik.values[field.name],
                }}
                touched={formik.touched[field.name]}
                error={formik.errors[field.name]}
              />
            );
          case "file":
            return (
              <ImageInput
                key={field.id}
                field={{
                  ...field,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  setFieldValue: formik.setFieldValue,
                }}
                touched={formik.touched[field.name]}
                error={formik.errors[field.name]}
              />
            );
          case "date":
            return (
              <DateInput
                key={field.id}
                field={{
                  ...field,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  value: formik.values[field.name],
                }}
                touched={formik.touched[field.name]}
                error={formik.errors[field.name]}
              />
            );
          case "select":
            return (
              <SelectInput
                key={field.id}
                field={{
                  ...field,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  value: formik.values[field.name],
                }}
                options={options[field.name ]}
                touched={formik.touched[field.name]}
                error={formik.errors[field.name]}
              />
            );
            case "Normal Select":
            return (
              <SelectInputNormal
                key={field.id}
                field={{
                  ...field,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  value: formik.values[field.name],
                }}
                touched={formik.touched[field.name]}
                error={formik.errors[field.name]}
              />
            );
          default:
            return (
              <TextInput
                key={field.id}
                field={{
                  ...field,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                  value: formik.values[field.name],
                }}
                touched={formik.touched[field.name]}
                error={formik.errors[field.name]}
              />
            );
        }
      })}
    </>
  );
};

export default FieldGroup;
