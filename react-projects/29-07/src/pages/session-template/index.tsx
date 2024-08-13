import Layout from '@/components/Layout';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import Image from 'next/image';
import styles from "@/styles/table.module.css";
import DateRangeCalendar from '@/components/DateRangeCalendar';

const RotaTableEdit = () => {
    const [ResetReportShow, setResetShow] = useState(false);
    const handleClose = () => setResetShow(false);
    const ClosesetResetShow = () => {
        setResetShow(false);
    }
    // Kent & Canterbury Hospital
    const [selectedOption, setSelectedOption] = useState('Kent & Canterbury Hospital');
    const [isOpen, setIsOpen] = useState(false);
    const selectBoxRef1 = useRef<HTMLDivElement>(null);
    const options = ['Kent & Canterbury Hospital', 'Queen Elizabeth the Queen Mother Hospital', 'William Harvey Hospital'];
    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectBoxRef1.current && !selectBoxRef1.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Tab for Mobile
    const [activeElement, setActiveElement] = useState('DayOne');
    const handleClick3 = (id: string) => {
        setActiveElement(id);
    };

  return (
    <Layout>
        <div>
            <h4 className='maintitle'>Edit Reports</h4>
            <div className="topBlock">
                <div className={`${styles.TableBlockInner} ${styles.EditRotaTable} topBlockInner`}>
                    <div className='topBlockLeft position-relative'>
                        <DateRangeCalendar />
                    </div>
                    <div className='topBlockRight'>
                        <div className={`${isOpen ? 'active': ''} customSelect`} ref={selectBoxRef1}>
                            <div className="selectedOption" onClick={() => setIsOpen(!isOpen)}>
                                {selectedOption}
                            </div>
                            {isOpen && (
                            <div className="options">
                                {options.map((option, index) => (
                                    <div key={index} className="option" onClick={() => handleSelect(option)}>
                                        <label>
                                            <span>{option}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.topBothBtn}`}>
                <div className={`${styles.LeftBothBtn}`}>
                    <Button className='default-btn2-wicon d-none d-md-flex' onClick={() => setResetShow(true)}>
                        Reset
                    </Button>
                    <Button className='outlibe-btn-wicon d-md-none' onClick={() => setResetShow(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M9.9987 4.1665V1.6665L6.66536 4.99984L9.9987 8.33317V5.83317C12.757 5.83317 14.9987 8.07484 14.9987 10.8332C14.9987 13.3082 13.1904 15.3582 10.832 15.7582V17.4415C14.1237 17.0332 16.6654 14.2332 16.6654 10.8332C16.6654 7.14984 13.682 4.1665 9.9987 4.1665ZM4.9987 10.8332C4.9987 9.45817 5.55703 8.20817 6.46536 7.29984L5.28203 6.1165C4.03319 7.36854 3.33192 9.06478 3.33203 10.8332C3.33203 14.2332 5.8737 17.0332 9.16536 17.4415V15.7582C6.80703 15.3582 4.9987 13.3082 4.9987 10.8332Z" fill="#295597"/>
                        </svg>Reset
                    </Button>
                </div>
                <div className={`${styles.RightBothBtn}`}>
                    <p className={`${styles.dateUpdates}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                            <path d="M14.4992 6.74667H9.97919L11.8059 4.86667C9.98586 3.06667 7.03919 3 5.21919 4.8C3.39919 6.60667 3.39919 9.52 5.21919 11.3267C7.03919 13.1333 9.98586 13.1333 11.8059 11.3267C12.7125 10.4333 13.1659 9.38667 13.1659 8.06667H14.4992C14.4992 9.38667 13.9125 11.1 12.7392 12.26C10.3992 14.58 6.59919 14.58 4.25919 12.26C1.92586 9.94667 1.90586 6.18667 4.24586 3.87333C6.58586 1.56 10.3392 1.56 12.6792 3.87333L14.4992 2V6.74667V6.74667ZM8.83252 5.33333V8.16667L11.1659 9.55333L10.6859 10.36L7.83252 8.66667V5.33333H8.83252Z" fill="#295597"/>
                        </svg><span>Updated:</span> 09:35 AM Mon, 3 Jun. 2024
                    </p>
                    <Button className='default-btn2-wicon d-md-none'>
                        Save
                    </Button>
                </div>
            </div>
            <div className={`${styles.RtableData} ${styles.CursorNone} ${styles.SessionTemplate}`}>
                <div className={`${styles.DaysRow} ${styles.GridColumn} ${styles.MobileSpaceShow}`}>
                    <div className={`${styles.Columns}`}></div>
                    <div className={`${styles.Columns}`}>
                        <div id='DayOne' onClick={() => handleClick3('DayOne')} className={`${styles.DayTop} ${activeElement === 'DayOne' ? styles.active : ''}`}>
                            <span><small className='d-none d-xl-inline-block'>Monday</small><small className='d-xl-none'>Mon</small></span>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DayTwo' onClick={() => handleClick3('DayTwo')} className={`${styles.DayTop} ${activeElement === 'DayTwo' ? styles.active : ''}`}>
                            <span><small className='d-none d-xl-inline-block'>Tuesday</small><small className='d-xl-none'>Tue</small></span>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DayThree' onClick={() => handleClick3('DayThree')} className={`${styles.DayTop} ${activeElement === 'DayThree' ? styles.active : ''}`}>
                            <span><small className='d-none d-xl-inline-block'>Wednesday</small><small className='d-xl-none'>Wed</small></span>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DayFour' onClick={() => handleClick3('DayFour')} className={`${styles.DayTop} ${activeElement === 'DayFour' ? styles.active : ''}`}>
                            <span><small className='d-none d-xl-inline-block'>Thursday</small><small className='d-xl-none'>Thu</small></span>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DayFive' onClick={() => handleClick3('DayFive')} className={`${styles.DayTop} ${activeElement === 'DayFive' ? styles.active : ''}`}>
                            <span><small className='d-none d-xl-inline-block'>Friday</small><small className='d-xl-none'>Fri</small></span>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DaySix' onClick={() => handleClick3('DaySix')} className={`${styles.DayTop} ${activeElement === 'DaySix' ? styles.active : ''}`}>
                            <span><small className='d-none d-xl-inline-block'>Saturday</small><small className='d-xl-none'>Sat</small></span>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DaySeven' onClick={() => handleClick3('DaySeven')} className={`${styles.DayTop} ${activeElement === 'DaySeven' ? styles.active : ''}`}>
                            <span><small className='d-none d-xl-inline-block'>Sunday</small><small className='d-xl-none'>Sun</small></span>
                        </div>
                    </div>
                </div>
                <div className={`${styles.TheatreRowField} ${styles.BgShowWhite} d-flex`}>
                    <div className={`${styles.TheatreLeft}`}>
                        <h6>Theatre 1</h6>
                    </div>
                    <div className={`${styles.TheatreRight}`}>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                AM
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Ophthalmology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Breast</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                PM
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>General</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Vascular</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Urology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Urology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Ophthalmology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                EVE
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.TheatreRowField} ${styles.BgShowWhite} d-flex`}>
                    <div className={`${styles.TheatreLeft}`}>
                        <h6>Theatre I.R Suite</h6>
                    </div>
                    <div className={`${styles.TheatreRight}`}>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                AM
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Urology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Ophthalmology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                PM
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Breast</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                       
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Vascular</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                EVE
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.TheatreRowField} ${styles.BgShowWhite} d-flex`}>
                    <div className={`${styles.TheatreLeft}`}>
                        <h6>Main Theatre 7</h6>
                    </div>
                    <div className={`${styles.TheatreRight}`}>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                AM
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Breast</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                PM
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>General</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Vascular</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Urology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Urology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Ophthalmology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                EVE
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.TheatreRowField} ${styles.BgShowWhite} d-flex`}>
                    <div className={`${styles.TheatreLeft}`}>
                        <h6>EOC 1</h6>
                    </div>
                    <div className={`${styles.TheatreRight}`}>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                AM
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Urology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Ophthalmology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                PM
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Breast</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Vascular</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                EVE
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='BottomBothArea'>
                <Button className='default-btn2-wicon'>
                    Save
                </Button>
            </div>
        </div>

        {/* Reports Reset Modal */}
        <Modal show={ResetReportShow} onHide={() => setResetShow(false)} centered className='bottomSlideModalMob'>
            <Modal.Header className='min-height80 headerBlankMobile'></Modal.Header>
            <Modal.Body>
                <div className='text-center'>
                    <span className='disclaimer-icon mb-4'><Image src="/images/disclaimer-circle.svg" alt='Disclaimer Icon' width={38} height={38} quality={100} /></span>
                    <h5 className='mb-20 fontRegular'>Reset setting ?</h5>
                    <div className='d-flex justify-content-center gap-3 gap-md-4'>
                        <Button className='default-btn-red' onClick={ClosesetResetShow}>
                            Reset
                        </Button>
                        <Button className='outlibe-btn-red' onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </Layout>
  )
}

export default RotaTableEdit
