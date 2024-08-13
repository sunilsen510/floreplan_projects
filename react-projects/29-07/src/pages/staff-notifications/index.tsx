import Layout from '@/components/Layout';
import styles from "@/styles/notification.module.css";
import Link from 'next/link';
import { Button, Dropdown, Form, Modal, Pagination } from 'react-bootstrap';
import { useState } from 'react';
import Image from 'next/image';

const Notification = () => {
    const [filterShow, setFilterShow] = useState(false);
    const [markReadShow, setMarkReadShow] = useState(false);
    const MarkAsRead = () => {
      let deviceSize = window.innerWidth;
      if(deviceSize <768 ){
        setMarkReadShow(true);
      }
    };
  return (
    <Layout>
        <div className="HeaderTopScript text-center d-md-none">
            <Link href="/" className='PageBack'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 12C20 11.4477 19.5523 11 19 11H5C4.44771 11 4 11.4477 4 12C4 12.5523 4.44771 13 5 13H19C19.5523 13 20 12.5523 20 12Z" fill="white"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.7071 4.29289C12.3166 3.90237 11.6834 3.90237 11.2929 4.29289L4.29289 11.2929C3.90237 11.6834 3.90237 12.3166 4.29289 12.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071C13.0976 19.3166 13.0976 18.6834 12.7071 18.2929L6.41421 12L12.7071 5.70711C13.0976 5.31658 13.0976 4.68342 12.7071 4.29289Z" fill="white"/>
                </svg>
            </Link>
            <h5 className='color-white'>Notifications</h5>
        </div>
        <div className={`${styles.notificationPage}`}>
            <div className={`${styles.notificationTop}`}>
                <h6>All Notifications</h6>
                <Button className='outlibe-btn-wicon MobileSmallBtn' onClick={() => setFilterShow(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                        <path d="M1.62985 2.97264L6.88463 9.68182V15L10.1154 12.6364V9.68182L15.3702 2.97264C15.6695 2.58855 15.4181 2 14.9539 2H2.04607C1.58192 2 1.33047 2.58855 1.62985 2.97264Z" stroke="#295597" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>Filter
                </Button>
            </div>
            <div className={`${styles.notificationData} ${styles.Staffnotification}`}>
                <ul className="NotiDropDownList">
                    <li className="NotiDropDownListInner" onClick={MarkAsRead}>
                      <div className="DropLeftIcon"><Image src="/images/book-plus.svg" width={48} height={48} alt="Book Plus Icon" quality={100} /></div>
                      <div className="DropCenterContent">
                        <div className="d-flex justify-content-between mb-1 DropCenterContentTop">
                          <h6>Sessions needs approve</h6>
                          <span>10:31 AM</span>
                        </div>
                        <div className="DropCenterContentBottom d-flex">
                          <span className='ps-0'>Mon 3 June  - Sun 9 June</span>
                        </div>
                      </div>
                      <div className="DropRightDrop">
                        <Dropdown>
                          <Dropdown.Toggle className="DropiconNone">
                            <Image src="/images/vertical-dots.svg" width={20} height={20} alt="Dropdown Icon" quality={100} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="InnerDropDown" align="end">
                            <Dropdown.Item className='d-flex align-items-center'><Image src="/images/check-circle-blue.svg" width={24} height={24} alt="Check Icon" quality={100} />Mark as read</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                    <li className="NotiDropDownListInner" onClick={MarkAsRead}>
                      <div className="DropLeftIcon"><Image src="/images/pc-graph.svg" width={48} height={48} alt="Graph Icon" quality={100} /></div>
                      <div className="DropCenterContent">
                        <div className="d-flex justify-content-between mb-1 DropCenterContentTop">
                          <h6>Session needs approve</h6>
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
                            <Dropdown.Item className='d-flex align-items-center'><Image src="/images/check-circle-blue.svg" width={24} height={24} alt="Check Icon" quality={100} />Mark as read</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                    <li className="NotiDropDownListInner" onClick={MarkAsRead}>
                      <div className="DropLeftIcon"><Image src="/images/pc-graph.svg" width={48} height={48} alt="Graph Icon" quality={100} /></div>
                      <div className="DropCenterContent">
                        <div className="d-flex justify-content-between mb-1 DropCenterContentTop">
                          <h6>Session needs approve</h6>
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
                            <Dropdown.Item className='d-flex align-items-center'><Image src="/images/check-circle-blue.svg" width={24} height={24} alt="Check Icon" quality={100} />Mark as read</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                    <li className="NotiDropDownListInner" onClick={MarkAsRead}>
                      <div className="DropLeftIcon"><Image src="/images/metter.svg" width={48} height={48} alt="Metter Icon" quality={100} /></div>
                      <div className="DropCenterContent">
                        <div className="d-flex justify-content-between mb-1 DropCenterContentTop">
                          <h6>Session time is approaching</h6>
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
                            <Dropdown.Item className='d-flex align-items-center'><Image src="/images/check-circle-blue.svg" width={24} height={24} alt="Check Icon" quality={100} />Mark as read</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                    <li className="NotiDropDownListInner not-approve" onClick={MarkAsRead}>
                      <div className="DropLeftIcon"><Image src="/images/not-approve.svg" width={48} height={48} alt="Not Approve Icon" quality={100} /></div>
                      <div className="DropCenterContent">
                        <div className="d-flex justify-content-between mb-1 DropCenterContentTop">
                          <h6>Session doesn't approved</h6>
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
                            <Dropdown.Item className='d-flex align-items-center'><Image src="/images/check-circle-blue.svg" width={24} height={24} alt="Check Icon" quality={100} />Mark as read</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                    <li className="NotiDropDownListInner" onClick={MarkAsRead}>
                      <div className="DropLeftIcon"><Image src="/images/refresh.svg" width={48} height={48} alt="Refresh Icon" quality={100} /></div>
                      <div className="DropCenterContent SingleDropCenterContent">
                        <div className="d-flex justify-content-between mb-1 DropCenterContentTop">
                          <h6>Admin system updated your email</h6>
                          <span>9:16 AM</span>
                        </div>
                      </div>
                      <div className="DropRightDrop">
                        <Dropdown>
                          <Dropdown.Toggle className="DropiconNone">
                            <Image src="/images/vertical-dots.svg" width={20} height={20} alt="Dropdown Icon" quality={100} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="InnerDropDown" align="end">
                            <Dropdown.Item className='d-flex align-items-center'><Image src="/images/check-circle-blue.svg" width={24} height={24} alt="Check Icon" quality={100} />Mark as read</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                    <li className="NotiDropDownListInner" onClick={MarkAsRead}>
                      <div className="DropLeftIcon"><Image src="/images/refresh.svg" width={48} height={48} alt="Refresh Icon" quality={100} /></div>
                      <div className="DropCenterContent SingleDropCenterContent">
                        <div className="d-flex justify-content-between mb-1 DropCenterContentTop">
                          <h6>Admin system added new hospital for you</h6>
                          <span>9:16 AM</span>
                        </div>
                      </div>
                      <div className="DropRightDrop">
                        <Dropdown>
                          <Dropdown.Toggle className="DropiconNone">
                            <Image src="/images/vertical-dots.svg" width={20} height={20} alt="Dropdown Icon" quality={100} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="InnerDropDown" align="end">
                            <Dropdown.Item className='d-flex align-items-center'><Image src="/images/check-circle-blue.svg" width={24} height={24} alt="Check Icon" quality={100} />Mark as read</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                  </ul>
            </div>
            <Pagination>
                <Pagination.Prev />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Next />
            </Pagination>
        </div>
        {/* Filter Modal */}
        <Modal show={filterShow} onHide={() => setFilterShow(false)} centered className='bottomSlideModalMob'>
            <Modal.Header closeButton className='headerBlankMobile'>
                <Modal.Title>Filter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label className='mb-2 pb-1'>Filter By :</Form.Label>
                        <div className='customRadioArea'>
                            <Form.Check
                                inline
                                label="Read"
                                name="filters"
                                type="radio"
                                id="FilterRead"
                                value="Read"
                            />
                            <Form.Check
                                inline
                                label="Unread"
                                name="filters"
                                type="radio"
                                id="FilterUnread"
                                value="Unread"
                            />
                            <Form.Check
                                inline
                                label="Unapproved"
                                name="filters"
                                type="radio"
                                id="FilterUnapproved"
                                value="Unapproved"
                            />
                        </div>
                    </Form.Group>
                    <Button className="default-btn w-100 mt-30" type="submit">
                        Filter
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

        {/* Mark As Read For Mobile Modal */}
        <Modal show={markReadShow} onHide={() => setMarkReadShow(false)} centered className='bottomSlideModalMob'>
            <Modal.Header closeButton className='headerBlankMobile'>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className='customCheckbox'>
                      <Form.Check
                        inline
                        label="Mark as read "
                        name="Markasread"
                        type="checkbox"
                        id="MarkCheck"
                      />
                    </Form.Group>
                    <Button className="default-btn w-100 mt-55" type="submit">
                      Confirm
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    </Layout>
  )
}

export default Notification
