import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { ModalContextProvider } from './contexts';
import { ModalMiddleware } from './middlewares';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AppRoutes } from './routes';


export const App: React.FC = () => {
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
