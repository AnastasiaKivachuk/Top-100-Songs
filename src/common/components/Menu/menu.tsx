import React from 'react';
import Link from 'next/link';

import Grid from '@mui/material/Grid';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Menu, MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import { PATH_INDEX } from '@constants/routes.constants';
import styles from './menu.module.scss';

type Props = {
  email: string,
  menuItems: {name: string, icon: JSX.Element, onClick: () => void}[]
  displayName: string
  avatar: string
}

function AppBar({ email, menuItems, displayName, avatar }: Props): JSX.Element {
  const [anchorElUser, setAnchorElUser] = React.useState<boolean>(false);

  const handleUserMenu = () => {
    setAnchorElUser((prevState) => !prevState);
  };

  return (
    <MuiAppBar className={styles.wrapper}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Link href={PATH_INDEX} color="inherit">
            <a className={styles.link} data-testid="link">
              <Typography variant="body1" className={styles.title}>Top songs
              </Typography>
            </a>
          </Link>
          {email && (
            <Box sx={{ flexGrow: 0 }}>
              <div className={styles.wrapEmail} onClick={handleUserMenu} role="presentation" data-testid="avatar">
                <Avatar src={avatar || '/static/images/avatar/2.jpg'} />
                <div>
                  {displayName && <p className={styles.email}>{displayName}</p>}
                  <p className={styles.email}>{email}</p>
                </div>
              </div>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleUserMenu}
                data-testid="menu"
              >
                {menuItems?.map((item) => (
                  <MenuItem key={item.name} onClick={() => { item.onClick(); handleUserMenu(); }} className={styles.wrapMenuItem}>
                    {item.icon} <Typography> {item.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Grid>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
