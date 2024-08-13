import React, { useEffect, useRef, useState, ChangeEvent, FormEvent  } from 'react';
import styles from "../../pages/user-roles/user-roles.module.css";
import { Button, Dropdown, Form, Modal} from 'react-bootstrap';
import Image from 'next/image';
import { z } from "zod";
import axios, { AxiosError } from "axios";
import MultiSelectCheckbox from '@/components/MultiSelectComponent';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

interface UserData {
  _id?: string;
  email?: string;
  name?: string;
  country?: string;
  token?: string;
  gender?: number;
}

interface UserRegisterProps {
    adduserShow: boolean;
    setAdduserShow : any;
    setSucessModelShow : any;
    setSucessModelMessage : any;
    setNewUserCreate : any;
    apiUrl : any;
    loginUserRoleId : any;
    loginUserAllData : any;
    isTokenExits : any;
  }

  const formSchema = z.object({
    full_name: z.string().min(1, 'Name is required'),
    user_email: z.string().email({ message: 'Invalid email address' }).min(1, 'Email is required'),
    trust: z.any().refine((value) => value !== null && value !== undefined && value !== '', {
      message: 'The Trust is required',
    }),
    role: z.any().refine((value) => value !== null && value !== undefined && value !== '', {
      message: 'The role is required',
    }),
    speciality: z.any().refine((value) => value !== null && value !== undefined && value !== '', {
      message: 'The speciality is required',
    }),
    sub_speciality: z.any().refine((value) => value !== null && value !== undefined && value !== '', {
      message: 'The sub speciality is required',
    }),
    hospital: z.any().refine((value) => value !== null && value !== undefined && value !== '', {
      message: 'The hospital is required',
    }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).min(1, 'Password is required')
  });
type FormData = z.infer<typeof formSchema>;

