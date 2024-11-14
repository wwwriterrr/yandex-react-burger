import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  MainPage, 
  LoginPage,
  RegisterPage,
  ForgotPage,
  ResetPage,
  ProfilePage,
  ProfileSettings,
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
                <Route path={`/register`} element={<RegisterPage />} />
                <Route path={`/forgot-password`} element={<ForgotPage />} />
                <Route path={`/reset-password`} element={<ResetPage />} />
                <Route path={`/profile`} element={<ProfilePage />} >
                  <Route path={`settings`} element={<ProfileSettings />} />
                </Route>
              </Routes>
            </ModalMiddleware>
          </ModalContextProvider>
        </DndProvider>
      </Provider>
    </Router>
  )
}
