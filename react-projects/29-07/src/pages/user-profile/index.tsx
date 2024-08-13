import Layout from '@/components/Layout';
import React, { useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react';
import styles from "./user-profile.module.css";
import { Button, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import axios, { AxiosError } from "axios";
import { z } from "zod";
import MultiSelectCheckbox from '@/components/MultiSelectComponent';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SuccessModalComponent from '@/components/SuccessModalComponent';
import { useRouter } from 'next/router';
import CryptoJS from 'crypto-js';

interface UserData {
  _id?: string;
  email?: string;
  name?: string;
  country?: string;
  token?: string;
  gender?: number;
}
const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || 'your_secret_key';
const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};
const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const formSchema = z.object({
    full_name: z.string().min(1, 'The name is required'),
    user_email: z.string().email({ message: 'Invalid email address' }).min(1, 'The email field is required'),
    speciality: z.any().refine((value) => value !== null && value !== undefined && value !== '', {
      message: 'The speciality is required',
    }),
    sub_speciality: z.any().refine((value) => value !== null && value !== undefined && value !== '', {
      message: 'The sub speciality is required',
    }),
    password: z.string().optional().refine((value) => !value || value.length >= 8, {
      message: 'Password must be at least 8 characters long',
    }),
  });
type FormData = z.infer<typeof formSchema>;
const formDeleteProfileSchema = z.object({
  confirm_password: z.string().optional().refine((value) => value !== null && value !== undefined && value !== '', {
      message: 'The password is required',
    }),
  });
type formDeleteProfile = z.infer<typeof formDeleteProfileSchema>;
type SelectedOption = any;

const UserProfile = () => {
   
    // get token 
    const router = useRouter();
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
   const [loggedInUserData, setLoggedInUserData] = useState({});
   const [isTokenExist, setIsTokenExist] = useState<any>(null);
    // Check if logged in or not
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          const encryptedUser = localStorage.getItem('encryptedUser');
          if(token == '' || token == undefined || token == null){
            router.push('/login');
          }else{
            setIsTokenExist(token);
            if(encryptedUser) {
              const decrypted = decryptData(encryptedUser);
              setLoggedInUserData(JSON.parse(decrypted));
            }
          }     
        }catch (error) {
          router.push('/login');
        }
      };
      fetchProfile();
    }, [router, isTokenExist]);
