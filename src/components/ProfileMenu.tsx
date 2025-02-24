import React, { useEffect, useState } from 'react';
import AuthServices from '../service/auth-service.ts';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Button, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { CiLogout } from 'react-icons/ci';
import { useAppSelector } from '../redux/store.ts';
import { IResGetMe } from '../model/response/IResGetMe.ts';

export function ProfileMenu() {
  const Account = useAppSelector((state) => state.Account);
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [data, setData] = useState<IResGetMe | undefined>();
  const authService = new AuthServices();

  useEffect(() => {
    if (Account?.getMe?.data) {
      setData(Account?.getMe?.data);
    }
  }, [Account.getMe]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function onLogout() {
    authService.Logout().then();
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <div className="hidden lg:block">
          <Tooltip title="Account">
            <Button
              onClick={handleClick}
              color={'inherit'}
              size="large"
              endIcon={<Avatar sx={{ width: 32, height: 32 }} src={data?.avatar} />}
              variant={'text'}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <div className={'w-full flex items-center gap-2 px-4 py-1'}>
                <div className={'text-system-body'}>{data?.name || '-'}</div>
              </div>
            </Button>
          </Tooltip>
        </div>
        <div className="lg:hidden block">
          <IconButton onClick={handleClick}>
            <Avatar sx={{ width: 32, height: 32 }} src={data?.avatar} alt={data?.name} />
          </IconButton>
        </div>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        className={'menu-list-customs shadow-lg'}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <CiLogout fontSize="small" />
          </ListItemIcon>
          {t('logout')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
