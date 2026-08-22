import Avatar from "@/components/profile/Avatar/Avatar";
import css from "./Page.module.css";
import ProfileInfo from "@/components/profile/ProfileInfo/ProfileInfo";
import EditProfileModal from "@/components/profile/EditProfileModal/EditProfileModal";
import ShiftsSettings from "@/components/profile/ShiftsSettings/ShiftsSettings";

const Page = () => {
  return (
    <div className={css.page}>
      <header className={css.header}>
        <p>Account</p>
        <h1>Profile</h1>
      </header>

      <main className={css.profileCard}>
        <Avatar />
        <ProfileInfo />
        <EditProfileModal />
      </main>

      <p className={css.caption}>
        Manage your personal information and account details.
      </p>
      <ShiftsSettings />
    </div>
  );
};

export default Page;
