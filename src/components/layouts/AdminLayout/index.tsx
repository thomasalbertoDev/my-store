import Sidebar from '@/components/fragments/Sidebar';
import styles from './AdminLayout.module.scss';

interface Proptypes {
  children: React.ReactNode;
}

const listSidebarItem = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: 'material-symbols:dashboard',
  },
  {
    title: 'Users',
    url: '/admin/users',
    icon: 'mdi:users',
  },
  {
    title: 'Products',
    url: '/admin/products',
    icon: 'dashicons:products',
  },
];

const AdminLayout = (props: Proptypes) => {
  const { children } = props;

  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} />
      <div className={styles.admin__main}>{children}</div>
    </div>
  );
};

export default AdminLayout;
