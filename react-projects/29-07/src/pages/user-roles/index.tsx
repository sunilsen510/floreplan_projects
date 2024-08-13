import Layout from '@/components/Layout';
import React, { useEffect, useRef, ChangeEvent, useState, FormEvent } from 'react';
import styles from "./user-roles.module.css";
import { Button, Dropdown, Form, Modal,  Table } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import UserRegister from '@/components/user_roles/UserRegister';
import UserRegisterEdit from '@/components/user_roles/UserRegisterEdit';
import SuccessModalComponent from '@/components/SuccessModalComponent';
import axios , { AxiosError } from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MultiSelectCheckbox from '@/components/MultiSelectComponent';
import Pagination from "@/components/Pagination";
import { Inter } from 'next/font/google';
import { useRouter } from "next/router"; 
import CryptoJS from 'crypto-js';
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || 'your_secret_key';
const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

interface UserData {
    _id?: string;
    email?: string;
    name?: string;
    country?: string;
    token?: string;
    gender?: number;
  }

type UserDataTs = any;
type SelectedOption = any;
interface HospitalShowDataTs {
    name: any;
    specialist : any;
    hospital : any;
  }
interface MobileShowDataTs {
    allData: any;
    hospital : any;
  }

interface LoginPrimaryRole {
    primary_role: string;
}

