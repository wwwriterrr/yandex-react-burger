import type { FC } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { 
	MainPage, 
	LoginPage,
	RegisterPage,
	ForgotPage,
	ResetPage,
	ProfilePage,
	ProfileSettings,
	OrdersList,
} from '../pages';
import { IngredientDetail } from '../components/burger-designer/ingredients-modal';
import { Modal, PageHeader } from '../components';


export const AppRoutes: FC = () => {
    const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;

	const handleModalClose = () => {
		navigate(-1);
	};

    return (
        <>
            <Routes location={background || location}>
                <Route path={`/`} element={<MainPage />} />
                <Route path={`/login`} element={<LoginPage />} />
                <Route path={`/register`} element={<RegisterPage />} />
                <Route path={`/forgot-password`} element={<ForgotPage />} />
                <Route path={`/reset-password`} element={<ResetPage />} />
                <Route path={`/profile`} element={<ProfilePage />} >
                    <Route path={`settings`} element={<ProfileSettings />} />
                    <Route path={`orders`} element={<OrdersList />} />
                </Route>
                <Route path='/ingredients/:ingredientId' element={<><PageHeader /><IngredientDetail /></>} />
                <Route path={'*'} element={<div>Not found</div>} />
            </Routes>

            {background && (
                <Routes>
                    <Route
                        path='/ingredients/:ingredientId'
                        element={
                            <Modal onClose={handleModalClose}>
                                <IngredientDetail />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </>
    )
}