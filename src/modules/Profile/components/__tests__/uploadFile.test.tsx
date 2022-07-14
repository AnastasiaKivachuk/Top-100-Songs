import React from 'react';
import { act, fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react';

import { UseFormSetError } from 'react-hook-form';
import UploadFile from '../uploadFile';

const setError = jest.fn();
const onFileUpload = jest.fn();

const renderComponent = (props: {
  onFileUpload: (val: string) => void,
  value: string, name: string, setError: UseFormSetError<Record<string, any>>,
}): RenderResult => render(
  <UploadFile {...props} />,
);

describe('UploadFile', () => {
  const name = 'file';
  const value = '';
  let file;

  beforeEach(() => {
    file = new File(['(⌐□_□)'], 'test.png', { type: 'image/png' });
    renderComponent({ setError, onFileUpload, name, value });
  });

  it('should render UploadFile', () => {
    expect(screen.getByTestId('label')).toBeInTheDocument();
    const inputEl = screen.getByTestId('uploadInput');
    expect((inputEl as HTMLInputElement).value).toBe(value);
  });

  it('handleClickOnAvatar', async () => {
    const inputEl = screen.getByTestId('uploadInput');
    await waitFor(() => fireEvent.change(inputEl, {
      target: { files: [file] },
    }));
    const loading = await screen.findByRole('progressbar');
    expect(loading).toBeInTheDocument();
    // eslint-disable-next-line no-promise-executor-return
    await act(async () => { await new Promise((r) => setTimeout(r, 2000)); });
    const loadingFalse = screen.queryByRole('progressbar');
    expect(loadingFalse).toBeFalsy();
    expect(setError).toBeCalled();
  });

});
