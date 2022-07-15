import React from 'react';
import { fireEvent, render, RenderResult, screen, waitFor } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import SortingSelect from '@modules/Home/components/sortingSelect';
import { SORT_BY } from '@constants/global.constants';

const middlewares = [];
const mockStore = configureStore(middlewares);

const renderComponent = (store): RenderResult => render(<Provider store={store}><SortingSelect /></Provider>);

describe('SortingSelect', () => {
  const store = mockStore({});
  beforeEach(() => {
    renderComponent(store);
  });

  it('should render SortingSelect', () => {
    const text = screen.getByTestId('sortByLabel');
    expect(text).toBeInTheDocument();
  });

  it('onChange SortingSelect', async () => {
    const value = 'snippet.title-asc';
    const selectEl = screen.getByPlaceholderText('Sort By');
    expect((selectEl as any).value).toBe(SORT_BY);
    await waitFor(() => fireEvent.change(selectEl, {
      target: { value },
    }));
    expect((selectEl as any).value).toBe(value);
  });

});
