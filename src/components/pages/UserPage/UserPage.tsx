import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../../../types/models/User.model';
import UserService from '../../../Services/UserService';
import UserForm from '../../molecules/UserForm/UserForm';
import { useEffect, useState } from 'react';

const UserPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState<User>({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    roles: [],
  });

  useEffect(() => {
    if (userId) {
      console.log('Fetching user with ID:', userId);
      UserService.getUser(userId)
        .then((res) => {
          console.log('User fetched successfully:', res);
          setUser(res);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
          console.error('Error response:', error.response);
          alert(`Failed to fetch user: ${error.response?.data?.message || error.message}`);
        });
    }
  }, [userId]);

  const submitActionHandler = (values: User) => {
    console.log('Submitting user data:', values);
    if (userId !== undefined) {
      UserService.updateUser(values)
        .then(() => {
          console.log('User updated successfully');
          navigate('/admin');
        })
        .catch((error) => {
          console.error('Error updating user:', error);
          console.error('Error response:', error.response);
          alert(`Failed to update user: ${error.response?.data?.message || error.message}`);
        });
    } else {
      UserService.addUser(values)
        .then(() => {
          console.log('User added successfully');
          navigate('/admin');
        })
        .catch((error) => {
          console.error('Error adding user:', error);
          console.error('Error response:', error.response);
          alert(`Failed to add user: ${error.response?.data?.message || error.message}`);
        });
    }
  };

  return <UserForm user={user} submitActionHandler={submitActionHandler} />;
};
export default UserPage;
