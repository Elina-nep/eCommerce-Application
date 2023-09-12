import type { PreloadedState } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { reducer, StoreType } from '../src/store';
import { defaultCart } from '../src/util';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<StoreType>;
  store?: ToolkitStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      ifAuth: {
        ifAuth: false,
      },
      cart: {
        cart: defaultCart,
      },
      categories: {
        categories: [],
      },
      alertMessage: {
        alertMessage: '',
      },
    },

    store = configureStore({
      reducer: reducer,
      preloadedState,
    }),
  }: ExtendedRenderOptions = {},
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper }) };
}
