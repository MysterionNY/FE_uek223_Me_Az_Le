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
import UserPage from '../components/pages/UserPage/UserPage';
import AdminDashboard from '../components/pages/AdminDashboard/AdminDashboard';
import authorities from '../config/Authorities';
import ActiveUserContext from '../Contexts/ActiveUserContext';
import PageLayout from "../components/other/PageLayout/PageLayout";
import BlogpostsByAuthor from '../components/pages/BlogpostsByAuthor/BlogpostsByAuthor';


/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  const { user } = useContext(ActiveUserContext);

  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>
      <Route path='/' element={<PageLayout>{user ? <LoggedInHomePage /> : <HomePage />}</PageLayout>} />

      {/* Public route to browse blogs without login */}
      <Route path={'/blogposts'} element={<PageLayout><BlogpostOverview /></PageLayout>} />
      <Route path='/login' element={<PageLayout><LoginPage /></PageLayout>} />
      <Route path='/register' element={<PageLayout><RegisterPage /></PageLayout>} />
      <Route path='/blogposts/author/:authorId' element={<PageLayout><BlogpostsByAuthor /></PageLayout>} />

      <Route
        path={'/admin'}
        element={
          <PrivateRoute
            requiredAuths={[authorities.USER_MODIFY]}
            element={<PageLayout><AdminDashboard /></PageLayout>}
          />
        }
      />
      <Route
        path='/usercreate'
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
        <PageLayout><SinglePageBlogpost /></PageLayout>
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


        <Route path='*' element={<PageLayout><div>Not Found</div></PageLayout>} />
    </Routes>
  );
};

export default Router;