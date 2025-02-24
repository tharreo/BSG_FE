import { DatePicker } from '@mui/x-date-pickers';
import { FormLabel, OutlinedInputProps } from '@mui/material';
import { ReactNode } from 'react';
import { STYLE_VARIABLE } from '../constants/style-variable.ts';

export function InputDatePicker(props: IProps) {
  return (
    <div className="w-full">
      {props.label && (
        <FormLabel htmlFor={props.name}>
          <div className={`${props.errorMessage ? 'text-red-500' : ''} pb-1`}>
            {props.label} {props.required && <span className="text-red-600"> *</span>}
          </div>
        </FormLabel>
      )}
      <DatePicker
        value={props.value}
        onChange={(newValue) => {
          if (props.onChange) {
            props.onChange({
              target: { name: props.name, value: newValue },
            } as any); // Cast needed due to the MUI DatePicker typing
          }
        }}
        slotProps={{
          textField: {
            size: 'small',
            name: props.name,
            id: props.name,
            autoComplete: props.autocomplete,
            required: props.required,
            onBlur: props.onBlur,
            placeholder: props.placeholder,
            helperText: props.errorMessage,
            error: !!props.errorMessage,
            sx: {
              width: '100%',
              '& .MuiInputBase-root': {
                background: props.errorMessage
                  ? STYLE_VARIABLE.COLORS.SYSTEM.LIGHT_RED
                  : STYLE_VARIABLE.COLORS.SYSTEM.WHITE,
              },
            },
          },
        }}
      />
    </div>
  );
}

interface IProps {
  className?: string;
  label?: string;
  placeholder?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  name?: string;
  onChange?: (event: { target: { name?: string; value: any } }) => void;
  onBlur?: OutlinedInputProps['onBlur'];
  value?: any;
  required?: boolean;
  errorMessage?: any;
  autocomplete?: string;
}
