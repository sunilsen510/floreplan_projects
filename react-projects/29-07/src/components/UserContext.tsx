import { useEffect, useState, createContext, useContext } from 'react';

interface LoginContextUser {
    id: string;
    name: string;
  }
  interface UserContextType {
    loginUserDataContext: LoginContextUser | null;
    changeLoginUserContext: (loginUserDataContext: LoginContextUser) => void;
  }
  const UserContext = createContext<UserContextType | undefined>(undefined);

  const UserContextComponent: React.FC<any> = ({ children }: any) =>{
    const [loginUserDataContext, setLoginUserDataContext] = useState<LoginContextUser | null>(null);
    const changeLoginUserContext = (loginUserDataContext: LoginContextUser) => {
        const data =  {
            id: '1',
            name:'hello'
          }
          // setLoginUserDataContext(loginUserDataContext);
          setLoginUserDataContext(data);
    };
  return (
    <>
        <UserContext.Provider value={{ loginUserDataContext, changeLoginUserContext }}>
            {loginUserDataContext?loginUserDataContext.id:'adf'}
         </UserContext.Provider>
    </>
  )

}
export default UserContextComponent;



// for use context
export const useUser = (): UserContextType => {
    const context = useContext<UserContextType | undefined>(UserContext);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
  };