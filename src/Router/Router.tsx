import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute';
import HomePage from '../components/pages/HomePage';
import LoggedInHomePage from '../components/pages/LoggedInHomePage/LoggedInHomePage';
import UserTable from '../components/pages/UserPage/UserTable';
import UserPage from '../components/pages/UserPage/UserPage';
import authorities from '../config/Authorities';
import ActiveUserContext from '../Contexts/ActiveUserContext';

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  const { user } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>
      {/* Conditional Home Page - shows different page based on auth status */}
      <Route path={'/'} element={user ? <LoggedInHomePage /> : <HomePage />} />
      <Route path={'/login'} element={<LoginPage />} />
      <Route path={'/register'} element={<LoginPage />} /> {/* You may want to create a separate RegisterPage component */}

      {/* Public route to browse blogs without login */}
      <Route path={'/blogposts'} element={<div>Blog List Page - To Be Implemented</div>} />
      <Route path={'/blogpost/:blogpostId'} element={<div>Blog Detail Page - To Be Implemented</div>} />

      <Route
        path={'/users'}
        element={<PrivateRoute requiredAuths={[]} element={<UserTable />} />}
      />
      <Route
        path='/useredit'
        element={
          <PrivateRoute
            requiredAuths={[authorities.USER_DEACTIVATE, authorities.USER_CREATE]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />
      <Route
        path='/useredit/:userId'
        element={
          <PrivateRoute
            requiredAuths={[authorities.USER_READ]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />

      <Route path='*' element={<div>Not Found</div>} />
    </Routes>
  );
};

export default Router;
