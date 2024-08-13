
import Image from 'next/image';
import { useRouter } from 'next/router';
const LogoutButton: React.FC = () => {
  const router = useRouter();
const handleLogout = async () => {
  localStorage.removeItem('encryptedUser');
  localStorage.removeItem('token');
  router.push('/login');
};
  return <button onClick={handleLogout}><Image src="/images/logout.svg" width={24} height={24} alt="Log Out Icon" quality={100} /> Logout</button>;

};
export default LogoutButton;