type SelectedOption = any;

 const UserRegister : React.FC<UserRegisterProps> = ({ adduserShow, setAdduserShow, apiUrl,setSucessModelShow, setSucessModelMessage,setNewUserCreate, loginUserRoleId, loginUserAllData, isTokenExits })  => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

    const [role_list, setRoleList] = useState<SelectedOption[]>([]);
    const [trust, setTrust] = useState<SelectedOption[]>([]);
    const [hospital, setHospital] = useState<SelectedOption[]>([]);
    const [speciality, setSpeciality] = useState<SelectedOption[]>([]);
    const [sub_speciality, setSubSpeciality] = useState<SelectedOption[]>([]);

    // selected Value
    const [roleSelectedOptions, setRoleSelectedOptions] = useState<{ value: any ; label: string }[]>([]);
    const [trustSelectedOptions, setTrustSelectedOptions] = useState<{ value: any; label: string }[]>([]);
    const [hospitalSelectedOptions, setHospitalSelectedOptions] = useState<{ value: any; label: string }[]>([]);
    const [specialtySelectedOptions, setSpecialtySelectedOptions] = useState<{ value: any; label: string }[]>([]);
    const [subSpecialtySelectedOptions, setsubSpecialtySelectedOptions] = useState<{ value: any; label: string }[]>([]);
    // selected Value

    const [formData, setFormData] = useState<FormData>({full_name:'', user_email: '', trust:'',role:'', speciality:'', sub_speciality:'', hospital:'', password: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
   
  const clearForm  = () => {
      setFormData({ ...formData, 'full_name': '', 'user_email': '', 'trust':'','role':'', 'speciality':'', 'sub_speciality':'', 'hospital':'', 'password': '' });
      setErrors({});
      setRoleSelectedOptions([{ value:'', label: ''}]);
      setTrustSelectedOptions([{ value:'', label: ''}]);
      setHospitalSelectedOptions([]);
      setSpecialtySelectedOptions([{ value:'', label: ''}]);
      setsubSpecialtySelectedOptions([{ value:'', label: ''}]);
  }
  useEffect(()=>{
    clearForm();
  },[adduserShow]);

    // get all Roles 
    const getRoles  = async () => {
      setRoleList([]);
      if (isTokenExits) {
        try {
          let get_role_list =  await axios.get(`${apiUrl}/get-roles`,
             { responseType: 'json', 
              headers: {
                'Authorization': `Bearer ${isTokenExits}`
              }
            }
          );    
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
        } catch (error:any) {
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
    // get all trust 
    const getTrustName  = async () => {
      setTrust([]);
      if(loginUserRoleId === Number(process.env.NEXT_PUBLIC_SYSTEM_ADMIN_ID)){
        try {
          let get_trust_list =  await axios.get(`${apiUrl}/get-trusts`, { responseType: 'json' });    
        if(get_trust_list?.data?.data) {   
            const trustOptions  = get_trust_list?.data?.data;
            if(trustOptions){
                const trustArray = Object.entries(trustOptions).map(([key, value]) => ({
                  value: key,
                  label: value,
                }));
                setTrust(trustArray); 
            }  
          } 
        } catch (error) {
          console.error('Error fetching:', error);
        } 
      }
    }
    // get all trust 

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

    useEffect(() => {
            getRoles();
            getTrustName();
            getAllSpecialty();
    }, []);

     // for  select option 

     //  Role 
     const handleRoleChange = (selectedOptions: any) => {
        setRoleSelectedOptions(selectedOptions);
        setFormData({ ...formData, 'role': '' });
        if(selectedOptions.value > 0){
          setFormData({ ...formData, 'role': selectedOptions.value });
        }
      };
    // Role 


     // get all Hospital 
      const getAllHospitals  = async (trust_id: string) => {
        if(loginUserRoleId === Number(process.env.NEXT_PUBLIC_SYSTEM_ADMIN_ID) || loginUserRoleId === Number(process.env.NEXT_PUBLIC_TRUST_ADMIN_ID)){
          try {
            let get_hopital_list =  await axios.get(`${apiUrl}/get-hospitals/${trust_id}`, { responseType: 'json' });
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
      const handleTrustChange = (selectedOptions: any) => {
        setTrustSelectedOptions(selectedOptions);
        setHospitalSelectedOptions([]);
        setHospital([]);
        setFormData({ ...formData, 'trust': '', 'hospital': '' });
        if(selectedOptions.value > 0){          
          getAllHospitals(selectedOptions.value);
          setFormData({ ...formData, 'trust': selectedOptions.value });
        }
      };
     // get all Hospital 

    
      const handleHospitalChange = (selectedOptions: any) => {
        const selectedIds = (selectedOptions as { value: string; label: string }[]).map(option => option.value);
        setHospitalSelectedOptions(selectedOptions);
          setFormData({ ...formData, 'hospital': '' });
          if(selectedIds.length > 0){
            setFormData({ ...formData, 'hospital': selectedIds });
          }
      };

     // get all sub Speciality
      const getAllSubSpecialty  = async (specialty_id: string) => {
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
      

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
          setIsLoading(true);  
          setErrors({});
          if (isTokenExits) {
            try {
              let response =  await axios.post(`${apiUrl}/user/create`, {
                full_name:formData.full_name,
                user_email:formData.user_email,
                password:formData.password,
                trust:formData.trust,
                role:formData.role,
                hospital:formData.hospital,
                speciality:formData.speciality,
                sub_speciality:formData.sub_speciality,
              }, { 
                responseType: 'json', 
                headers: { 'Authorization': `Bearer ${isTokenExits}`} 
                });
                setAdduserShow(false)
                setNewUserCreate(true);
                setSucessModelShow(true);  
                setSucessModelMessage("User's information has been created successfully");    
                 
                setTimeout(() => {
                  setSucessModelShow(false); 
                  setIsLoading(false); 
                }, 1500);     
            } catch (error:any) { 
              setIsLoading(false);
              //toast.error('Something went wrong...');
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
            
              if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>;            
                if(axiosError?.response?.data?.message == "Unauthenticated."){
                    localStorage.removeItem('encryptedUser');
                    localStorage.removeItem('token');
                    router.push('/login');
                }
              } 
              
            }
          }
        }
      };

      // if user type trust admin and hospital admin 
        useEffect(() => {
          // for trust admin 
          if(loginUserAllData && loginUserRoleId === Number(process.env.NEXT_PUBLIC_TRUST_ADMIN_ID)){
              setTrustSelectedOptions([{ value: loginUserAllData?.trust, label: loginUserAllData?.trust_name }]);
              getAllHospitals(loginUserAllData?.trust);
              setFormData({ ...formData, 'trust': loginUserAllData?.trust });         
          }
          if(loginUserAllData && loginUserRoleId === Number(process.env.NEXT_PUBLIC_HOSPITAL_ADMIN_ID)){
              setTrustSelectedOptions([{ value: loginUserAllData?.trust, label: loginUserAllData?.trust_name }]);
              setFormData({ ...formData, 'trust': loginUserAllData?.trust });  
              const HospitaloptionsArray = Object.entries(loginUserAllData.hospital).map(([key, value]) => ({
                value: key,
                label: value,
              }));
              setHospital(HospitaloptionsArray); 
        }
      },[]);
      // if user type trust admin and hospital admin 

    return (
      <>
            <Modal show={adduserShow} onHide={() => setAdduserShow(false)} centered className='bottomSlideModalMob FullScreenModalMob'>
            <Modal.Header closeButton className='FullScreenHeaderMob'>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body className={`${styles.userSpace}`}>
                <Form  onSubmit={handleSubmit}>

                    <Form.Group className="mb-20">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Ex: William Brown" name="full_name" value={formData.full_name}  onChange={handleChange} autoComplete="false"/>
                         {errors.full_name && <div className='error text-danger'>{errors.full_name}</div>}
                    </Form.Group>
                    <Form.Group className="mb-20">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Ex: williambrown@example.com"  name="user_email" value={formData.user_email}  onChange={handleChange} autoComplete="false" />
                         {errors.user_email && <div className='error text-danger'> {errors.user_email}</div>}
                    </Form.Group>

                     <Form.Group className="mb-20">
                        <Form.Label>Role</Form.Label> 
                            <MultiSelectCheckbox options={role_list} onChangeFn={handleRoleChange} selectedValue={roleSelectedOptions}/>
                            {errors.role && <div className='error text-danger'>{errors.role}</div>}
                      </Form.Group>      
                            
                      <Form.Group className="mb-20">
                        <Form.Label>Trust</Form.Label> 
                            {loginUserRoleId === Number(process.env.NEXT_PUBLIC_SYSTEM_ADMIN_ID) ? (
                                <MultiSelectCheckbox options={trust} onChangeFn={handleTrustChange}  selectedValue={trustSelectedOptions}/>
                              ):(
                                <MultiSelectCheckbox options={trust} onChangeFn={handleTrustChange}  selectedValue={trustSelectedOptions} isDisabledSelect={true} />
                              )
                            }                           
                            {errors.trust && <div className='error text-danger'>{errors.trust}</div>}
                      </Form.Group>
                      <Form.Group className="mb-20">
                        <Form.Label>Speciality</Form.Label> 
                          <MultiSelectCheckbox options={speciality} onChangeFn={handleSpecialityChange} selectedValue={specialtySelectedOptions}/>
                          {errors.speciality && <div className='error text-danger'>{errors.speciality}</div>}
                      </Form.Group>

                      <Form.Group className="mb-20">
                        <Form.Label>Sub-Speciality</Form.Label>
                        <MultiSelectCheckbox options={sub_speciality} onChangeFn={handleSubSpecialityChange} selectedValue={subSpecialtySelectedOptions}/>
                        {errors.sub_speciality && <div className='error text-danger'>{errors.sub_speciality}</div>}
                      </Form.Group>  

                      <Form.Group className="mb-20">
                        <Form.Label>Hospitals</Form.Label> 
                          <MultiSelectCheckbox options={hospital} onChangeFn={handleHospitalChange} isSelectMultiselect={true} selectedValue={hospitalSelectedOptions}/>                        
                          {errors.hospital && <div className='error text-danger'>{errors.hospital}</div>}
                      </Form.Group> 

                      <Form.Group className="PrefixElement position-relative">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password"  name="password" value={formData.password} onChange={handleChange}/>
                          <span className='prefixIcon'><Image src="/images/lock-icon.svg" alt='Lock' width={24} height={24} quality={100} /></span>
                          { errors.password && <div className='error text-danger'> {errors.password}</div>}
                      </Form.Group>
                    
                    { errors.form_error &&  <div className='error text-danger'> {errors.form_error} </div> }
                    <Button className={`default-btn w-100 mt-55 size-20 min-height-48 Btnspace-low ${isLoading ? 'disabled_submit_btn' : ''}`} type="submit" disabled={isLoading}>
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
                        Add User
                    </Button>
                </Form>
            </Modal.Body>
        </Modal> 
      </>
    )
  }
  
  export default UserRegister