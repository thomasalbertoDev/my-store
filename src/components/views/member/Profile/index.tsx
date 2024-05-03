import MemberLayout from '@/components/layouts/MemberLayout';
import styles from './Profile.module.scss';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Image from 'next/image';

interface Proptypes {
  profile: any;
}

const ProfileMemberView = (props: Proptypes) => {
  const { profile } = props;
  return (
    <MemberLayout>
      <h1 className={styles.profile__title}>Member Profile</h1>
      <div className={styles.profile__main}>
        <div className={styles.profile__main__avatar}>
          <Image src={profile.image} alt="Profile" width={200} height={200} />
          <label className={styles.profile__main__avatar__label} htmlFor="upload-image">
            <p>Upload a new avatar, Large image will be resized automatically</p>
            <p>
              Max size <b>1MB</b>
            </p>
          </label>
          <input className={styles.profile__main__avatar__input} type="file" name="image" id="upload-image" />
        </div>
        <div className={styles.profile__main__detail}>
          <form action="">
            <Input label="Fullname" name="fullname" defaultValue={profile.fullname} type="text" />
            <Input label="Email" name="email" defaultValue={profile.email} type="email" />
            <Input label="Phone" name="phone" defaultValue={profile.phone} type="text" />
            {/* <Input label="Password" name="password" defaultValue={profile.password} type="password" /> */}
            <Button type="submit" variant="black">
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
