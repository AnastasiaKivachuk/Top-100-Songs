import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { PATH_SIGN_IN } from '@constants/routes.constants';
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from '@helpers/localStorage.helpers';
import { ToastContainer } from 'react-toastify';
import SignInSignUp from './index';

const request = jest.fn();

const renderComponent = (props: | {
  title?: string
  addedLink?: { text: string, link: string },
  isSignIn?: boolean
}): RenderResult => render(
  <><SignInSignUp request={request} {...props} />
    <ToastContainer
      position="top-right"
      autoClose={3500}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
    />
  </>,
);

describe('SignInSignUp Component with default props', () => {
  beforeEach(() => {
    removeLocalStorageItem('userData');
    renderComponent({});
  });

  it('should render SignInSignUp with default props', () => {
    expect(screen.getAllByText('Sign In')).toHaveLength(2);
  });

  it('onValueChange should change value in email field', () => {
    const value = 'a@gmail.com';
    const inputEl = screen.getByPlaceholderText('example.email@gmail.com');
    expect((inputEl as HTMLInputElement).value).toBe('');
    fireEvent.change(inputEl, { target: { value }, name: 'email' });
    expect((inputEl as HTMLInputElement).value).toBe(value);
  });

  it('onChecked should change value in checkbox', () => {
    const value = true;
    const checkboxEl = screen.getByRole('checkbox');
    expect((checkboxEl as HTMLInputElement).value).toBe('false');
    fireEvent.click(checkboxEl);
    expect((checkboxEl as HTMLInputElement).checked).toBe(value);
  });

  it('check onSubmit with no remember userReducer', async () => {
    const email = 'a@gmail.com';
    const password = 'qwerty123';
    const inputElEmail = screen.getByPlaceholderText('example.email@gmail.com');
    fireEvent.change(inputElEmail, { target: { value: email }, name: 'email' });
    const inputElPassword = screen.getByPlaceholderText('******');
    fireEvent.change(inputElPassword, { target: { value: password }, name: 'password' });
    const btn = screen.getByTestId('btn');
    fireEvent.click(btn);
    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
    const res = getLocalStorageItem('userData');
    expect(res).toBe(null);
  });

  it('check onSubmit with remember userReducer', async () => {
    const email = 'a@gmail.com';
    const password = 'qwerty123';
    const inputElEmail = screen.getByPlaceholderText('example.email@gmail.com');
    fireEvent.change(inputElEmail, { target: { value: email }, name: 'email' });
    const inputElPassword = screen.getByPlaceholderText('******');
    fireEvent.change(inputElPassword, { target: { value: password }, name: 'password' });
    const inputElCheckbox = screen.getByRole('checkbox');
    fireEvent.click(inputElCheckbox);
    const btn = screen.getByTestId('btn');
    fireEvent.click(btn);

    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();

    const res = getLocalStorageItem('userData');
    expect(res).toBe(JSON.stringify({ email, password, isRemember: true }));
  });

});

describe('SignInSignUp Component init', () => {

  const email = 'a@gmail.com';
  const password = 'qwerty123';
  beforeEach(() => {
    setLocalStorageItem('userData', JSON.stringify({ email, password }));
    renderComponent({});
  });

  it('check init ', () => {
    const inputElEmail = screen.getByPlaceholderText('example.email@gmail.com');
    const inputElPassword = screen.getByPlaceholderText('******');
    expect((inputElEmail as HTMLInputElement).value).toBe(email || '');
    expect((inputElPassword as HTMLInputElement).value).toBe(password || '');
  });
});

describe('SignInSignUp Component with props', () => {
  beforeEach(() => {
    const props = {
      title: 'Sign Up',
      addedLink: { text: 'Already have an account? Sign in', link: PATH_SIGN_IN },
      isSignIn: false,
    };
    renderComponent(props);
  });

  it('should render SignInSignUp with props', () => {
    expect(screen.getAllByText('Sign Up')).toHaveLength(2);
  });

});
