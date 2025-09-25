import {useContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import RegisterPage from '../components/pages/RegisterPage/RegisterPage';
import PrivateRoute from './PrivateRoute';
import HomePage from '../components/pages/HomePage/HomePage';
import LoggedInHomePage from '../components/pages/LoggedInHomePage/LoggedInHomePage';
import BlogpostOverview from '../components/pages/BlogpostOverview/BlogpostOverview';
import SinglePageBlogpostModify from '../components/pages/BlogpostOverview/SinglePageBlogpostModify';
import SinglePageBlogpost from '../components/pages/BlogpostOverview/SinglePageBlogpost';
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
      <Route path={'/register'} element={<RegisterPage />} />

      {/* Public route to browse blogs without login */}
      <Route path={'/blogposts'} element={<BlogpostOverview />} />

      <Route
        path={'/users'}
        element={<PrivateRoute requiredAuths={[]} element={<UserTable />} />}
      />
      <Route
        path='/useredit'
        element={
          <PrivateRoute
            requiredAuths={[authorities.USER_MODIFY]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />
      <Route
        path='/useredit/:userId'
        element={
          <PrivateRoute
            requiredAuths={[authorities.USER_MODIFY]}
            element={<UserPage />}
          ></PrivateRoute>
        }
      />
      <Route
        path={'/blogpost/:blogpostId'} element={
        <PrivateRoute
          requiredAuths={[]}
          element={<SinglePageBlogpost />}
        ></PrivateRoute>
      }
      />
      <Route
        path={'/blogpost/create'} element={
        <PrivateRoute
          requiredAuths={[authorities.BLOGPOST_CREATE]}
          element={<SinglePageBlogpostModify />}
        ></PrivateRoute>
      }
      />
      <Route
        path={'/blogpost/edit/:blogpostId'} element={
        <PrivateRoute
          requiredAuths={[authorities.BLOGPOST_UPDATE]}
          element={<SinglePageBlogpostModify />}
          ></PrivateRoute>
      }
        />
      <Route path='*' element={<div>Not Found</div>} />
    </Routes>
  );
};

export default Router;