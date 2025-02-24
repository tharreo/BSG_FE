import { FormLabel, InputAdornment, OutlinedInputProps, TextField } from '@mui/material';
import { HTMLInputTypeAttribute, ReactNode } from 'react';
import { STYLE_VARIABLE } from '../constants/style-variable.ts';

export function InputTextarea(props: IProps) {
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' && props.onEnter) {
      props.onEnter();
    }
  };
  return (
    <div>
      {props.label && (
        <FormLabel className="" htmlFor={props.name}>
          <div className={`${props.errorMessage && 'text-red-500'} pb-1 `}>
            {props.label} {props.required && <span className={'text-red-600'}> *</span>}
          </div>
        </FormLabel>
      )}
      <TextField
        multiline
        rows={5}
        onClick={props.onClick}
        className={props.className || ''}
        onKeyDown={handleKeyDown}
        size={'small'}
        type={props.type || 'text'}
        name={props.name}
        id={props.name}
        autoComplete={props.autocomplete}
        required={props.required}
        value={props.value}
        onBlur={props.onBlur}
        onChange={props.onChange}
        placeholder={props.placeholder}
        helperText={props.errorMessage}
        error={!!props.errorMessage}
        InputProps={{
          startAdornment: props.startIcon && <InputAdornment position="start">{props.startIcon}</InputAdornment>,
          endAdornment: props.endIcon && <InputAdornment position="start">{props.endIcon}</InputAdornment>,
        }}
        sx={{
          width: '100%',
          '& .MuiInputBase-root ': {
            background: props.errorMessage
              ? STYLE_VARIABLE.COLORS.SYSTEM.LIGHT_RED
              : STYLE_VARIABLE.COLORS.SYSTEM.WHITE,
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
  type?: HTMLInputTypeAttribute;
  name?: string;
  onChange?: OutlinedInputProps['onChange'];
  onBlur?: OutlinedInputProps['onBlur'];
  value?: any;
  required?: boolean;
  errorMessage?: any;
  onEnter?: () => void;
  autocomplete?: string;
  onClick?: () => void;
}
