// import React from 'react';
// import Select, { components } from 'react-select';

// const CustomOption = (props: any) => {
//   return (
//     <components.Option {...props}>
//       <input
//         type="checkbox"
//         name="select"
//         checked={props.isSelected}
//         onChange={() => null}
//       />{' '}
//       <label>{props.label}</label>
//     </components.Option>
//   );
// };

// interface MultiSelectCheckboxProps {
//   options: { value: string; label: string }[];
//   selectedValue?: { value: any; label: string }[];
//   onChangeFn: (selectedOptions: any) => void;
//   isDisabledSelect?: boolean;
//   isSelectMultiselect?: boolean;
// }

// const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({ options, onChangeFn, selectedValue,isDisabledSelect, isSelectMultiselect = false  }) => {
//   const customStyles = {
//     control: (base: any) => ({
//       ...base,
//       borderColor: '#ced4da',
//       '&:hover': {
//         borderColor: '#a6a6a6',
//       },
//     }),
//   };

//   if(isSelectMultiselect){
//     return (
//       <Select 
//         options={options}
//         components={{ Option: CustomOption }}
//         isMulti
//         closeMenuOnSelect={false}
//         hideSelectedOptions={false}
//         styles={customStyles}
//         onChange={onChangeFn}
//         value={selectedValue}
//         isDisabled={isDisabledSelect} 
//       />
//     );
//   }else{
//     return (
//       <Select 
//         options={options}
//         closeMenuOnSelect={true}
//         hideSelectedOptions={false}
//         styles={customStyles}
//         onChange={onChangeFn}
//         value={selectedValue}
//         isDisabled={isDisabledSelect} 
//       />
//     );
//   }
  
// };

// export default MultiSelectCheckbox;


import React, { useRef } from 'react';
import Select, { components } from 'react-select';

const CustomOption = (props: any) => {
  return (
    <components.Option {...props}>
      <input
        type="checkbox"
        name="select"
        checked={props.isSelected}
        onChange={() => null}
      />{' '}
      <label>{props.label}</label>
    </components.Option>
  );
};

interface MultiSelectCheckboxProps {
  options: { value: string; label: string }[];
  selectedValue?: { value: any; label: string }[];
  onChangeFn: (selectedOptions: any) => void;
  isDisabledSelect?: boolean;
  isSelectMultiselect?: boolean;
}

const MultiSelectCheckbox: React.FC<MultiSelectCheckboxProps> = ({ options, onChangeFn, selectedValue, isDisabledSelect, isSelectMultiselect = false }) => {
  const emailInputRef = useRef<HTMLInputElement>(null);

  const customStyles = {
    control: (base: any) => ({
      ...base,
      borderColor: '#ced4da',
      '&:hover': {
        borderColor: '#a6a6a6',
      },
    }),
  };

  const handleChange = (selectedOptions: any) => {
    onChangeFn(selectedOptions);
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  };

  return (
    <div>
      {isSelectMultiselect ? (
        <Select 
          options={options}
          components={{ Option: CustomOption }}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          styles={customStyles}
          onChange={handleChange}
          value={selectedValue}
          isDisabled={isDisabledSelect} 
        />
      ) : (
        <Select 
          options={options}
          closeMenuOnSelect={true}
          hideSelectedOptions={false}
          styles={customStyles}
          onChange={handleChange}
          value={selectedValue}
          isDisabled={isDisabledSelect} 
        />
      )}
      <input
        type="email"
        ref={emailInputRef}
        placeholder="Enter your email"
        className='InputHidden'
      />
    </div>
  );
};

export default MultiSelectCheckbox;

