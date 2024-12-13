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
    LogoutPage,
} from '../pages';
import { IngredientDetail } from '../components/burger-designer/ingredients-modal';
import { Modal, PageHeader } from '../components';
import { OnlyAuth, OnlyUnAuth } from '../components/protected-route';


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
                <Route path={`/login`} element={<OnlyUnAuth component={<LoginPage />} />} />
                <Route path={`/logout`} element={<OnlyAuth component={<LogoutPage />} />} />
                <Route path={`/register`} element={<OnlyUnAuth component={<RegisterPage />} />} />
                <Route path={`/reset-password`} element={<OnlyUnAuth component={<ForgotPage />} />} />
                <Route path={`/forgot-password`} element={<OnlyUnAuth component={<ResetPage />} />} />
                <Route path={`/profile`} element={<OnlyAuth component={<ProfilePage />} />} >
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