interface SessionUser extends Record<string, unknown> {
    login_user_data?: LoginPrimaryRole;
    name?: string | null;
    email?: string | null;
    image?: string | null;
} 
const userRoles = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [isLoading, setIsLoading] = useState(false);
    const [loginUserRoleId, setLoginUserRoleId] = useState<number>(0);
    const [loginUserAllData, setLoginUserAllData] = useState<any>({});
    const [isTokenExits, setIsTokenExits] = useState<any>(null);
    // Get Login user Data 


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
                const loginuserIdSet = JSON.parse(decrypted);
                setLoginUserAllData(loginuserIdSet);
                const primaryRole = parseInt(loginuserIdSet?.primary_role);
                setLoginUserRoleId(primaryRole);
                (primaryRole === Number(process.env.NEXT_PUBLIC_SYSTEM_ADMIN_ID) || primaryRole === Number(process.env.NEXT_PUBLIC_TRUST_ADMIN_ID) || primaryRole === Number(process.env.NEXT_PUBLIC_HOSPITAL_ADMIN_ID)) ? '' : router.push('/');
              }
            }     
          } catch (error) {  
            router.push('/login');
          }
        };
        fetchProfile();
      }, [router, isTokenExits]);
  // Check if logged in or not

    // pagination 
    const [page, setPage] = useState(1);
    const [totalRecord, setTotalRecord] = useState(0);
    const [limit, setLimit] = useState(0);
    // pagination 

    // fitler 
    const [filterBy, setFilterBy] = useState<any>('');
    const [filterValue, setFilterValue] = useState<any>('');
    const [searchBy, setSearchBy] = useState<any>('');
    const [searchByValue, setSearchByValue] = useState<any>('');
    // fitler 

    const [newUserCreate, setNewUserCreate] = useState<any>(false);
    const [userDeleteId, setUserDeleteId] = useState<any>();
    const [editUserId, setEditUserId] = useState<string>('');
    const [usersDataList, setUsersDataList] = useState<UserDataTs[]>([]);

    const [hospitalShow, setHospitalShow] = useState(false);
    const [adduserShow, setAdduserShow] = useState(false);
    const [edituserShow, setEdituserShow] = useState(false);
    const [filterShow, setFilterShow] = useState(false);
    const [userInformationShow, setUserInformationShow] = useState(false);

    const [sucessModelShow, setSucessModelShow] = useState(false);
    const [sucessModelMessage, setSucessModelMessage] = useState<any>();

    const [hospitalShowData, setHospitalShowData] = useState<HospitalShowDataTs>({name:'', specialist: '', hospital:''});
    const [mobileUserData, setMobileUserData] = useState<MobileShowDataTs>({allData:'', hospital:''});
  
    const [deleteUserShow, setDeleteUserShow] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string>('Role');

    const [isUserDataUpdate, setIsUserDataUpdated] = useState<boolean>(false);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFilter(event.target.value);
    };

    // get all Users 
      const getAllUsers  = async () => {
        setUsersDataList([]);
        if (isTokenExits) {
             setIsLoading(true); 
            try {
            let get_all_User =  await axios.post(`${apiUrl}/users?page=${page}`,
                {
                    filter_by:filterBy,
                    filter_value:filterValue,
                    search:searchByValue,
                },
                { responseType: 'json' ,
                    headers: {
                    'Authorization': `Bearer ${isTokenExits}`
                }
            });
            setIsLoading(false);
            if (get_all_User.data.data && get_all_User.data.data.data.length > 0) {
                setUsersDataList(get_all_User?.data?.data?.data);
                setTotalRecord(get_all_User.data.data.total);
                setLimit(get_all_User.data.data.per_page);            
            } 
            } catch (error:any) { 
                 setIsLoading(false);         
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<{ message: string }>;            
                    if(axiosError?.response?.data?.message == "Unauthenticated."){
                        localStorage.removeItem('encryptedUser');
                        localStorage.removeItem('token');
                        router.push('/login');
                    }else{
                    console.log("Error setting up request:", axiosError.message);
                    }
                } else {
                    console.error("An error occurred:", error);
                }
            } 
        }
      }
      useEffect(() => {
        getAllUsers();
    }, [page,filterValue,searchBy, isTokenExits, apiUrl, router,isUserDataUpdate]);

    // new record create time new row call
    useEffect(() => {
        if(newUserCreate){
            setPage(1); 
            getAllUsers();
        }    
        setNewUserCreate(false);
    }, [newUserCreate]);
  
    // get all Users 

    const handleEditUser = (id: string) => {
        setEditUserId(id);
        setUserInformationShow(false);
        setEdituserShow(true);
      };

        // user Delete  
        const handleDeleteUser = async (uuid: string) => {
            setDeleteUserShow(true);
            setUserInformationShow(false);
            setUserDeleteId(uuid);
        }
        const decrementTotalRecord = () => {
            if (totalRecord > 0) {
              setTotalRecord(prevTotalRecord => prevTotalRecord - 1);
            }
            // if page 
         };
        const ClosesetDeleteUserShow = async () => {            
            if (isTokenExits) {
                setDeleteUserShow(false);
                try {
                  const userIsDelete =  await axios.post(`${apiUrl}/user/delete/${userDeleteId}`, {
                    type:""
                    },{ responseType: 'json' ,
                        headers: {
                            'Authorization': `Bearer ${isTokenExits}`
                        }
                    }); 
                    // userDeleteId
                    const updatedData = usersDataList.filter(item => item.uuid !== userDeleteId);
                    if(updatedData.length === 0 && page > 1){
                        setPage(page -1)
                    }else{
                        setIsUserDataUpdated(!isUserDataUpdate);
                    }
                    // setUsersDataList(updatedData);
                    decrementTotalRecord();
                    setSucessModelMessage('User has been deleted successfully');
                    setSucessModelShow(true);
                    setUserDeleteId('');  
                } catch(error:any) {
                    if (axios.isAxiosError(error)) {
                        const axiosError = error as AxiosError<{ message: string }>;            
                        if(axiosError?.response?.data?.message == "Unauthenticated."){
                            localStorage.removeItem('encryptedUser');
                            localStorage.removeItem('token');
                            router.push('/login');
                        }else{
                            console.log("Error setting up request:", axiosError.message);
                        }
                    } else {
                        toast.error('Something went wrong...');
                    }      
                } 
            }
        }
        //user Delete

        // show hospital list 
         const showHospitaList = async (name:any, specialist:any, hospital:any) => {
            setHospitalShow(true);
            setHospitalShowData({ ...hospitalShowData, 'name': name, 'specialist':specialist,'hospital':hospital});
        }
        // show hospital list 
        // show mobile user Data list 
         const showMObileUserData = async (user:any) => {
            setUserInformationShow(true);
            setMobileUserData({ ...mobileUserData, 'allData': user, 'hospital':user?.hospitals});
        }
        // show mobile user Data list 


    // search functinality
    const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSearchByValue(value);
        setPage(1);   
        setSearchBy(searchByValue);
    };        
    const searchByIconClick  = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPage(1);   
        setSearchBy(searchByValue);
    }
    const handleSerchClear = async () => {
        setPage(1); 
        setSearchByValue('');  
        setSearchBy(searchByValue);
    } 
    // search functinality 

    // filter by
    const [role_list, setRoleList] = useState<SelectedOption[]>([]);
    const [hospital, setHospital] = useState<SelectedOption[]>([]);
    const [speciality, setSpeciality] = useState<SelectedOption[]>([]);
    const [sub_speciality, setSubSpeciality] = useState<SelectedOption[]>([]);

    const [roleSelectedOptions, setRoleSelectedOptions] = useState<{ value: any; label: string }[]>([]);
    const [hospitalSelectedOptions, setHospitalSelectedOptions] = useState<{ value: any; label: string }[]>([]);
    const [specialtySelectedOptions, setSpecialtySelectedOptions] = useState<{ value: any; label: string }[]>([]);
    const [subSpecialtySelectedOptions, setsubSpecialtySelectedOptions] = useState<{ value: any; label: string }[]>([]);

    // get all Roles 
    const getRoles  = async () => {
        setRoleList([]);
        if (isTokenExits) {
            try {
            let get_role_list =  await axios.get(`${apiUrl}/get-roles`, { 
                responseType: 'json',
                headers: {
                'Authorization': `Bearer ${isTokenExits}`
                }
             });    
            if(get_role_list?.data?.data) {   
                const roleOptions  = get_role_list?.data?.data;
                if(roleOptions){
                    const roleArray = Object.entries(roleOptions).map(([key, value]) => ({
                        value: key,
                        label: value,
                    }));
                    setRoleList(roleArray); 
                } 
                } 
            } catch (error) {
                if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>;            
                if(axiosError?.response?.data?.message == "Unauthenticated."){
                    localStorage.removeItem('encryptedUser');
                    localStorage.removeItem('token');
                    router.push('/login');
                }
                }else{
                console.error('Error fetching:', error);
                }
            }        
        }
      }
      // get all Roles 

    // get all Speciality 
       const getAllSpecialty  = async () => {
        setSpeciality([]);
        try {
          let get_speciality_list =  await axios.get(`${apiUrl}/get-specialities`, { responseType: 'json' });
          if(get_speciality_list?.data?.data) {   
              const specialityOptions  = get_speciality_list?.data?.data;
              if(specialityOptions){
                  const specialityArray = Object.entries(specialityOptions).map(([key, value]) => ({
                    value: key,
                    label: value,
                  }));
                  setSpeciality(specialityArray); 
              } 
            } 
        } catch (error) {
          console.error('Error fetching:', error);
        } 
      }
    // get all Speciality 

    // get all Hospital 
    const getAllHospitals  = async (trust_id: string | null) => {
        if(loginUserRoleId === Number(process.env.NEXT_PUBLIC_SYSTEM_ADMIN_ID) || loginUserRoleId === Number(process.env.NEXT_PUBLIC_TRUST_ADMIN_ID)){
        try {
            var get_hopital_list = null;
            if(trust_id){
                 get_hopital_list =  await axios.get(`${apiUrl}/get-hospitals/${trust_id}`, { responseType: 'json' });
            }else{
                 get_hopital_list =  await axios.get(`${apiUrl}/get-hospitals/?type=all`, { responseType: 'json' });
            }
          if(get_hopital_list?.data?.data) {   
              const trustOptions  = get_hopital_list?.data?.data;
              if(trustOptions){
                  const hospitalArray = Object.entries(trustOptions).map(([key, value]) => ({
                    value: key,
                    label: value,
                  }));
                  setHospital(hospitalArray); 
              }  
            } 
          } catch (error) {
            console.error('Error fetching:', error);
          }
        }  
      }
    // get all Hospital 

     // get all sub Speciality
   const getAllSubSpecialty  = async () => {
    try {
      let get_sub_speciality_list =  await axios.get(`${apiUrl}/get-sub-specialities`, { responseType: 'json' });
      if(get_sub_speciality_list?.data?.data) {   
          const subSpecialityOptions  = get_sub_speciality_list?.data?.data;
          if(subSpecialityOptions){
              const subSpecialityArray = Object.entries(subSpecialityOptions).map(([key, value]) => ({
                value: key,
                label: value,
              }));
              setSubSpeciality(subSpecialityArray); 
          } 
        }
    } catch (error) {
      console.error('Error fetching:', error);
    } 
  }
   // get all sub Speciality
    useEffect(() => {
        getRoles();
        getAllSpecialty();
        getAllSubSpecialty();
  }, [filterShow]);

  
    const handleRoleChange = (selectedOptions: any) => {
        setRoleSelectedOptions(selectedOptions);
    };
    const handleSpecialityChange = (selectedOptions: any) => {
        setSpecialtySelectedOptions(selectedOptions);
    };
    const handleSubSpecialityChange = (selectedOptions: any) => {
        setsubSpecialtySelectedOptions(selectedOptions);
    };
    const handleHospitalChange = (selectedOptions: any) => {
       setHospitalSelectedOptions(selectedOptions);
     };
     
     const filterByDropdown  = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFilterShow(false);
        setPage(1);  
        if(selectedFilter == 'Role'){
            setFilterBy('role');
            const selectedIds = (roleSelectedOptions as { value: string; label: string }[]).map(option => parseInt(option.value));
            setFilterValue(selectedIds);
        }else if(selectedFilter == 'Hospital'){
            setFilterBy('hospital');
            const selectedIds = (hospitalSelectedOptions as { value: string; label: string }[]).map(option => parseInt(option.value));
            setFilterValue(selectedIds);
        }else if(selectedFilter == 'Specialty'){
            setFilterBy('speciality');
            const selectedIds = (specialtySelectedOptions as { value: string; label: string }[]).map(option => parseInt(option.value));
            setFilterValue(selectedIds);
        }else if(selectedFilter == 'Sub-Specialty'){
            setFilterBy('sub_speciality');
            const selectedIds = (subSpecialtySelectedOptions as { value: string; label: string }[]).map(option => parseInt(option.value));
            setFilterValue(selectedIds);
        }
    }
