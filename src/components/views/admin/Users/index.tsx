import Button from '@/components/ui/Button';
import styles from './Users.module.scss';
import AdminLayout from '@/components/layouts/AdminLayout';

interface Proptypes {
  users: Array<{
    id: string;
    fullname: string;
    email: string;
    role: string;
    phone: string;
  }>;
}

const UsersAdminView = (props: Proptypes) => {
  const { users } = props;
  return (
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
            {users.map(
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
                      <Button type="button" variant="success">
                        Update
                      </Button>
                      <Button type="button" variant="danger">
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
  );
};

export default UsersAdminView;
