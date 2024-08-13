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
    user_email: z.string().email({ message: 'Invalid email address' }).min(1, 'The email field is required.'),
   });
type FormData = z.infer<typeof formSchema>;

const forgotPassword: React.FC = () => {

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

const [isLoading, setIsLoading] = useState(false);
const [formData, setFormData] = useState<FormData>({ user_email: '' });
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
      let response =  await axios.post(`${apiUrl}/forgot-password`, {user_email:formData.user_email}, { responseType: 'json' });
      toast.success('A password reset email has been sent. Please check your email.');
      setIsLoading(false);
      setFormData({ ...formData, 'user_email': '' });
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
                            <h3 className={styles.titles}>Forgot Password</h3>
                            <h5 className='fontRegular'>We'll send you reset password instruction on your Email please check your email.</h5>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className={`position-relative PrefixElement ${errors.user_email?'input_error':''}`}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email" name="user_email" value={formData.user_email}  onChange={handleChange} autoComplete="false" />
                                    <span className='prefixIcon'><Image src="/images/mail-icon.svg" alt='Envelope' width={24} height={24} quality={100} /></span>
                                    { errors.user_email && <div className='error text-danger'> {errors.user_email} </div> }
                                </Form.Group>
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
                                  Submit </Button>
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

export default forgotPassword;