// filter by

 // if user type trust admin and hospital admin 
 useEffect(() => {
    if(loginUserRoleId === Number(process.env.NEXT_PUBLIC_SYSTEM_ADMIN_ID)){
        getAllHospitals(null);
    }
    if(loginUserAllData && loginUserRoleId === Number(process.env.NEXT_PUBLIC_TRUST_ADMIN_ID)){
        getAllHospitals(loginUserAllData?.trust);     
    }
    if(loginUserAllData && loginUserRoleId === Number(process.env.NEXT_PUBLIC_HOSPITAL_ADMIN_ID)){
        const HospitaloptionsArray = Object.entries(loginUserAllData.hospital).map(([key, value]) => ({
            value: key,
            label: value,
        }));
        setHospital(HospitaloptionsArray); 
    }
  },[loginUserRoleId]);
// if user type trust admin and hospital admin 
        

  return (
   
    <Layout>
        <div>
        <ToastContainer position="top-right" />
            <h4 className='maintitle'>User Roles</h4>
            <div className={`${styles.topArea}`}>
                <div className={`${styles.topSearch}`}>
                    <Form onSubmit={searchByIconClick} className={`${styles.topForm}`}>
                        <Form.Group className="position-relative">
                            <Form.Control type='text' placeholder="Search" name="search_val" value={searchByValue} onChange={handleChangeSearchInput}  />
                            {searchByValue.length > 0 ? (
                                <Button type="button" className={`${styles.topSearchBtn}`} onClick={handleSerchClear} >
                                <span><Image src="/images/close.svg" alt='close' width={16} height={16} quality={100} /></span>
                                </Button>
                            ):(
                                <Button type="button" className={`${styles.topSearchBtn}`}>
                                <span><Image src="/images/search-blue.svg" alt='search' width={24} height={24} quality={100} /></span>
                                </Button>
                            )}
                        </Form.Group>
                    </Form>
                </div>
                <div className={`${styles.topBothBtn}`}>
                    <Button className='outlibe-btn-wicon' onClick={() => setFilterShow(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                            <path d="M1.62985 2.97264L6.88463 9.68182V15L10.1154 12.6364V9.68182L15.3702 2.97264C15.6695 2.58855 15.4181 2 14.9539 2H2.04607C1.58192 2 1.33047 2.58855 1.62985 2.97264Z" stroke="#295597" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>Filter
                    </Button>
                    <Button className='default-btn2-wicon' onClick={() => setAdduserShow(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 4.5C12.4142 4.5 12.75 4.83579 12.75 5.25V11.25H18.75C19.1642 11.25 19.5 11.5858 19.5 12C19.5 12.4142 19.1642 12.75 18.75 12.75H12.75V18.75C12.75 19.1642 12.4142 19.5 12 19.5C11.5858 19.5 11.25 19.1642 11.25 18.75V12.75H5.25C4.83579 12.75 4.5 12.4142 4.5 12C4.5 11.5858 4.83579 11.25 5.25 11.25H11.25V5.25C11.25 4.83579 11.5858 4.5 12 4.5Z" fill="white"/>
                        </svg>Add User
                    </Button>
                </div>
            </div>
             {/* Start user list table  */}
            <div className={`${styles.userroleTable} common-table`}>
                <Table className={`${styles.DesktopData} d-none d-md-table`}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Speciality</th>
                            <th>Sub-Speciality</th>
                            <th><p className='d-flex align-items-center justify-content-center gap-4'>Hospitals <span className={`${styles.hospitalList}`}></span></p></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>                    
                    {usersDataList && usersDataList.length > 0 ? (                    
                        usersDataList.map(user => (
                        <tr key={user.id}>
                            <td>{user.full_name}</td>
                            <td>{user?.role?.role_name}</td>
                            <td>{user.speciality}</td>
                            <td>{user.sub_speciality}</td>
                            <td><p className='d-flex align-items-center justify-content-center gap-2 gap-xl-4'>
                                { user?.hospitals && user.hospitals.length > 0   ? user.hospitals[0] : '' }
                                { user?.hospitals && user.hospitals.length > 1 ? (         
                                <span className={`${styles.hospitalList}`} onClick={() => 
                                    showHospitaList(user.full_name, user.speciality, user?.hospitals) 
                                }><Image src="/images/list-icon.svg" width={32} height={32} alt="List Icon" placeholder="empty" loading="eager" quality={100} /></span>
                                
                                ):(
                                    <span className={`${styles.hospitalList}`}></span>
                                    )}
                                </p></td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle className="DropiconNone">
                                        <Image src="/images/vertical-dots.svg" width={20} height={20} alt="Dropdown Icon" quality={100} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="InnerDropDown" align="end">
                                        <Dropdown.Item className='d-flex align-items-center' onClick={() => handleEditUser(user.uuid)} ><Image src="/images/edit-icon.svg" width={24} height={24} alt="Edit Icon" quality={100} />Edit</Dropdown.Item>
                                        <Dropdown.Item className='d-flex align-items-center color-red' onClick={() => handleDeleteUser(user.uuid)} ><Image src="/images/trash-icon.svg" width={24} height={24} alt="Delete Icon" quality={100} />Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                            </tr>
                        ))
                    ) : (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center' }}>
                       {isLoading?'Loading...':'No user data found'} 
                        </td>
                    </tr>
                  )}

                    </tbody>
                </Table>
                {/* End user list table  */}
                <div className={`${styles.userMobileArea} d-md-none MobileData`}>
                    <ul className={`${styles.userDataList}`}>
                    {usersDataList && usersDataList.length > 0 ? (  
                        usersDataList.map(user => (
                            <li key={user.id}>
                                <div className={`${styles.userlData}`}>
                                    <p className='mb-1 text-truncate'>{user.full_name}</p>
                                    <h6 className='text-truncate'>{user.speciality}</h6>
                                </div>
                                <div className={`${styles.userRData}`}>
                                    <Button onClick={() => showMObileUserData(user)}>
                                        <Image src="/images/vertical-dots.svg" width={20} height={20} alt="Dropdown Icon" quality={100} />
                                    </Button>
                                </div>
                            </li>   
                            ))
                     ) :(
                        ''
                    )}
                    </ul>
                </div>
                {usersDataList && usersDataList.length > 0 && (
                    <Pagination page={page} setPage={setPage} totalRecord ={totalRecord} limit={limit}/>
                )}

            </div>
        </div>

        {/* Add User Modal */}
        {adduserShow && (
                 <UserRegister adduserShow={adduserShow} setAdduserShow={setAdduserShow} apiUrl={apiUrl}  setSucessModelShow={setSucessModelShow} setSucessModelMessage={setSucessModelMessage}  setNewUserCreate={setNewUserCreate} loginUserRoleId={loginUserRoleId} loginUserAllData={loginUserAllData}  isTokenExits={isTokenExits}/>
            )}  
         {edituserShow && (  
          <UserRegisterEdit edituserShow={edituserShow} setEdituserShow={setEdituserShow} apiUrl={apiUrl} editUserId={editUserId}  setSucessModelShow={setSucessModelShow} setSucessModelMessage={setSucessModelMessage} setIsUserDataUpdated={setIsUserDataUpdated} isUserDataUpdate={isUserDataUpdate} loginUserRoleId={loginUserRoleId} loginUserAllData={loginUserAllData} isTokenExits={isTokenExits}/>
          )}  
          {/* Add User Modal */}
        

        {/* Filter Modal */}
        <Modal show={filterShow} onHide={() => setFilterShow(false)} centered className='bottomSlideModalMob'>
            <Modal.Header closeButton className='headerBlankMobile'>
                <Modal.Title>Filter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={filterByDropdown}>
                    <Form.Group className="mb-20">
                        <Form.Label>Filter By :</Form.Label>
                        <div className='customRadioArea'>
                            <Form.Check
                                inline
                                label="Role"
                                name="filters"
                                type="radio"
                                id="FilterRole"
                                value="Role"
                                checked={selectedFilter === 'Role'}
                                onChange={handleRadioChange}
                            />
                            <Form.Check
                                inline
                                label="Specialty"
                                name="filters"
                                type="radio"
                                id="FilterSpecialty"
                                value="Specialty"
                                checked={selectedFilter === 'Specialty'}
                                onChange={handleRadioChange}
                            />
                            <Form.Check
                                inline
                                label="Sub-Specialty"
                                name="filters"
                                type="radio"
                                id="FilterSub-Specialty"
                                value="Sub-Specialty"
                                checked={selectedFilter === 'Sub-Specialty'}
                                onChange={handleRadioChange}
                            />
                            <Form.Check
                                inline
                                label="Hospital"
                                name="filters"
                                type="radio"
                                id="FilterHospital"
                                value="Hospital"
                                checked={selectedFilter === 'Hospital'}
                                onChange={handleRadioChange}
                            />
                        </div>
                    </Form.Group>
                    {selectedFilter && (
                        <Form.Group>
                            <Form.Label className='fontRegular'>{selectedFilter}</Form.Label>
                          
                            {selectedFilter == 'Role' && (
                                <MultiSelectCheckbox options={role_list} onChangeFn={handleRoleChange} isSelectMultiselect={true} selectedValue={roleSelectedOptions} />
                            )} 
                            {selectedFilter == 'Hospital' && (
                            <MultiSelectCheckbox options={hospital} onChangeFn={handleHospitalChange} isSelectMultiselect={true} selectedValue={hospitalSelectedOptions}/>
                            )} 
                            {selectedFilter == 'Specialty' && (
                            <MultiSelectCheckbox options={speciality} onChangeFn={handleSpecialityChange} isSelectMultiselect={true} selectedValue={specialtySelectedOptions}/>
                            )} 
                            {selectedFilter == 'Sub-Specialty' && (
                            <MultiSelectCheckbox options={sub_speciality} onChangeFn={handleSubSpecialityChange} isSelectMultiselect={true} selectedValue={subSpecialtySelectedOptions}/>
                            )} 
                         
                        </Form.Group>
                    )}
                    <Button className={`default-btn w-100 mt-48 ${isLoading ? 'disabled_submit_btn' : ''}`} type="submit" disabled={isLoading}>
                        {isLoading && (
                            <Image
                              src="/images/loading_icon.png"
                              className="buttonLoaderIcon"
                              width={16}
                              height={16}
                              alt="Loading Icon"
                              placeholder="empty"
                              loading="eager"
                              quality={100}
                            />
                          )}
                        Filter
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

        {/* Hospitals List Modal */}
        <Modal show={hospitalShow} onHide={() => setHospitalShow(false)} centered>
            <Modal.Header closeButton className='text-center justify-content-center flex-column'>
                <Modal.Title>{hospitalShowData?.name}</Modal.Title>
                <p>{hospitalShowData?.specialist}</p>
            </Modal.Header>
            <Modal.Body className={`${styles.HospitalModalBody}`}>
                <div className={`${styles.ModalInnerData} bg-white radius-24 ModalInnerSpace text-center`}>
                    <h4>Hospitals :</h4>
                    <ul className={`${styles.HospitalLists}`}>
                        {hospitalShow && hospitalShowData?.hospital && Array.isArray(hospitalShowData.hospital) ? (
                            <>
                            {hospitalShowData.hospital.map((data, index) => (
                                <li key={index}>{data}</li>
                            ))}
                            </>
                            ) :'' }
                    </ul>
                </div>
            </Modal.Body>
        </Modal>

        {/* User Information Modal For Mobile */}
        <Modal show={userInformationShow} onHide={() => setUserInformationShow(false)} className='bottomSlideModalMob'>
            <Modal.Header closeButton className='headerBlankMobile'></Modal.Header>
            <Modal.Body className={`${styles.UserInfomationBody}`}>
                <div className={`${styles.UserInfomationTop} d-flex align-items-center justify-content-between mb-3`}>
                    <h5 className='ps-2'>User Information's</h5>
                    <div className={`${styles.topBothBtn}`}>
                        <Button className='default-btn2-wicon'  onClick={() => handleEditUser(mobileUserData?.allData?.uuid)} >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M15.8695 6.16764C16.1845 5.85264 16.3579 5.43431 16.3579 4.98931C16.3579 4.54431 16.1845 4.12598 15.8695 3.81098L14.5479 2.48931C14.2329 2.17431 13.8145 2.00098 13.3695 2.00098C12.9245 2.00098 12.5062 2.17431 12.192 2.48848L3.33203 11.321V15.0001H7.00953L15.8695 6.16764ZM13.3695 3.66764L14.692 4.98848L13.367 6.30848L12.0454 4.98764L13.3695 3.66764ZM4.9987 13.3335V12.0126L10.8654 6.16431L12.187 7.48598L6.3212 13.3335H4.9987ZM3.33203 16.6668H16.6654V18.3335H3.33203V16.6668Z" fill="white"/>
                            </svg>
                        </Button>
                        <Button className='outlibe-btn-wicon hoverLightRed' onClick={() => handleDeleteUser(mobileUserData?.allData?.uuid)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M1.66797 5.00033C1.66797 4.54009 2.04106 4.16699 2.5013 4.16699H17.5013C17.9615 4.16699 18.3346 4.54009 18.3346 5.00033C18.3346 5.46056 17.9615 5.83366 17.5013 5.83366H2.5013C2.04106 5.83366 1.66797 5.46056 1.66797 5.00033Z" fill="#CC3229"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.33203 2.49967C8.11102 2.49967 7.89906 2.58747 7.74278 2.74375C7.58649 2.90003 7.4987 3.11199 7.4987 3.33301V4.99967C7.4987 5.45991 7.1256 5.83301 6.66536 5.83301C6.20513 5.83301 5.83203 5.45991 5.83203 4.99967V3.33301C5.83203 2.66997 6.09542 2.03408 6.56426 1.56524C7.03311 1.0964 7.66899 0.833008 8.33203 0.833008H11.6654C12.3284 0.833008 12.9643 1.0964 13.4331 1.56524C13.902 2.03408 14.1654 2.66997 14.1654 3.33301V4.99967C14.1654 5.45991 13.7923 5.83301 13.332 5.83301C12.8718 5.83301 12.4987 5.45991 12.4987 4.99967V3.33301C12.4987 3.11199 12.4109 2.90003 12.2546 2.74375C12.0983 2.58747 11.8864 2.49967 11.6654 2.49967H8.33203ZM4.16536 4.16634C4.6256 4.16634 4.9987 4.53944 4.9987 4.99967V16.6663C4.9987 16.8874 5.0865 17.0993 5.24278 17.2556C5.39906 17.4119 5.61102 17.4997 5.83203 17.4997H14.1654C14.3864 17.4997 14.5983 17.4119 14.7546 17.2556C14.9109 17.0993 14.9987 16.8874 14.9987 16.6663V4.99967C14.9987 4.53944 15.3718 4.16634 15.832 4.16634C16.2923 4.16634 16.6654 4.53944 16.6654 4.99967V16.6663C16.6654 17.3294 16.402 17.9653 15.9331 18.4341C15.4643 18.9029 14.8284 19.1663 14.1654 19.1663H5.83203C5.16899 19.1663 4.5331 18.9029 4.06426 18.4341C3.59542 17.9653 3.33203 17.3294 3.33203 16.6663V4.99967C3.33203 4.53944 3.70513 4.16634 4.16536 4.16634Z" fill="#CC3229"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.33333 8.33301C8.79357 8.33301 9.16667 8.7061 9.16667 9.16634V14.1663C9.16667 14.6266 8.79357 14.9997 8.33333 14.9997C7.8731 14.9997 7.5 14.6266 7.5 14.1663V9.16634C7.5 8.7061 7.8731 8.33301 8.33333 8.33301Z" fill="#CC3229"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M11.6654 8.33301C12.1256 8.33301 12.4987 8.7061 12.4987 9.16634V14.1663C12.4987 14.6266 12.1256 14.9997 11.6654 14.9997C11.2051 14.9997 10.832 14.6266 10.832 14.1663V9.16634C10.832 8.7061 11.2051 8.33301 11.6654 8.33301Z" fill="#CC3229"/>
                            </svg>
                        </Button>
                    </div>
                </div>
                <ul className={`${styles.userDataList}`}>
                    <li>
                        <div>
                            <p className='mb-1'>Name</p>
                            <h6>{mobileUserData?.allData?.full_name}</h6>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p className='mb-1'>Specialty</p>
                            <h6>{mobileUserData?.allData?.speciality}</h6>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p className='mb-1'>Sub-Specialist</p>
                            <h6>{mobileUserData?.allData?.sub_speciality}</h6>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p className='mb-1'>Hospitals :</p>
                            {mobileUserData && mobileUserData?.hospital && Array.isArray(mobileUserData.hospital) ? (
                            <>
                                {mobileUserData.hospital.map((data, index) => (
                                    <h6 key={index}>{data}</h6>
                                ))}
                            </>
                            ) :'' }
                        </div>
                    </li>
                </ul>
            </Modal.Body>
        </Modal>
        
     {/* User deleted successfully Modal */}
     <SuccessModalComponent sucessModelShow={sucessModelShow} setSucessModelShow={setSucessModelShow}  sucessModelMessage={sucessModelMessage} />

     {/* Confirm delete user Modal */}
     <Modal show={deleteUserShow} onHide={() => setDeleteUserShow(false)} centered className='bottomSlideModalMob'>
            <Modal.Header className='min-height80 headerBlankMobile'></Modal.Header>
            <Modal.Body>
                <div className='text-center'>
                    <span className='disclaimer-icon mb-4'><Image src="/images/disclaimer-circle.svg" alt='Disclaimer Icon' width={38} height={38} quality={100} /></span>
                    <h5 className='mb-20 fontRegular'>Are you sure you want to delete this user ?</h5>
                    {/* <p className='mb-25'>Are you sure you want to delete this user.</p> */}
                    <div className='d-flex justify-content-center gap-3 gap-md-4'>
                        <Button className='default-btn-red' onClick={ClosesetDeleteUserShow}>
                            Delete
                        </Button>
                        <Button className='outlibe-btn-red' onClick={() =>setDeleteUserShow(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </Layout>

  )
}

export default userRoles
