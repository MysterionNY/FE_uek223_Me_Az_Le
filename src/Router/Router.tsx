import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import RegisterPage from '../components/pages/RegisterPage/RegisterPage';
import PrivateRoute from './PrivateRoute';
import HomePage from '../components/pages/HomePage/HomePage';
import LoggedInHomePage from '../components/pages/LoggedInHomePage/LoggedInHomePage';
import BlogpostOverview from '../components/pages/BlogpostOverview/BlogpostOverview';
import UserTable from '../components/pages/UserPage/UserTable';
import UserPage from '../components/pages/UserPage/UserPage';
import authorities from '../config/Authorities';
import ActiveUserContext from '../Contexts/ActiveUserContext';
import PageLayout from "../components/other/PageLayout/PageLayout";

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  const { user } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

    return (
        <Routes>
            {/* Conditional Home Page - now wrapped in layout */}
            <Route path='/' element={<PageLayout>{user ? <LoggedInHomePage /> : <HomePage />}</PageLayout>} />

            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />

            {/* Public routes */}
            <Route path='/blogposts' element={<PageLayout><BlogpostOverview /></PageLayout>} />
            <Route path='/blogpost/:blogpostId' element={<PageLayout><div>Blog Detail Page - To Be Implemented</div></PageLayout>} />
            <Route path='/blogpost/create' element={<PageLayout><div>Blog Create Page - To Be Implemented</div></PageLayout>} />

            {/* Private routes */}
            <Route path='/users' element={<PrivateRoute requiredAuths={[]} element={<PageLayout><UserTable /></PageLayout>} />} />
            <Route path='/useredit' element={<PrivateRoute requiredAuths={[authorities.USER_DEACTIVATE, authorities.USER_CREATE]} element={<PageLayout><UserPage /></PageLayout>} />} />
            <Route path='/useredit/:userId' element={<PrivateRoute requiredAuths={[authorities.USER_READ]} element={<PageLayout><UserPage /></PageLayout>} />} />

            {/* Not found */}
            <Route path='*' element={<PageLayout><div>Not Found</div></PageLayout>} />
        </Routes>
    );
};

export default Router;