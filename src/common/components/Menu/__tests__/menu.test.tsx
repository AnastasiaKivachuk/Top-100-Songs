import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import PersonIcon from '@mui/icons-material/Person';
import { AppBar } from '../index';

const menuItems = [
  {
    name: 'Profile',
    onClick: () => null,
    icon: <PersonIcon />,
  },
];

describe('AppBar with fulfilled props', () => {
  const email = 'example@example.com';
  const displayName = 'displayName';
  const avatar = 'http://localhost/images/500.svg';
  beforeEach(() => render(<AppBar email={email} menuItems={menuItems} avatar={avatar} displayName={displayName} />));

  it('should display AppBar header with user', async () => {
    const topText = await screen.findByTestId('link');
    expect(topText).toBeInTheDocument();
    expect(screen.getByText(email)).toBeInTheDocument();
    expect(screen.queryByTestId('avatar')).toBeTruthy();
    expect(screen.queryByText(displayName)).toBeInTheDocument();
    expect(screen.queryByRole('img').src).toEqual(avatar);
  });

  it('should display menu by click and hide by second click', () => {
    const avatarEl = screen.queryByTestId('avatar');
    fireEvent.click(avatarEl);
    const menu = screen.queryByTestId('menu');
    expect(menu).toBeInTheDocument();
  });
});

describe('AppBar with half of fulfilled props', () => {
  const email = 'example@example.com';
  beforeEach(() => render(<AppBar email={email} menuItems={menuItems} avatar="" displayName="" />));

  it('should display AppBar header with user', async () => {
    const topText = await screen.findByTestId('link');
    expect(topText).toBeInTheDocument();
    expect(screen.getByText(email)).toBeInTheDocument();
    expect(screen.queryByTestId('avatar')).toBeTruthy();
    expect(screen.queryByRole('img').src).toEqual('http://localhost/static/images/avatar/2.jpg');
  });

  it('should display menu by click and hide by second click', () => {
    const avatar = screen.queryByTestId('avatar');
    fireEvent.click(avatar);
    const menu = screen.queryByTestId('menu');
    expect(menu).toBeInTheDocument();
  });
});

describe('AppBar with empty props', () => {
  beforeEach(() => render(<AppBar menuItems={menuItems} email="" avatar="" displayName="" />));
  it('should display Menu header without user', () => {
    expect(screen.queryByText('Sign out')).toBeFalsy();
  });
});
