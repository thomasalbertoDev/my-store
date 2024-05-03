import Sidebar from '@/components/fragments/Sidebar';
import styles from './MemberLayout.module.scss';

interface Proptypes {
  children: React.ReactNode;
}

const listSidebarItem = [
  {
    title: 'Dashboard',
    url: '/member',
    icon: 'material-symbols:dashboard',
  },
  {
    title: 'Orders',
    url: '/member/orders',
    icon: 'material-symbols:orders',
  },
  {
    title: 'Profile',
    url: '/member/profile',
    icon: 'iconamoon:profile-fill',
  },
];

const MemberLayout = (props: Proptypes) => {
  const { children } = props;

  return (
    <div className={styles.member}>
      <Sidebar lists={listSidebarItem} />
      <div className={styles.member__main}>{children}</div>
    </div>
  );
};

export default MemberLayout;
