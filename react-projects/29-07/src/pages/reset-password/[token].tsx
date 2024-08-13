import { useRouter } from 'next/router';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styles from "@/styles/Form.module.css";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import { z } from "zod";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import PageLoader from '@/components/PageLoader';
import 'react-toastify/dist/ReactToastify.css';

const formSchema = z.object({
    password: z.string().min(8, { message: 'New password must be at least 8 characters long' }).min(1, 'The Password is required'),
    password_confirmation: z.string().min(8, { message: 'Confirmation password must be at least 8 characters long' }).min(1, 'The confirmation password is required')
  }).refine(data => data.password === data.password_confirmation, {
    message: "The password confirmation does not match.",
    path: ['password_confirmation'], 
  });
type FormData = z.infer<typeof formSchema>;

const resetPassword: React.FC = () => {
  const router = useRouter();
  const [isTokenExits, setIsTokenExits] = useState<any>('loading...');
// check is login or not   
  useEffect(() => {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          if(token == '' || token == undefined || token == null){ 
            setIsTokenExits(null);
            localStorage.removeItem('encryptedUser');
            localStorage.removeItem('token');
          } else{
            router.push('/');
          }    
        } catch (error) {
          localStorage.removeItem('encryptedUser');
          localStorage.removeItem('token');
          router.push('/login');
        }
      };
      fetchProfile();
  }, [router]);
