import React from 'react'
import { MainPage } from './pages';
import { ModalContextProvider } from './contexts';
import { ModalMiddleware } from './middlewares';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <ModalContextProvider>
          <ModalMiddleware>
            <MainPage />
          </ModalMiddleware>
        </ModalContextProvider>
      </DndProvider>
    </Provider>
  )
}
