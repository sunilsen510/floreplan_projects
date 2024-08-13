import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import PageLoader from '../PageLoader';
import Image from 'next/image';
import CryptoJS from 'crypto-js';
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || 'your_secret_key';
const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const Layout: React.FC<any> = ({ children }: any) => {
  const router = useRouter();
  const [isBottomSpace, setIsBottomSpace] = useState(true);
  const [loggedInUserData, setLoggedInUserData] = useState({});
  const [isTokenExits, setIsTokenExits] = useState('');

// Check if logged in or not
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          const encryptedUser = localStorage.getItem('encryptedUser');
          if(token == '' || token == undefined || token == null){
            router.push('/login');
          }else{
            setIsTokenExits(token);
            if(encryptedUser) {
              const decrypted = decryptData(encryptedUser);
              setLoggedInUserData(JSON.parse(decrypted));
            }
          }     
        } catch (error) {
          router.push('/login');
        }
      };
      fetchProfile();
    }, [router, isTokenExits]);
// Check if logged in or not

// Handle bottom space for certain pages
  useEffect(() => {
    const pageArray = ["/user-roles", "/notification", "/staff-notifications", "/session-template"];
    if (pageArray.includes(router.pathname)) {
      setIsBottomSpace(false);
    }
  }, [router.pathname]);

  // Scroll to top button visibility
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  return (
    <>
      {isTokenExits ? (
        <>
          <Header loggedInUserData={loggedInUserData}/>
          <div className={!isBottomSpace ? 'dashboard-body bottomSpace' : 'dashboard-body'}>
            <div className='mobileOverlay' onClick={() => document.body.classList.remove('Mobilesidebar-open')}></div>
            <Sidebar loggedInUserData={loggedInUserData} />
            <div className='Dright-content'>
              {children}
            </div>
            <div className='backToTop default-btn' onClick={scrollToTop} style={{ display: isVisible ? 'block' : 'none' }}>
              Back to top <Image src="/images/arrow-duble-top.svg" width={16} height={16} alt="Arrow Up Icon" quality={100} />
            </div>
          </div>
          <Footer />=
        </>
       ) : (
        <PageLoader />
      )} 
    </>
  );
};

export default Layout;

