import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { useRouter } from "next/router";
import styles from "./Footer.module.css";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className={styles.footer}>
      <Container fluid>
        <Row>
          <Col xl={3} lg={4}>
            <Link href="/">
              <Image
                src="/images/logo.svg"
                className={`${styles.FooterLogo} img-fluid`}
                width={344}
                height={25}
                alt="Floor Plan"
                placeholder="empty"
                loading="eager"
                quality={100}
              />
            </Link>
            <p className={styles.leftPara}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua</p>
          </Col>
          <Col>
            <Navbar className={`${styles.FooterNav} py-0 d-block d-sm-flex align-items-start`}>
              <Nav className={`${styles.FooterNavList} flex-column`}>
                <Link href="#">Heading 1</Link>
                <Link href="#">Heading 2</Link>
                <Link href="#">Heading 3</Link>
                <Link href="#">Heading 4</Link>
              </Nav>
              <Nav className={`${styles.FooterNavList} flex-column`}>
                <Link href="#">Privacy Policy</Link>
                <Link href="#">Terms and Conditions</Link>
              </Nav>
            </Navbar>
          </Col>
          <Col className={`${styles.FooterLastColumn} flex-md-grow-0`}>
            <Link href="tel:+44 20 1234 5678" className={`${styles.bottomCallMsg}`}><Image src="/images/phone-white-icon.svg" width={16} height={16} alt="Phone Icon" quality={100} />+44 20 1234 5678</Link>
            <Link href="mailto:Name1@example.com" className={`${styles.bottomCallMsg}`}><Image src="/images/mail-white-icon.svg" width={16} height={16} alt="Mail Icon" quality={100} />Name1@example.com</Link>
            <ul className="d-flex social_icons mt-20">
              <li>
                <Link href="https://x.com/?lang=en" target='_blank'>
                  <Image
                    src="/images/twitter-icon.svg"
                    className=""
                    width={20}
                    height={20}
                    alt="Twitter"
                    placeholder="empty"
                    loading="eager"
                    quality={100}
                  />
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/" target='_blank'>
                  <Image
                    src="/images/instagram-icon.svg"
                    className=""
                    width={20}
                    height={20}
                    alt="Instagram"
                    placeholder="empty"
                    loading="eager"
                    quality={100}
                  />
                </Link>
              </li>
              <li>
                <Link href="https://www.whatsapp.com/" target='_blank'>
                  <Image
                    src="/images/whatsapp-icon.svg"
                    className=""
                    width={20}
                    height={20}
                    alt="Whatsapp"
                    placeholder="empty"
                    loading="eager"
                    quality={100}
                  />
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
