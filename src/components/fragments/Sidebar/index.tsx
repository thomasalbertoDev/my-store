import Link from 'next/link';
import Button from '@/components/ui/Button';
import styles from './Sidebar.module.scss';
import { Icon } from '@iconify/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

interface Proptypes {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
}

const Sidebar = (props: Proptypes) => {
  const { lists } = props;
  const { pathname } = useRouter();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__top}>
        <h2 className={styles.sidebar__top__title}>Admin Panel</h2>
        <div className={styles.sidebar__top__lists}>
          {lists.map((list, index) => (
            <Link href={list.url} key={index} className={`${styles.sidebar__top__lists__item} ${pathname === list.url && styles.sidebar__top__lists__item__active}`}>
              <Icon icon={list.icon} width="20" height="20" />
              <h4 className={styles.sidebar__top__lists__item__title}>{list.title}</h4>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.sidebar__bottom}>
        <Button className={styles.sidebar__bottom__button} type="button" variant="white" onClick={() => signOut()}>
          <Icon icon="material-symbols:logout" width="18" height="18" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
