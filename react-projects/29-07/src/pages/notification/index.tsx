import Layout from '@/components/Layout';
import styles from "@/styles/notification.module.css";
import Link from 'next/link';
import { Button, Dropdown, Form, Modal, Pagination } from 'react-bootstrap';
import { useState } from 'react';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import path from 'path';
import fs from 'fs';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  date: string;
  mark_as_read: boolean;
}

interface NotificationsPageProps {
  notifications: Notification[];
}

const Notification: React.FC<NotificationsPageProps> = ({ notifications }) => {
    const [filterShow, setFilterShow] = useState(false);
    const [markReadShow, setMarkReadShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [notificationsPerPage] = useState(1);
    const MarkAsReadModal = () => {
      let deviceSize = window.innerWidth;
      if(deviceSize <768 ){
        setMarkReadShow(true);
      }
    };


    const [notificationList, setNotificationList] = useState(notifications);
    const MarkAsRead = (id: number) => {
      setNotificationList(
        notificationList.map((notification) =>
          notification.id === id ? { ...notification, mark_as_read: true } : notification
        )
      );
    };

    // Get current notifications
    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = notificationList.slice(indexOfFirstNotification, indexOfLastNotification);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
            <div className={`${styles.notificationData}`}>
                <ul className="NotiDropDownList">
                  {currentNotifications.map((notification) => (
                    <li
                      key={notification.id}
                      className={`${notification.mark_as_read ? 'read' : ''} NotiDropDownListInner`}
                      onClick={MarkAsReadModal}
                    >
                      <div className="DropLeftIcon">
                        <Image src="/images/check-circle.svg" width={48} height={48} alt="Check Icon" quality={100} />
                      </div>
                      <div className="DropCenterContent">
                        <div className="d-flex justify-content-between mb-1 DropCenterContentTop">
                          <h6>{notification.title}</h6>
                          <span>{notification.time}</span>
                        </div>
                        <div className="DropCenterContentBottom d-flex">
                          <p>{notification.message}</p>
                          <span>{notification.date}</span>
                        </div>
                      </div>
                      <div className="DropRightDrop">
                        <Dropdown>
                          <Dropdown.Toggle className="DropiconNone">
                            <Image src="/images/vertical-dots.svg" width={20} height={20} alt="Dropdown Icon" quality={100} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="InnerDropDown" align="end">
                            <Dropdown.Item className='d-flex align-items-center' onClick={() => MarkAsRead(notification.id)}>
                              <Image src="/images/check-circle-blue.svg" width={24} height={24} alt="Check Icon" quality={100} />
                              Mark as read
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </li>
                  ))}
                </ul>
            </div>
            <Pagination>
              <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                {Array.from({ length: Math.ceil(notificationList.length / notificationsPerPage) }, (_, index) => (
                  <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </Pagination.Item>
                ))}
              <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(notificationList.length / notificationsPerPage)} />
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
                                label="Confirmed"
                                name="filters"
                                type="radio"
                                id="FilterConfirmed"
                                value="Confirmed"
                            />
                            <Form.Check
                                inline
                                label="Canceled"
                                name="filters"
                                type="radio"
                                id="FilterCanceled"
                                value="Canceled"
                            />
                            <Form.Check
                                inline
                                label="Utilized"
                                name="filters"
                                type="radio"
                                id="FilterUtilized"
                                value="Utilized"
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

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'notifications.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const notifications: Notification[] = JSON.parse(jsonData);

  return {
    props: {
      notifications
    }
  };
};

export default Notification
