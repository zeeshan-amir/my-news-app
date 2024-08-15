import React from 'react';
import Select, {ActionMeta, MultiValue, SingleValue} from 'react-select';
import {Option} from '../../types';

interface CustomSelectProps {
  options: Option[];
  value?: SingleValue<Option> | MultiValue<Option> | null | undefined;
  onChange: (
    selectedOption: SingleValue<Option> | MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => void;
  placeholder?: string;
  isClearable?: boolean;
  isDisabled?: boolean;
  label?: string;
  className?: string;
  isMulti?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  isClearable = false,
  isDisabled = false,
  label,
  className = '',
  isMulti = false,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isMulti={isMulti}
      />
    </div>
  );
};

export default CustomSelect;
