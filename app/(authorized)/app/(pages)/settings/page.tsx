import { useRequiredUser } from '@/hooks/user-hook';

const SettingsPage = () => {
  const user = useRequiredUser();

  return (
    <div>
      <p>Settings Page of {user.firstName}</p>
    </div>
  );
};

export default SettingsPage;
