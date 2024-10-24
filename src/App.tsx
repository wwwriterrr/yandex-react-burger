import React from 'react'
import { MainPage } from './pages';
import { ModalContextProvider } from './contexts';
import { ModalMiddleware } from './middlewares';


export const App: React.FC = () => {
  return (
    <>
      <ModalContextProvider>
        <ModalMiddleware>
          <MainPage />
        </ModalMiddleware>
      </ModalContextProvider>
    </>
  )
}
