import React from 'react';
import {  Modal,  } from 'react-bootstrap';
import Image from 'next/image';

interface successModalProps {
    sucessModelShow: boolean;
    setSucessModelShow : any;
    sucessModelMessage : any;
  }

const SuccessModalComponent : React.FC<successModalProps> = ({ sucessModelShow, setSucessModelShow,sucessModelMessage="" })  => {
    return (
        <>
        <Modal show={sucessModelShow} onHide={() => setSucessModelShow(false)} centered>
            <Modal.Header closeButton className='min-height80'></Modal.Header>
            <Modal.Body>
                <span className='success-icon mb-4 mt-4'><Image src="/images/check-white.svg" alt='Check Icon' width={27} height={22} quality={100} /></span>
                <h5 className='fontRegular text-center mb-4'>{sucessModelMessage}</h5>
            </Modal.Body>
        </Modal>
    </>
)};

export default SuccessModalComponent