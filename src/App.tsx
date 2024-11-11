import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  MainPage, 
  LoginPage 
} from './pages';
import { ModalContextProvider } from './contexts';
import { ModalMiddleware } from './middlewares';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


export const App: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <ModalContextProvider>
            <ModalMiddleware>
              <Routes>
                <Route path={`/`} element={<MainPage />} />
                <Route path={`/login`} element={<LoginPage />} />
              </Routes>
            </ModalMiddleware>
          </ModalContextProvider>
        </DndProvider>
      </Provider>
    </Router>
  )
}