// Check if logged in or not

    const [fullPageLoading, setFullPageLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userUuid, setUserUuid] = useState<any>();
    const [sucessModelShow, setSucessModelShow] = useState(false);
    const [sucessModelMessage, setSucessModelMessage] = useState<any>();
    const [confirmPassShow, setConfirmPassShow] = useState(false);    
    const [deleteUserShow, setDeleteUserShow] = useState(false);   

    const [role_list, setRoleList] = useState<SelectedOption[]>([]);
    const [trust, setTrust] = useState<SelectedOption[]>([]);
    const [hospital, setHospital] = useState<SelectedOption[]>([]);
    const [speciality, setSpeciality] = useState<SelectedOption[]>([]);
    const [sub_speciality, setSubSpeciality] = useState<SelectedOption[]>([]);

    const [formData, setFormData] = useState<FormData>({full_name:'', user_email: '', speciality:'', sub_speciality:'',  password: '' });
    const [formDeleteProfile, setFormDeleteProfile] = useState<formDeleteProfile>({confirm_password:''});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [errorsd, setErrorsd] = useState<Record<string, string>>({});

    // selected Value
      const [trustSelectedOptions, setTrustSelectedOptions] = useState<{ value: any; label: string }[]>([]);
      const [roleSelectedOptions, setRoleSelectedOptions] = useState<{ value: any; label: string }[]>([]);
      const [hospitalSelectedOptions, setHospitalSelectedOptions] = useState<{ value: any; label: string }[]>([]);
      const [specialtySelectedOptions, setSpecialtySelectedOptions] = useState<{ value: any; label: string }[]>([]);
      const [subSpecialtySelectedOptions, setsubSpecialtySelectedOptions] = useState<{ value: any; label: string }[]>([]);
  // selected Value

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
}; 
  const handleTrustChange = (selectedOptions: any) => { };
  const handleHospitalChange = (selectedOptions: any) => { };
  const handleRoleChange = (selectedOptions: any) => {};
    
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

  // get all sub Speciality
  const getAllSubSpecialty  = async (specialty_id: any) => {
    try {
      let get_sub_speciality_list =  await axios.get(`${apiUrl}/get-sub-specialities/${specialty_id}`, { responseType: 'json' });
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
  const handleSpecialityChange = (selectedOptions: any) => {
        setSubSpeciality([]);
        setSpecialtySelectedOptions(selectedOptions);
        setFormData({ ...formData, 'speciality':'', 'sub_speciality': '' });
        if(selectedOptions.value > 0){
          getAllSubSpecialty(selectedOptions.value);
          setFormData({ ...formData, 'speciality': selectedOptions.value });
        }
  };
 // get all sub Speciality

  // sub Speciality 
  const handleSubSpecialityChange = (selectedOptions: any) => {
    setsubSpecialtySelectedOptions(selectedOptions);
    setFormData({ ...formData, 'sub_speciality': '' });
    if(selectedOptions.value > 0){
      setFormData({ ...formData, 'sub_speciality': selectedOptions.value });
    }
  };
  // sub Speciality 

    // get profile data
 const getSingleUser  = async () => {
  if (isTokenExist) {
    setFullPageLoading(true);
    try {
      let get_User =  await axios.get(`${apiUrl}/me`, { responseType: 'json' ,
        headers: {
            'Authorization': `Bearer ${isTokenExist}`
          }
      });    
      if(get_User?.data?.user_details) {   
         const userD  = get_User?.data.user_details;
         const hospitalOptions = userD.hospital;
         setFormData({ ...formData, 'full_name': userD.full_name, 'user_email':userD.user_email,'speciality':userD.speciality ,'sub_speciality':userD.sub_speciality});
         setUserUuid(userD.uuid);
         getAllSubSpecialty(userD.speciality);  
         const HospitaloptionsArray:any = Object.entries(hospitalOptions).map(([key, value]) => ({
          value: key,
          label: value,
        }));
          
         setTrustSelectedOptions([{ value: userD?.trust, label: userD?.trust_name }]);
         setRoleSelectedOptions([{ value: userD?.primary_role, label: userD?.role_name }]);
         setHospitalSelectedOptions(HospitaloptionsArray);
         setSpecialtySelectedOptions([{ value: userD?.speciality, label: userD?.speciality_name }]);
         setsubSpecialtySelectedOptions([{ value: userD?.sub_speciality, label: userD?.sub_speciality_name }]);
      } 
    } catch (error) {
      console.error('Error fetching:', error);
    }finally{
      setFullPageLoading(false);
    }  
  }
  }
  useEffect(() => {
      setUserUuid('');
      getAllSpecialty();
      getSingleUser();  
    },[apiUrl, router, isTokenExist]);
  // get profile data 


const handleSubmit  = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path.length > 0) {
          newErrors[error.path[0]] = error.message;
        }
      });
      setErrors(newErrors);
    } else {
      setErrors({});
      setIsLoading(true);  
      try {
        if(isTokenExist) {
          let response =  await axios.post(`${apiUrl}/update-profile`, {
            full_name:formData.full_name,
            user_email:formData.user_email,
            password:formData.password,
            // trust:formData.trust,
            // role:formData.role,
            // hospital:formData.hospital,
            speciality:formData.speciality,
            sub_speciality:formData.sub_speciality,
          }, { responseType: 'json' ,
            headers: {
                'Authorization': `Bearer ${isTokenExist}`
              }
          });
          setIsLoading(false);
          setSucessModelShow(true); 
          let updatedData = response.data.data.data;
          const getUserData:any = localStorage.getItem('encryptedUser');
          const decrypted = decryptData(getUserData);
          let localStorageData = JSON.parse(decrypted);
              localStorageData = updatedData;
          const encryptedUser = encryptData(JSON.stringify(localStorageData));
          localStorage.setItem('encryptedUser', encryptedUser);
          setSucessModelMessage("User's information has been edited successfully");
          setTimeout(() => {
            router.reload();
            // setSucessModelShow(false); 
          }, 1500);
        }
      } catch (error:any) {
            setIsLoading(false);
            if (error.response && error.response.data.errors) {
                var all_error = JSON.stringify(error.response?.data?.errors);
                setErrors(JSON.parse(all_error));
            }else if(error.response.data.error){
              const form_error = JSON.stringify( {"form_error": [error.response.data.error.message]})
              setErrors(JSON.parse(form_error) );
            } else {
              const form_error = JSON.stringify( {"form_error": ['An error occurred during process. Try again!']})
              setErrors(JSON.parse(form_error) );
            }

            // session out error hander 
            if (axios.isAxiosError(error)) {
              const axiosError = error as AxiosError<{ message: string }>;            
              if(axiosError?.response?.data?.message == "Unauthenticated."){
                localStorage.removeItem('encryptedUser');
                localStorage.removeItem('token');
                router.push('/login');
              }
            }
          // session out error hander  
      }      
    }
  };
