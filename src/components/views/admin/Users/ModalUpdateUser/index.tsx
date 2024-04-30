import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';
import userServices from '@/services/user';
import { FormEvent, useState } from 'react';

const ModalUpdateUser = (props: any) => {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    const result = await userServices.updateUser(updatedUser.id, data);
    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      setUpdatedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
      return;
    }
    setIsLoading(false);
  };

  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h2>Update User</h2>
      <form onSubmit={handleUpdateUser}>
        {/* Email */}
        <Input name="email" type="email" label="Email" placeholder="Input your email..." defaultValue={updatedUser.email} disabled />

        {/* Fullname */}
        <Input name="fullname" type="text" label="Fullname" placeholder="Input your fullname..." defaultValue={updatedUser.fullname} disabled />

        {/* Phone */}
        <Input name="phone" type="text" label="Phone" placeholder="Input your number phone..." defaultValue={updatedUser.phone} disabled />

        {/* Role */}
        <Select
          label="Role"
          name="role"
          options={[
            {
              value: 'admin',
              label: 'Admin',
            },
            {
              value: 'member',
              label: 'Member',
            },
          ]}
          defaultValue={updatedUser.role}
        />

        <Button type="submit" variant={'success'}>
          Update
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
