import styles from './Users.module.scss';
import Button from '@/components/ui/Button';
import AdminLayout from '@/components/layouts/AdminLayout';
import ModalUpdateUser from './ModalUpdateUser';
import { useEffect, useState } from 'react';
import ModalDeleteUser from './ModalDeleteUser';

interface Proptypes {
  // users: Array<{
  //   id: string;
  //   fullname: string;
  //   email: string;
  //   role: string;
  //   phone: string;
  // }>;
  users: any;
}

const UsersAdminView = (props: Proptypes) => {
  const { users } = props;
  const [updatedUser, setUpdatedUser] = useState<any>({});
  const [usersData, setUsersData] = useState([]);
  const [deletedUser, setDeletedUser] = useState<any>({});

  useEffect(() => {
    setUsersData(users);
  }, [users]);
  return (
    <>
      <AdminLayout>
        <div className={styles.users}>
          <h2>Users Management</h2>
          <table className={styles.users__table}>
            <thead>
              <tr>
                <th>No</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map(
                (
                  user: {
                    id: string;
                    fullname: string;
                    email: string;
                    role: string;
                    phone: string;
                  },
                  index: number
                ) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.fullname}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      <div className={styles.users__table__actions}>
                        <Button type="button" variant="success" onClick={() => setUpdatedUser(user)}>
                          Update
                        </Button>
                        <Button type="button" variant="danger" onClick={() => setDeletedUser(user)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {/* Modal Update User */}
      {Object.keys(updatedUser).length && <ModalUpdateUser updatedUser={updatedUser} setUpdatedUser={setUpdatedUser} setUsersData={setUsersData} />}

      {/* Modal Delete user */}
      {Object.keys(deletedUser).length && <ModalDeleteUser deletedUser={deletedUser} setDeletedUser={setDeletedUser} setUsersData={setUsersData} />}
    </>
  );
};

export default UsersAdminView;
