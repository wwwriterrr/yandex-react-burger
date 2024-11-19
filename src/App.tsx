import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { ModalContextProvider } from './contexts';
import { ModalMiddleware } from './middlewares';
import { Provider } from 'react-redux';
import { store, useAppDispatch } from './services/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AppRoutes } from './routes';
import { checkUserAuth } from './services/auth/auth-actions';


export const App: React.FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(checkUserAuth());
	}, [])

	return (
		<Router>
			<Provider store={store}>
				<DndProvider backend={HTML5Backend}>
					<ModalContextProvider>
						<ModalMiddleware>
							<AppRoutes />
						</ModalMiddleware>
					</ModalContextProvider>
				</DndProvider>
			</Provider>
		</Router>
	)
}
