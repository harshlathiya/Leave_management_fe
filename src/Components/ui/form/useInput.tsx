import React from "react";
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
  field: FieldProps;
  touched?: boolean;
  error?: string | undefined;
  options?: Option[] | any;
  
};
const TextInput: React.FC<TextInputProps> =({ field, touched, error }) =>{
  const { id, name, title, type, onChange, onBlur, value } = field;

  return (
    <>
      <div className="mb-4">
        <label
          htmlFor={id}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {title}
        </label>
        <input
          type={type}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={id}
          name={name}
          placeholder={`Please Enter ${title}`}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />
        {touched && error ? (
          <div className="text-red-500 text-xs italic">{error}</div>
        ) : null}
      </div>
    </>
  );
}

const TextArea: React.FC<TextInputProps> =({ field, touched, error }) =>{
  const { id, name, title, onChange, onBlur, value } = field;

  return (
    <>
      <div className="mb-4">
        <label
          htmlFor={id}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {title}
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={id}
          name={name}
          placeholder={`Please enter ${title}`}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        ></textarea>
        {touched && error ? (
          <div className="text-red-500 text-xs italic">{error}</div>
        ) : null}
      </div>
    </>
  );
}

const RadioButtonGroup: React.FC<TextInputProps> =({ field, touched, error }) =>{
  const { id, name, title, options, onChange, onBlur, value } = field;

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {title}
      </label>
      {options.map((option:Option) => (
        <label key={option.value} className="inline-flex items-center mr-4">
          <input
            type="radio"
            id={id}
            name={name}
            value={option.value}
            onChange={onChange}
            onBlur={onBlur}
            checked={value === option.value}
            className="form-radio"
          />
          <span className="ml-2">{option.label}</span>
        </label>
      ))}
      {touched && error ? (
        <div className="text-red-500 text-xs italic">{error}</div>
      ) : null}
    </div>
  );
};

const ImageInput: React.FC<TextInputProps> =({ field, touched, error }) =>{
  const { id, name, title, onChange, onBlur } = field;

  const handleChange = (event:any) => {
    onChange(event); 
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      field.setFieldValue(name, file);
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {title}
      </label>
      <input
        type="file"
        id={id}
        name={name}
        onChange={handleChange}
        onBlur={onBlur}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        accept="image/*"
      />
      {touched && error ? (
        <div className="text-red-500 text-xs italic">{error}</div>
      ) : null}
    </div>
  );
};
const DateInput: React.FC<TextInputProps> =({ field, touched, error }) =>{
  const { id, name, title, onChange, onBlur, value } = field;

  const today = new Date();
  today.setDate(today.getDate());
  const nextDay = today.toISOString().split("T")[0]; 

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {title}
      </label>
      <input
        type="date"
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        min={nextDay} // Set minimum date to next day
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {touched && error ? (
        <div className="text-red-500 text-xs italic">{error}</div>
      ) : null}
    </div>
  );
};

const SelectInput: React.FC<TextInputProps>  = ({ field, touched, error , options}) => {
  const { id, name, title, onChange, onBlur, value } = field;

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {title}
      </label>
      <select
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option className="hidden" value="" selected>Select {title}</option>
        {options.map((option:Option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {touched && error ? (
        <div className="text-red-500 text-xs italic">{error}</div>
      ) : null}
    </div>
  );
};

const SelectInputNormal: React.FC<TextInputProps>  = ({ field, touched, error  }) => {
  const { id, name, title, onChange, onBlur, value , options} = field;

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {title}
      </label>
      <select
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Select {title}</option>
        {options.map((option:Option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {touched && error ? (
        <div className="text-red-500 text-xs italic">{error}</div>
      ) : null}
    </div>
  );
};

export { TextInput, TextArea, RadioButtonGroup, ImageInput , DateInput , SelectInput , SelectInputNormal};