// for Edit 



// delete profile 
const handleClose = () => setDeleteUserShow(false);
const ClosesetDeleteUserShow = () => {
    setDeleteUserShow(false);
    setConfirmPassShow(true);
    setFormDeleteProfile({ ...formDeleteProfile, 'confirm_password':''});
}
const handleChangePasswordDelete = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDeleteProfile({ ...formDeleteProfile, [name]:value});
};

// download user data 


const downloadUserData = async () => {
    try {
      if(isTokenExist){
        let response =  await axios.get(`${apiUrl}/users/export`, {  responseType: 'blob',
          headers: {
              'Authorization': `Bearer ${isTokenExist}`
            }
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'user_data.xlsx'); // Set the file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setSucessModelShow(true); 
        setSucessModelMessage("Information’s has been download successfully");
        setTimeout(() => {
            setSucessModelShow(false); 
        }, 1500);
      }
    } catch (error:any) {
          toast.error('Something went wrong...');
          // session out error hander 
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string }>;            
            if(axiosError?.response?.data?.message == "Unauthenticated."){
              localStorage.removeItem('encryptedUser');
              localStorage.removeItem('token');
              router.push('/login');
            }
          }
        // session out error hander 
    }      
 
};

const deleteProfileForm  = async (e: FormEvent<HTMLFormElement>) => {
    if(userUuid != ''){
        e.preventDefault();
        const result = formDeleteProfileSchema.safeParse(formDeleteProfile);
        
        if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.error.errors.forEach((error) => {
            if (error.path.length > 0) {
            newErrors[error.path[0]] = error.message;
            }
        });
        setErrorsd(newErrors);
        } else {
        setErrorsd({});
        try {  
          if (isTokenExist){  
            let response =  await axios.post(`${apiUrl}/user/delete/${userUuid}`, {
                confirm_password:formDeleteProfile.confirm_password, 
                type:"confirm" 
            }, { 
                responseType: 'json', 
                headers: { 'Authorization': `Bearer ${isTokenExist}`} 
            });
            setConfirmPassShow(false);
            setSucessModelShow(true); 
            setSucessModelMessage("Profile has been deleted successfully");
            setTimeout(async  () => {
                setSucessModelShow(false); 
                localStorage.removeItem('encryptedUser');
                localStorage.removeItem('token');
                router.push('/login');
            }, 1500);
          }
        } catch (error:any) {
            if(error.response && error.response.data.errors) {
                var all_error = JSON.stringify(error.response?.data?.errors);
                setErrorsd(JSON.parse(all_error));
            }else if(error.response.data.error){
            const form_error = JSON.stringify( {"form_error": [error.response.data.error.message]})
            setErrorsd(JSON.parse(form_error) );
            } else {
            const form_error = JSON.stringify( {"form_error": ['An error occurred during process. Try again!']})
            setErrorsd(JSON.parse(form_error) );
            }                
            // session out error hander 
            if (axios.isAxiosError(error)) {
              const axiosError = error as AxiosError<{ message: string }>;            
              if(axiosError?.response?.data?.message == "Unauthenticated."){
                  localStorage.removeItem('encryptedUser');
                  localStorage.removeItem('token');
                  router.push('/login');
              }
            }
          // session out error hander 
        }      
      }
    }
};
// delete profile 

  return (
   
    <Layout>
        <ToastContainer position="top-right" />
        <div className={`${styles.UserProfile}`}>
            <div className={`${styles.ProfileHeader}`}>
                <div className={`${styles.ProfileImage} text-center position-relative mb-2`}>
                    <Image src="/images/user-large.svg" alt='User Profile' width={75} height={75} quality={100} />
                    {userUuid !== "" && (
                    <Link href="#" className={`${styles.DownloadUserData} d-md-none`} onClick={downloadUserData}>
                        <Image src="/images/download-icon.svg" width={20} height={20} alt="Download Icon" quality={100} />
                    </Link>
                     )}

                    {userUuid !== "" && (
                    <Dropdown className={`${styles.ProfileEdit} d-none d-md-block`}>
                        <Dropdown.Toggle className="DropiconNone">
                            <Image src="/images/vertical-dots.svg" width={20} height={20} alt="Dropdown Icon" quality={100} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="InnerDropDown" align="end">
                            <Dropdown.Item className='d-flex align-items-center' onClick={downloadUserData}><Image src="/images/download-icon.svg" width={24} height={24} alt="Download Icon" quality={100} />Download user data</Dropdown.Item>
                            <Dropdown.Item className='d-flex align-items-center color-red' onClick={() => setDeleteUserShow(true)}><Image src="/images/trash-icon.svg" width={24} height={24} alt="Delete Icon" quality={100} />Delete</Dropdown.Item>
                         </Dropdown.Menu>
                    </Dropdown>
                     )}
                </div>
                <h5 className='text-center'>{formData.full_name}</h5>
                <h6 className='text-center fontRegular my-2'>{specialtySelectedOptions.length > 0 ? specialtySelectedOptions[0].label : ''} </h6>
                <p className='text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className={`${styles.ProfileBody}`}>
                <Form className={`${styles.ProfileBodyRow} row`} onSubmit={handleSubmit}>
                    <Form.Group className="mb-25 col-md-6">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="full_name" value={formData.full_name}  onChange={handleChange} autoComplete="false"/>
                        {errors.full_name && <div className='error text-danger'>{errors.full_name}</div>}
                    </Form.Group>
                    <Form.Group className="mb-25 col-md-6">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="user_email" value={formData.user_email}  onChange={handleChange} autoComplete="false" />
                        {errors.user_email && <div className='error text-danger'> {errors.user_email}</div>}
                    </Form.Group>

                    <Form.Group className="mb-25 col-md-6">
                        <Form.Label>Trust</Form.Label> 
                            <MultiSelectCheckbox options={trust}  onChangeFn={handleTrustChange} 
                             selectedValue={trustSelectedOptions}  isDisabledSelect={true}
                            />
                            {errors.trust && <div className='error text-danger'>{errors.trust}</div>}
                      </Form.Group> 

                      <Form.Group className="mb-25 col-md-6">
                        <Form.Label>Role</Form.Label> 
                            <MultiSelectCheckbox options={role_list} onChangeFn={handleRoleChange} selectedValue={roleSelectedOptions} isDisabledSelect={true} />
                            {errors.role && <div className='error text-danger'>{errors.role}</div>}
                      </Form.Group> 

                      <Form.Group className="mb-25 col-md-6">
                        <Form.Label>Hospitals</Form.Label> 
                          <MultiSelectCheckbox options={hospital} onChangeFn={handleHospitalChange} isSelectMultiselect={true} selectedValue={hospitalSelectedOptions} isDisabledSelect={true}/>
                          {errors.hospital && <div className='error text-danger'>{errors.hospital}</div>}
                      </Form.Group> 

                      <Form.Group className="mb-25 col-md-6">
                        <Form.Label>Speciality</Form.Label> 
                          <MultiSelectCheckbox options={speciality} onChangeFn={handleSpecialityChange} selectedValue={specialtySelectedOptions} />
                          {errors.speciality && <div className='error text-danger'>{errors.speciality}</div>}
                      </Form.Group>  

                      <Form.Group className="mb-25 col-md-6">
                      <Form.Label>Sub-Speciality</Form.Label>
                        <MultiSelectCheckbox options={sub_speciality} onChangeFn={handleSubSpecialityChange} selectedValue={subSpecialtySelectedOptions}/>
                        {errors.sub_speciality && <div className='error text-danger'>{errors.sub_speciality}</div>}
                      </Form.Group>  
                   
                    <Form.Group className="mb-25 col-md-6">
                        <div className='PrefixElement position-relative'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"  name="password" value={formData.password}  onChange={handleChange}  autoComplete="current-passwords" />
                            <span className='prefixIcon'><Image src="/images/lock-icon.svg" alt='Lock' width={24} height={24} quality={100} /></span>
                            { errors.password && <div className='error text-danger'> {errors.password}</div>}
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-25 col-md-12">
                    { errors.form_error &&  <div className='error text-danger'> {errors.form_error} </div> }
                    </Form.Group>

                    <Button className={`${styles.ProfileSaveBtn} default-btn mt-30 ${isLoading ? 'disabled_submit_btn' : ''}`} type="submit" disabled={isLoading}>
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
                        Save
                    </Button>
                    
                    {userUuid !== "" && (
                    <Button type='button' className='default-btn-red-wicon d-md-none w-100 mt-24' onClick={() => setDeleteUserShow(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.16797 5.00033C2.16797 4.54009 2.54106 4.16699 3.0013 4.16699H18.0013C18.4615 4.16699 18.8346 4.54009 18.8346 5.00033C18.8346 5.46056 18.4615 5.83366 18.0013 5.83366H3.0013C2.54106 5.83366 2.16797 5.46056 2.16797 5.00033Z" fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.83203 2.49967C8.61102 2.49967 8.39906 2.58747 8.24278 2.74375C8.08649 2.90003 7.9987 3.11199 7.9987 3.33301V4.99967C7.9987 5.45991 7.6256 5.83301 7.16536 5.83301C6.70513 5.83301 6.33203 5.45991 6.33203 4.99967V3.33301C6.33203 2.66997 6.59542 2.03408 7.06426 1.56524C7.53311 1.0964 8.16899 0.833008 8.83203 0.833008H12.1654C12.8284 0.833008 13.4643 1.0964 13.9331 1.56524C14.402 2.03408 14.6654 2.66997 14.6654 3.33301V4.99967C14.6654 5.45991 14.2923 5.83301 13.832 5.83301C13.3718 5.83301 12.9987 5.45991 12.9987 4.99967V3.33301C12.9987 3.11199 12.9109 2.90003 12.7546 2.74375C12.5983 2.58747 12.3864 2.49967 12.1654 2.49967H8.83203ZM4.66536 4.16634C5.1256 4.16634 5.4987 4.53944 5.4987 4.99967V16.6663C5.4987 16.8874 5.5865 17.0993 5.74278 17.2556C5.89906 17.4119 6.11102 17.4997 6.33203 17.4997H14.6654C14.8864 17.4997 15.0983 17.4119 15.2546 17.2556C15.4109 17.0993 15.4987 16.8874 15.4987 16.6663V4.99967C15.4987 4.53944 15.8718 4.16634 16.332 4.16634C16.7923 4.16634 17.1654 4.53944 17.1654 4.99967V16.6663C17.1654 17.3294 16.902 17.9653 16.4331 18.4341C15.9643 18.9029 15.3284 19.1663 14.6654 19.1663H6.33203C5.66899 19.1663 5.0331 18.9029 4.56426 18.4341C4.09542 17.9653 3.83203 17.3294 3.83203 16.6663V4.99967C3.83203 4.53944 4.20513 4.16634 4.66536 4.16634Z" fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.83333 8.33301C9.29357 8.33301 9.66667 8.7061 9.66667 9.16634V14.1663C9.66667 14.6266 9.29357 14.9997 8.83333 14.9997C8.3731 14.9997 8 14.6266 8 14.1663V9.16634C8 8.7061 8.3731 8.33301 8.83333 8.33301Z" fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.1654 8.33301C12.6256 8.33301 12.9987 8.7061 12.9987 9.16634V14.1663C12.9987 14.6266 12.6256 14.9997 12.1654 14.9997C11.7051 14.9997 11.332 14.6266 11.332 14.1663V9.16634C11.332 8.7061 11.7051 8.33301 12.1654 8.33301Z" fill="white"/>
                        </svg>Delete
                    </Button>
                    )}
                </Form>
            </div>
        </div>

        {/* Confirm delete user Modal */}
        <Modal show={deleteUserShow} onHide={() => setDeleteUserShow(false)} centered className='bottomSlideModalMob'>
            <Modal.Header className='min-height80 headerBlankMobile'></Modal.Header>
            <Modal.Body>
                <div className='text-center'>
                    <span className='disclaimer-icon mb-4'><Image src="/images/disclaimer-circle.svg" alt='Disclaimer Icon' width={38} height={38} quality={100} /></span>
                    <h5 className='mb-20 fontRegular'>Are you sure you want to delete your profile?</h5>
                    {/* <h6 className='text-center fontRegular my-2'> {specialtySelectedOptions.length > 0 ? specialtySelectedOptions[0].label : ''}</h6> */}
                    <p className='mb-25'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div className='d-flex justify-content-center gap-3 gap-md-4'>
                        <Button type='button' className='default-btn-red' onClick={ClosesetDeleteUserShow}>
                            Delete
                        </Button>
                        <Button type='button' className='outlibe-btn-red' onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

        {/* Confirm password Modal */}
        <Modal show={confirmPassShow} onHide={() => setConfirmPassShow(false)} centered className='bottomSlideModalMob'>
            <Modal.Header closeButton className='min-height80 headerBlankMobile'></Modal.Header>
            <Modal.Body>
                <h5 className='mb-20 fontRegular'>Please: Enter the password to confirm deleting</h5>
                <Form  onSubmit={deleteProfileForm}>
                    <Form.Group className="mb-40">
                        <div className='PrefixElement position-relative'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={formDeleteProfile.confirm_password} name="confirm_password" onChange={handleChangePasswordDelete} />
                            <span className='prefixIcon'><Image src="/images/lock-icon.svg" alt='Lock' width={24} height={24} quality={100} /></span>
                        </div>
                        { errorsd.confirm_password && <div className='error text-danger'> {errorsd.confirm_password}</div>} 
                        { errorsd.form_error &&  <div className='error text-danger'> {errorsd.form_error} </div> }
                     </Form.Group>
                    <Button className="default-btn2 w-100" type="submit">
                        Confirm
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

        <SuccessModalComponent sucessModelShow={sucessModelShow} setSucessModelShow={setSucessModelShow}  sucessModelMessage={sucessModelMessage} />
    </Layout>
  )
}

export default UserProfile
