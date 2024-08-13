import Link from 'next/link';
import { useState, useRef } from 'react';
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap';
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./Header.module.css";
import LogoutButton from '../LogoutButton';

const Header = ({loggedInUserData}:any) => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const handleToggle = (isOpen: boolean) => {
    setShowDropdown(isOpen);
  };
  const handleClose = () => {
    setShowDropdown(false);
  };
  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const addClassToBody = () => {
    document.body.classList.add('Mobilesidebar-open');
  };
  return (
    <header className={styles.header}>
      <Container fluid>
        <Row className='align-items-center'>
          <Col className={`${styles.MobileFirstColumn} d-md-none`}>
            <Button className='hamburger' onClick={addClassToBody}>
              <Image
                src="/images/hamburger-icon.svg"
                width={24}
                height={24}
                alt="Hamburger Icon"
                placeholder="empty"
                loading="eager"
                quality={100}
              />
            </Button>
          </Col>
          <Col className='text-center'>
            <Link href="/">
              <Image
                src="/images/logo-blue.svg"
                className={`${styles.HeaderLogo} img-fluid d-none d-md-block`}
                width={344}
                height={25}
                alt="Floor Plan"
                placeholder="empty"
                loading="eager"
                quality={100}
              />
              <Image
                src="/images/logo.svg"
                className={`${styles.MobileLogo} img-fluid d-md-none`}
                width={344}
                height={25}
                alt="Floor Plan"
                placeholder="empty"
                loading="eager"
                quality={100}
              />
            </Link>
          </Col>
          <Col className={`${styles.MobileLastColumn} text-end`}>
            <div className={styles.DashRightHead}>
              <Dropdown className='d-none d-md-block'>
                <Dropdown.Toggle className={styles.UserPBtn}>
                  <span><Image src="/images/user-icon.svg" width={24} height={24} alt="User Icon" quality={100} /></span>{loggedInUserData?.full_name} <br />Admin
                </Dropdown.Toggle>
                <Dropdown.Menu className={`${styles.ProfileDropDown} InnerDropDown`}>
                    {/* <Dropdown.Item href="/user-profile" className='d-flex align-items-center'><Image src="/images/edit-icon.svg" width={24} height={24} alt="Edit Icon" quality={100} />Edit Profile</Dropdown.Item> */}
                    <Link href="/user-profile" className='d-flex align-items-center'><Image src="/images/edit-icon.svg" width={24} height={24} alt="Edit Icon" quality={100} />Edit Profile</Link>
                     <LogoutButton />
                    {/* <button><Image src="/images/logout.svg" width={24} height={24} alt="Log Out Icon" quality={100} />Logout</button> */}
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown show={showDropdown} onToggle={handleToggle} className='d-none d-md-block'>
                <Dropdown.Toggle className={styles.HnotiIcon} onClick={() => setShowDropdown(!showDropdown)}>
                  <span><Image src="/images/bell-icon.svg" width={24} height={24} alt="Bell Icon" quality={100} /></span>
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.NotiDropDown} align="end">
                  <div className={styles.DropHeader}>
                    <h6>Notifications</h6>
                    <span className={styles.DropClose} onClick={handleClose}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M0.419604 0.419604C0.552277 0.286595 0.709888 0.181067 0.883407 0.109064C1.05693 0.0370616 1.24295 0 1.43081 0C1.61868 0 1.8047 0.0370616 1.97822 0.109064C2.15174 0.181067 2.30935 0.286595 2.44202 0.419604L10.0004 7.98082L17.5587 0.419604C17.6915 0.286811 17.8492 0.181473 18.0227 0.109605C18.1962 0.0377376 18.3821 0.00074779 18.5699 0.00074779C18.7577 0.00074779 18.9437 0.0377376 19.1172 0.109605C19.2907 0.181473 19.4484 0.286811 19.5811 0.419604C19.7139 0.552398 19.8193 0.710047 19.8911 0.88355C19.963 1.05705 20 1.24301 20 1.43081C20 1.61861 19.963 1.80457 19.8911 1.97808C19.8193 2.15158 19.7139 2.30923 19.5811 2.44202L12.0199 10.0004L19.5811 17.5587C19.7139 17.6915 19.8193 17.8492 19.8911 18.0227C19.963 18.1962 20 18.3821 20 18.5699C20 18.7577 19.963 18.9437 19.8911 19.1172C19.8193 19.2907 19.7139 19.4484 19.5811 19.5811C19.4484 19.7139 19.2907 19.8193 19.1172 19.8911C18.9437 19.963 18.7577 20 18.5699 20C18.3821 20 18.1962 19.963 18.0227 19.8911C17.8492 19.8193 17.6915 19.7139 17.5587 19.5811L10.0004 12.0199L2.44202 19.5811C2.30923 19.7139 2.15158 19.8193 1.97808 19.8911C1.80457 19.963 1.61861 20 1.43081 20C1.24301 20 1.05705 19.963 0.88355 19.8911C0.710047 19.8193 0.552398 19.7139 0.419604 19.5811C0.286811 19.4484 0.181473 19.2907 0.109605 19.1172C0.0377376 18.9437 0.00074779 18.7577 0.00074779 18.5699C0.00074779 18.3821 0.0377376 18.1962 0.109605 18.0227C0.181473 17.8492 0.286811 17.6915 0.419604 17.5587L7.98082 10.0004L0.419604 2.44202C0.286595 2.30935 0.181067 2.15174 0.109064 1.97822C0.0370616 1.8047 0 1.61868 0 1.43081C0 1.24295 0.0370616 1.05693 0.109064 0.883407C0.181067 0.709888 0.286595 0.552277 0.419604 0.419604Z" fill="#295597"/></svg></span>
                  </div>
                  <ul className="NotiDropDownList">
                    <li className="NotiDropDownListInner read">
                      <div className="DropLeftIcon"><Image src="/images/check-circle.svg" width={48} height={48} alt="Check Icon" quality={100} /></div>
                      <div className="DropCenterContent">
                        <div className="d-flex justify-content-between mb-1 DropCenterContentTop">
                          <h6>Staff was confirmed</h6>
                          <span>10:31 AM</span>
                        </div>
                        <div className="DropCenterContentBottom d-flex">
                          <p>Theatre 1 - Gynaecology</p>
                          <span>Tue, 4 Jun - AM</span>
                        </div>
                      </div>
                      <div className="DropRightDrop">
                        <Dropdown>
                          <Dropdown.Toggle className="DropiconNone">
                            <Image src="/images/vertical-dots.svg" width={20} height={20} alt="Dropdown Icon" quality={100} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="InnerDropDown" align="end">
                            <Dropdown.Item className='d-flex align-items-center' onClick={(e) => handleMarkAsRead(e)}><Image src="/images/check-circle-blue.svg" width={24} height={24} alt="Check Icon" quality={100} />Mark as read</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                    <li className="NotiDropDownListInner read">
                      <div className="DropLeftIcon"><Image src="/images/check-circle.svg" width={48} height={48} alt="Check Icon" quality={100} /></div>
                      <div className="DropCenterContent">
                        <div className="d-flex justify-content-between mb-1 DropCenterContentTop">
                          <h6>Surgeon was confirmed</h6>
                          <span>10:12 AM</span>
                        </div>
                        <div className="DropCenterContentBottom d-flex">
                          <p>Theatre 1 - General</p>
                          <span>Tue, 4 Jun - AM</span>
                        </div>
                      </div>
                      <div className="DropRightDrop">
                        <Dropdown>
                          <Dropdown.Toggle className="DropiconNone">
                            <Image src="/images/vertical-dots.svg" width={20} height={20} alt="Dropdown Icon" quality={100} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="InnerDropDown" align="end">
                            <Dropdown.Item className='d-flex align-items-center' onClick={(e) => handleMarkAsRead(e)}><Image src="/images/check-circle-blue.svg" width={24} height={24} alt="Check Icon" quality={100} />Mark as read</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                    <li className="NotiDropDownListInner read">
                      <div className="DropLeftIcon"><Image src="/images/check-circle.svg" width={48} height={48} alt="Check Icon" quality={100} /></div>
                      <div className="DropCenterContent">
                        <div className="d-flex justify-content-between mb-1 DropCenterContentTop">
                          <h6>Speciality Lead was confirmed</h6>
                          <span>10:11 AM</span>
                        </div>
                        <div className="DropCenterContentBottom d-flex">
                          <p>Theatre 1 - Gynaecology</p>
                          <span>Tue, 4 Jun - AM</span>
                        </div>
                      </div>
                      <div className="DropRightDrop">
                        <Dropdown>
                          <Dropdown.Toggle className="DropiconNone">
                            <Image src="/images/vertical-dots.svg" width={20} height={20} alt="Dropdown Icon" quality={100} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="InnerDropDown" align="end">
                            <Dropdown.Item className='d-flex align-items-center' onClick={(e) => handleMarkAsRead(e)}><Image src="/images/check-circle-blue.svg" width={24} height={24} alt="Check Icon" quality={100} />Mark as read</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                    <li className="NotiDropDownListInner read">
                      <div className="DropLeftIcon"><Image src="/images/dots-circle.svg" width={48} height={48} alt="Check Icon" quality={100} /></div>
                      <div className="DropCenterContent">
                        <div className="d-flex justify-content-between mb-1 DropCenterContentTop">
                          <h6>Session is utilised</h6>
                          <span>9:56 AM</span>
                        </div>
                        <div className="DropCenterContentBottom d-flex">
                          <p>Eoc 1 - MFU</p>
                          <span>Tue, 4 Jun - AM</span>
                        </div>
                      </div>
                      <div className="DropRightDrop">
                        <Dropdown>
                          <Dropdown.Toggle className="DropiconNone">
                            <Image src="/images/vertical-dots.svg" width={20} height={20} alt="Dropdown Icon" quality={100} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="InnerDropDown" align="end">
                            <Dropdown.Item className='d-flex align-items-center' onClick={(e) => handleMarkAsRead(e)}><Image src="/images/check-circle-blue.svg" width={24} height={24} alt="Check Icon" quality={100} />Mark as read</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                    <li className="NotiDropDownListInner not-read">
                      <div className="DropLeftIcon"><Image src="/images/disclaimer-circle.svg" width={48} height={48} alt="Check Icon" quality={100} /></div>
                      <div className="DropCenterContent">
                        <div className="d-flex justify-content-between mb-1 DropCenterContentTop">
                          <h6>Staff cancelled a confirmation</h6>
                          <span>9:16 AM</span>
                        </div>
                        <div className="DropCenterContentBottom d-flex">
                          <p>Theatre I.R Suite - MFU</p>
                          <span>Tue, 4 Jun - AM</span>
                        </div>
                      </div>
                      <div className="DropRightDrop">
                        <Dropdown>
                          <Dropdown.Toggle className="DropiconNone">
                            <Image src="/images/vertical-dots.svg" width={20} height={20} alt="Dropdown Icon" quality={100} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="InnerDropDown" align="end">
                            <Dropdown.Item className='d-flex align-items-center' onClick={(e) => handleMarkAsRead(e)}><Image src="/images/check-circle-blue.svg" width={24} height={24} alt="Check Icon" quality={100} />Mark as read</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                  </ul>
                  <div className={styles.DropFooter}>
                    <Link href="/notification">View all notifications</Link>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <Link href="/notification" className={`${styles.HnotiIcon} d-md-none`}>
                <span><Image src="/images/bell-icon.svg" width={24} height={24} alt="Bell Icon" quality={100} /></span>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default Header
