import React from 'react'
import { MainPage } from './pages';
import { ModalContextProvider } from './contexts';
import { ModalMiddleware } from './middlewares';
import { Provider } from 'react-redux';
import { store } from './services/store';


export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ModalContextProvider>
        <ModalMiddleware>
          <MainPage />
        </ModalMiddleware>
      </ModalContextProvider>
    </Provider>
  )
}
