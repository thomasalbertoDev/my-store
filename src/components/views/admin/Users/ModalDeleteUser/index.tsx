import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import styles from './ModalDeleteUser.module.scss';
import userServices from '@/services/user';
import { useSession } from 'next-auth/react';

const ModalDeleteUser = (props: any) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const session: any = useSession();

  const handleDeleteUser = async () => {
    const result = await userServices.deleteUser(deletedUser.id, session.data?.accessToken);
    if (result.status !== 200) {
      return;
    }
    setDeletedUser({});
    const { data } = await userServices.getAllUsers();
    setUsersData(data.data);
    return;
  };

  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className={styles.title}>Are you sure?</h1>
      <Button type="button" variant="danger" onClick={() => handleDeleteUser()}>
        Delete
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