// check is login or not 

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const { token_reset } = router.query;
const [isLoading, setIsLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [showConPassword, setShowConPassword] = useState(false);
const [formData, setFormData] = useState<FormData>({password: '', password_confirmation:'' });
const [errors, setErrors] = useState<Record<string, string>>({});

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
    setErrors({});
    setIsLoading(true);     
    try {
      let response =  await axios.post(`${apiUrl}/password/reset`, {token:token_reset,password:formData.password,password_confirmation:formData.password_confirmation}, { responseType: 'json' });
      toast.success('Password change successfully!');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error:any) {
          setIsLoading(false);
          if (error.response && error.response.data.errors) {
              var all_error = JSON.stringify(error.response?.data?.errors);
              setErrors(JSON.parse(all_error));
          }else if(error.response.data.error){
            const form_error = JSON.stringify( {"form_error": [error.response.data.error.message]})
            setErrors(JSON.parse(form_error) );
          } else {
            const form_error = JSON.stringify( {"form_error": ['An error occurred during forgot password. Try again!']})
            setErrors(JSON.parse(form_error) );
          }
    }
  }
};

  return (
    <>
    {!isTokenExits ? (    
    <div className={styles.formblocks}>
            <ToastContainer position="top-right" />
            <Container fluid>
                <Row>
                    <Col md={6} className='px-0'>
                        <div className={styles.formLeftBlog}>
                            <Link href="/" className={styles.formLogo}>
                                <Image
                                    src="/images/logo.svg"
                                    className=""
                                    width={344}
                                    height={25}
                                    alt="Floor Plan"
                                    placeholder="empty"
                                    loading="eager"
                                    quality={100}
                                />
                            </Link>
                            <h1 className='mb-1'>Welcome</h1>
                            <h2 className='fontRegular'>We're excited to have you on board.</h2>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className={styles.formRightBlog}>
                            <h3 className={styles.titles}>Reset Password</h3>
                            <h5 className='fontRegular'>Please enter your new password and confirm it.</h5>
                            <Form onSubmit={handleSubmit}>
                               
                                <Form.Group className={`mb-25 position-relative PrefixElement ${errors.password?'input_error':''}`}>
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type={showPassword ? "text" : "password"}  placeholder="Password" autoComplete="new-password" className='passwordBlock'  
                                        name="password" value={formData.password} onChange={handleChange}
                                    />
                                    <span className='prefixIcon'><Image src="/images/lock-icon.svg" alt='Lock' width={24} height={24} quality={100} /></span>
                                    <Button onClick={() => setShowPassword(!showPassword)} className='PassHideShow'>
                                        {showPassword ? <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.2509 21C20.1524 21.0001 20.0549 20.9808 19.9639 20.9431C19.8729 20.9053 19.7903 20.85 19.7208 20.7801L3.22078 4.28013C3.08606 4.13833 3.01207 3.94952 3.01457 3.75395C3.01708 3.55838 3.09588 3.37152 3.23418 3.23322C3.37248 3.09492 3.55934 3.01612 3.75491 3.01361C3.95048 3.01111 4.13929 3.0851 4.28109 3.21982L20.7811 19.7198C20.8859 19.8247 20.9573 19.9583 20.9862 20.1038C21.0151 20.2492 21.0003 20.3999 20.9435 20.5369C20.8868 20.6739 20.7907 20.791 20.6674 20.8735C20.5442 20.9559 20.3992 20.9999 20.2509 21ZM11.985 18C10.0402 18 8.16469 17.4243 6.41062 16.289C4.81359 15.2578 3.37593 13.7808 2.25281 12.0234V12.0197C3.1875 10.6804 4.21125 9.54794 5.31094 8.63482C5.32088 8.6265 5.329 8.61621 5.33477 8.6046C5.34053 8.59298 5.34383 8.5803 5.34445 8.56735C5.34506 8.5544 5.34299 8.54146 5.33835 8.52935C5.33371 8.51724 5.32661 8.50623 5.3175 8.497L4.38375 7.56466C4.36715 7.54793 4.34487 7.53806 4.32133 7.53702C4.29779 7.53598 4.27472 7.54384 4.25672 7.55903C3.08859 8.54341 2.00437 9.75091 1.01859 11.1647C0.84899 11.4081 0.755584 11.6964 0.750243 11.9931C0.744901 12.2897 0.827865 12.5812 0.988591 12.8306C2.22656 14.7679 3.81984 16.3997 5.59547 17.5486C7.59468 18.8437 9.74625 19.5 11.985 19.5C13.1934 19.4962 14.3933 19.2971 15.5381 18.9103C15.5532 18.9052 15.5668 18.8963 15.5775 18.8845C15.5882 18.8726 15.5957 18.8583 15.5993 18.8427C15.6029 18.8272 15.6025 18.811 15.5981 18.7957C15.5937 18.7803 15.5855 18.7664 15.5742 18.7551L14.5627 17.7436C14.5394 17.7208 14.5106 17.7046 14.4791 17.6964C14.4476 17.6881 14.4145 17.6883 14.3831 17.6967C13.5997 17.8984 12.794 18.0003 11.985 18ZM23.0091 11.1843C21.7687 9.26622 20.1595 7.63685 18.3558 6.472C16.3603 5.182 14.1572 4.49997 11.985 4.49997C10.7894 4.50209 9.60266 4.7054 8.47453 5.10138C8.4595 5.10661 8.44605 5.11558 8.43544 5.12745C8.42483 5.13931 8.41742 5.15368 8.41391 5.1692C8.41039 5.18473 8.41088 5.20089 8.41534 5.21616C8.41979 5.23144 8.42806 5.24534 8.43937 5.25653L9.44953 6.26669C9.47305 6.28981 9.50224 6.30631 9.53417 6.31454C9.56611 6.32277 9.59964 6.32244 9.6314 6.31357C10.3987 6.10599 11.1901 6.00055 11.985 5.99997C13.8923 5.99997 15.7622 6.58263 17.542 7.73435C19.1691 8.78435 20.6236 10.26 21.7495 12C21.7504 12.001 21.7508 12.0024 21.7508 12.0037C21.7508 12.0051 21.7504 12.0064 21.7495 12.0075C20.9322 13.2942 19.918 14.4446 18.7439 15.4167C18.7339 15.425 18.7256 15.4353 18.7198 15.4469C18.7139 15.4585 18.7106 15.4713 18.7099 15.4843C18.7092 15.4973 18.7113 15.5103 18.7159 15.5225C18.7206 15.5346 18.7277 15.5457 18.7369 15.555L19.6697 16.4873C19.6862 16.504 19.7084 16.5139 19.7318 16.515C19.7552 16.5161 19.7782 16.5084 19.7962 16.4934C21.0497 15.438 22.1347 14.1975 23.0137 12.8147C23.1691 12.571 23.2513 12.2878 23.2505 11.9988C23.2496 11.7098 23.1658 11.4271 23.0091 11.1843Z" fill="#D0DAE7"/><path d="M12.0009 7.5C11.6639 7.49982 11.3279 7.53756 10.9992 7.6125C10.9826 7.61595 10.9673 7.62383 10.9548 7.63531C10.9423 7.64679 10.9332 7.66144 10.9284 7.6777C10.9236 7.69395 10.9233 7.71121 10.9275 7.72763C10.9317 7.74405 10.9403 7.75901 10.9524 7.77094L16.23 13.0472C16.2419 13.0592 16.2569 13.0678 16.2733 13.0721C16.2897 13.0763 16.307 13.076 16.3233 13.0712C16.3395 13.0663 16.3542 13.0572 16.3656 13.0447C16.3771 13.0323 16.385 13.0169 16.3884 13.0003C16.5387 12.3413 16.5386 11.6568 16.388 10.9979C16.2375 10.3389 15.9404 9.72228 15.5189 9.19385C15.0974 8.66542 14.5623 8.23874 13.9532 7.9455C13.3442 7.65226 12.6769 7.49999 12.0009 7.5ZM7.77189 10.9528C7.75996 10.9408 7.745 10.9322 7.72858 10.9279C7.71216 10.9237 7.6949 10.924 7.67864 10.9289C7.66239 10.9337 7.64774 10.9428 7.63626 10.9553C7.62478 10.9677 7.61689 10.9831 7.61345 10.9997C7.44345 11.7424 7.4648 12.516 7.67549 13.2482C7.88617 13.9803 8.2793 14.647 8.81802 15.1857C9.35674 15.7245 10.0234 16.1176 10.7556 16.3283C11.4877 16.539 12.2614 16.5603 13.0041 16.3903C13.0207 16.3869 13.036 16.379 13.0485 16.3675C13.061 16.356 13.0701 16.3414 13.0749 16.3251C13.0797 16.3089 13.08 16.2916 13.0758 16.2752C13.0716 16.2588 13.063 16.2438 13.0509 16.2319L7.77189 10.9528Z" fill="#D0DAE7"/></svg></span> : <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M1.01759 11.1645C4.0676 6.79251 8.02225 4.5 11.9841 4.5C16.6371 4.5 20.6453 7.53129 23.0101 11.1836L23.0112 11.1853C23.1677 11.4285 23.2509 11.7115 23.2509 12.0007C23.2509 12.2893 23.168 12.5718 23.0121 12.8146C20.6494 16.514 16.6671 19.5 11.9841 19.5C7.2513 19.5 3.3458 16.5203 0.988886 12.8317C0.828741 12.583 0.745679 12.2925 0.750173 11.9968C0.754679 11.7002 0.846976 11.4117 1.0154 11.1676L1.01758 11.1645L1.01759 11.1645ZM2.25001 12.0196L2.25209 12.0228L2.25208 12.0228C4.42901 15.4304 7.91813 18 11.9841 18C16.0045 18 19.5689 15.4195 21.7484 12.0065L21.7498 12.0043C21.7505 12.0032 21.7509 12.002 21.7509 12.0007C21.7509 11.9995 21.7506 11.9983 21.7499 11.9973C19.5621 8.61913 15.9686 6 11.9841 6C8.63995 6 5.10025 7.93555 2.25001 12.0196Z" fill="#D0DAE7"/><path fillRule="evenodd" clipRule="evenodd" d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12Z" fill="#D0DAE7"/></svg></span>}
                                    </Button>
                                     { errors.password &&  <div className='error text-danger'> {errors.password} </div> } 
                                </Form.Group>

                                <Form.Group className={`position-relative PrefixElement ${errors.password_confirmation?'input_error':''}`}>
                                    <Form.Label>Confirmation  Password</Form.Label>
                                    <Form.Control type={showConPassword ? "text" : "password"}  placeholder="Confirmation password" autoComplete="new-passwordc" className='passwordBlock'  
                                        name="password_confirmation" value={formData.password_confirmation} onChange={handleChange}
                                    />
                                    <span className='prefixIcon'><Image src="/images/lock-icon.svg" alt='Lock' width={24} height={24} quality={100} /></span>
                                    <Button onClick={() => setShowConPassword(!showConPassword)} className='PassHideShow'>
                                        {showConPassword ? <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.2509 21C20.1524 21.0001 20.0549 20.9808 19.9639 20.9431C19.8729 20.9053 19.7903 20.85 19.7208 20.7801L3.22078 4.28013C3.08606 4.13833 3.01207 3.94952 3.01457 3.75395C3.01708 3.55838 3.09588 3.37152 3.23418 3.23322C3.37248 3.09492 3.55934 3.01612 3.75491 3.01361C3.95048 3.01111 4.13929 3.0851 4.28109 3.21982L20.7811 19.7198C20.8859 19.8247 20.9573 19.9583 20.9862 20.1038C21.0151 20.2492 21.0003 20.3999 20.9435 20.5369C20.8868 20.6739 20.7907 20.791 20.6674 20.8735C20.5442 20.9559 20.3992 20.9999 20.2509 21ZM11.985 18C10.0402 18 8.16469 17.4243 6.41062 16.289C4.81359 15.2578 3.37593 13.7808 2.25281 12.0234V12.0197C3.1875 10.6804 4.21125 9.54794 5.31094 8.63482C5.32088 8.6265 5.329 8.61621 5.33477 8.6046C5.34053 8.59298 5.34383 8.5803 5.34445 8.56735C5.34506 8.5544 5.34299 8.54146 5.33835 8.52935C5.33371 8.51724 5.32661 8.50623 5.3175 8.497L4.38375 7.56466C4.36715 7.54793 4.34487 7.53806 4.32133 7.53702C4.29779 7.53598 4.27472 7.54384 4.25672 7.55903C3.08859 8.54341 2.00437 9.75091 1.01859 11.1647C0.84899 11.4081 0.755584 11.6964 0.750243 11.9931C0.744901 12.2897 0.827865 12.5812 0.988591 12.8306C2.22656 14.7679 3.81984 16.3997 5.59547 17.5486C7.59468 18.8437 9.74625 19.5 11.985 19.5C13.1934 19.4962 14.3933 19.2971 15.5381 18.9103C15.5532 18.9052 15.5668 18.8963 15.5775 18.8845C15.5882 18.8726 15.5957 18.8583 15.5993 18.8427C15.6029 18.8272 15.6025 18.811 15.5981 18.7957C15.5937 18.7803 15.5855 18.7664 15.5742 18.7551L14.5627 17.7436C14.5394 17.7208 14.5106 17.7046 14.4791 17.6964C14.4476 17.6881 14.4145 17.6883 14.3831 17.6967C13.5997 17.8984 12.794 18.0003 11.985 18ZM23.0091 11.1843C21.7687 9.26622 20.1595 7.63685 18.3558 6.472C16.3603 5.182 14.1572 4.49997 11.985 4.49997C10.7894 4.50209 9.60266 4.7054 8.47453 5.10138C8.4595 5.10661 8.44605 5.11558 8.43544 5.12745C8.42483 5.13931 8.41742 5.15368 8.41391 5.1692C8.41039 5.18473 8.41088 5.20089 8.41534 5.21616C8.41979 5.23144 8.42806 5.24534 8.43937 5.25653L9.44953 6.26669C9.47305 6.28981 9.50224 6.30631 9.53417 6.31454C9.56611 6.32277 9.59964 6.32244 9.6314 6.31357C10.3987 6.10599 11.1901 6.00055 11.985 5.99997C13.8923 5.99997 15.7622 6.58263 17.542 7.73435C19.1691 8.78435 20.6236 10.26 21.7495 12C21.7504 12.001 21.7508 12.0024 21.7508 12.0037C21.7508 12.0051 21.7504 12.0064 21.7495 12.0075C20.9322 13.2942 19.918 14.4446 18.7439 15.4167C18.7339 15.425 18.7256 15.4353 18.7198 15.4469C18.7139 15.4585 18.7106 15.4713 18.7099 15.4843C18.7092 15.4973 18.7113 15.5103 18.7159 15.5225C18.7206 15.5346 18.7277 15.5457 18.7369 15.555L19.6697 16.4873C19.6862 16.504 19.7084 16.5139 19.7318 16.515C19.7552 16.5161 19.7782 16.5084 19.7962 16.4934C21.0497 15.438 22.1347 14.1975 23.0137 12.8147C23.1691 12.571 23.2513 12.2878 23.2505 11.9988C23.2496 11.7098 23.1658 11.4271 23.0091 11.1843Z" fill="#D0DAE7"/><path d="M12.0009 7.5C11.6639 7.49982 11.3279 7.53756 10.9992 7.6125C10.9826 7.61595 10.9673 7.62383 10.9548 7.63531C10.9423 7.64679 10.9332 7.66144 10.9284 7.6777C10.9236 7.69395 10.9233 7.71121 10.9275 7.72763C10.9317 7.74405 10.9403 7.75901 10.9524 7.77094L16.23 13.0472C16.2419 13.0592 16.2569 13.0678 16.2733 13.0721C16.2897 13.0763 16.307 13.076 16.3233 13.0712C16.3395 13.0663 16.3542 13.0572 16.3656 13.0447C16.3771 13.0323 16.385 13.0169 16.3884 13.0003C16.5387 12.3413 16.5386 11.6568 16.388 10.9979C16.2375 10.3389 15.9404 9.72228 15.5189 9.19385C15.0974 8.66542 14.5623 8.23874 13.9532 7.9455C13.3442 7.65226 12.6769 7.49999 12.0009 7.5ZM7.77189 10.9528C7.75996 10.9408 7.745 10.9322 7.72858 10.9279C7.71216 10.9237 7.6949 10.924 7.67864 10.9289C7.66239 10.9337 7.64774 10.9428 7.63626 10.9553C7.62478 10.9677 7.61689 10.9831 7.61345 10.9997C7.44345 11.7424 7.4648 12.516 7.67549 13.2482C7.88617 13.9803 8.2793 14.647 8.81802 15.1857C9.35674 15.7245 10.0234 16.1176 10.7556 16.3283C11.4877 16.539 12.2614 16.5603 13.0041 16.3903C13.0207 16.3869 13.036 16.379 13.0485 16.3675C13.061 16.356 13.0701 16.3414 13.0749 16.3251C13.0797 16.3089 13.08 16.2916 13.0758 16.2752C13.0716 16.2588 13.063 16.2438 13.0509 16.2319L7.77189 10.9528Z" fill="#D0DAE7"/></svg></span> : <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M1.01759 11.1645C4.0676 6.79251 8.02225 4.5 11.9841 4.5C16.6371 4.5 20.6453 7.53129 23.0101 11.1836L23.0112 11.1853C23.1677 11.4285 23.2509 11.7115 23.2509 12.0007C23.2509 12.2893 23.168 12.5718 23.0121 12.8146C20.6494 16.514 16.6671 19.5 11.9841 19.5C7.2513 19.5 3.3458 16.5203 0.988886 12.8317C0.828741 12.583 0.745679 12.2925 0.750173 11.9968C0.754679 11.7002 0.846976 11.4117 1.0154 11.1676L1.01758 11.1645L1.01759 11.1645ZM2.25001 12.0196L2.25209 12.0228L2.25208 12.0228C4.42901 15.4304 7.91813 18 11.9841 18C16.0045 18 19.5689 15.4195 21.7484 12.0065L21.7498 12.0043C21.7505 12.0032 21.7509 12.002 21.7509 12.0007C21.7509 11.9995 21.7506 11.9983 21.7499 11.9973C19.5621 8.61913 15.9686 6 11.9841 6C8.63995 6 5.10025 7.93555 2.25001 12.0196Z" fill="#D0DAE7"/><path fillRule="evenodd" clipRule="evenodd" d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12Z" fill="#D0DAE7"/></svg></span>}
                                    </Button>
                                     { errors.password_confirmation &&  <div className='error text-danger'> {errors.password_confirmation} </div> } 
                                </Form.Group>
                                { errors.token &&  <div className='error text-danger mt-2  mb-2'> {errors.token} </div> }
                                { errors.form_error &&  <div className='error text-danger mt-2  mb-2'> {errors.form_error} </div> }
                                <Form.Group className="text-end">
                                    <Link href="/login" className={styles.fogotarea}>Back to login</Link>
                                </Form.Group>
                               
                                <Button className={`default-btn w-100 mt-55 ${isLoading ? 'disabled_submit_btn' : ''}`} type="submit"  disabled={isLoading}> 
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
                                  Reset Password </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
         ) : (
          <PageLoader />
        )} 
    </>
  );
};

export default resetPassword;
