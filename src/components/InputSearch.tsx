import { CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { STYLE_VARIABLE } from '../constants/style-variable.ts';
import { MdClose, MdSearch } from 'react-icons/md';

export function InputSearch(props: IProps) {
  function onSubmitSearch() {
    if (props.onSubmit) {
      props.onSubmit();
    }
  }

  function onEnter(event: React.KeyboardEvent<HTMLDivElement>) {
    if (props.onSubmit) {
      if (event.key === 'Enter') {
        event.preventDefault();
        props.onSubmit();
      }
    }
  }

  function onReset() {
    if (props.onResetSearch) {
      props.onResetSearch();
    }
  }
  return (
    <div>
      <TextField
        value={props.value}
        onKeyDown={onEnter}
        onChange={(e) => props.onChange && props.onChange(e.target?.value)}
        sx={{ borderRadius: 9999, minWidth: 300, width: props.fullWidth ? '100%' : undefined }}
        placeholder={props.placeholder || ''}
        InputProps={{
          sx: {
            borderRadius: 9999,
            pl: 4,
            background: STYLE_VARIABLE.COLORS.SYSTEM.WHITE,
          },
          endAdornment: (
            <InputAdornment position="end">
              <div className={`${props.loading ? ' ' : 'bg-primary-main '} rounded-full`}>
                {props.loading ? (
                  <CircularProgress size={24} />
                ) : (
                  <IconButton
                    color={'default'}
                    sx={{ height: 30, width: 30 }}
                    onClick={props.isActiveSearch ? onReset : onSubmitSearch}
                  >
                    {props?.isActiveSearch ? (
                      <MdClose style={{ color: STYLE_VARIABLE.COLORS.SYSTEM.WHITE }} fontSize={'small'} />
                    ) : (
                      <MdSearch style={{ color: STYLE_VARIABLE.COLORS.SYSTEM.WHITE }} />
                    )}
                  </IconButton>
                )}
              </div>
            </InputAdornment>
          ),
        }}
        size={'small'}
      />
    </div>
  );
}

interface IProps {
  isActiveSearch?: boolean;
  onResetSearch?: () => void;
  onSubmit?: () => void;
  onChange?: (e: string) => void;
  value?: string;
  placeholder?: string;
  loading?: boolean;
  fullWidth?: boolean;
}
