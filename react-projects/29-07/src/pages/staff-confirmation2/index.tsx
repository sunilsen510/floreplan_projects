import Layout from '@/components/Layout';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import Image from 'next/image';
import styles from "@/styles/table.module.css";
import DateRangeCalendar from '@/components/DateRangeCalendar';



const StaffConfimation2 = () => {
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

    // All Select Box
    const [selectedOption2, setSelectedOption2] = useState('ALL');
    const [isOpen2, setIsOpen2] = useState(false);
    const selectBoxRef2 = useRef<HTMLDivElement>(null);
    const options2 = ['AM', 'PM', 'EVE', 'All'];
    const handleSelect2 = (option: string) => {
        setSelectedOption2(option);
        setIsOpen2(false);
    };
    useEffect(() => {
        const handleClickOutside2 = (event: MouseEvent) => {
            if (selectBoxRef2.current && !selectBoxRef2.current.contains(event.target as Node)) {
                setIsOpen2(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside2);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside2);
        };
    }, []);

    // Checkbox Checked Condition in table
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
    const handleChange = (id: string, status: boolean) => {
        setCheckedItems(prevState => ({
        ...prevState,
        [id]: typeof checkedItems[id]==='undefined' ? !status : !checkedItems[id]
        }));
    };

    // Tab for Mobile
    const [activeElement, setActiveElement] = useState('DayOne');
    const handleClick3 = (id: string) => {
        setActiveElement(id);
    };

  return (
    <Layout>
        <div>
            <h4 className='maintitle'>Staff Confirmation</h4>
            <div className="topBlock">
                <div className={`${styles.TableBlockInner} topBlockInner pb-0`}>
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
                    <span className='w-100'>Time slot :</span>
                    <div className={`${isOpen2 ? 'active': ''} customSelect`} ref={selectBoxRef2}>
                        <div className="selectedOption selectedOptionSmall" onClick={() => setIsOpen2(!isOpen2)}>
                            {selectedOption2}
                        </div>
                        {isOpen2 && (
                        <div className="options">
                            {options2.map((option, index2) => (
                                <div key={index2} className="option" onClick={() => handleSelect2(option)}>
                                    <label>
                                        <span>{option}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        )}
                    </div>
                </div>
                <div className={`${styles.RightBothBtn}`}>
                    <Button className='default-btn2-wicon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                            <path d="M4.13461 2.54747C3.60674 2.68812 3.19444 3.11006 3.05388 3.64452C2.98204 3.91332 2.98204 16.0841 3.05388 16.3529C3.19444 16.8936 3.60986 17.3124 4.14711 17.453C4.30953 17.4937 5.06229 17.4999 10.5034 17.4999C17.2346 17.4999 16.8285 17.5093 17.194 17.3249C17.4158 17.2124 17.6906 16.9405 17.8093 16.7217C18.0123 16.3404 17.9999 16.6904 17.9999 11.0395C17.9999 6.7044 17.9936 5.88552 17.9561 5.80113C17.8999 5.67298 14.7951 2.57247 14.6796 2.52872C14.6202 2.50684 12.9554 2.49746 9.44769 2.50059C5.05917 2.50059 4.27829 2.50684 4.13461 2.54747ZM7.51112 5.12914C7.52049 6.75441 7.52049 6.76378 7.59233 6.90443C7.70166 7.12947 7.8266 7.26074 8.04212 7.37638L8.2389 7.48265H10.5034H12.768L12.9273 7.39826C13.1647 7.27324 13.2615 7.17948 13.3802 6.96069L13.4864 6.76378L13.4958 5.12914L13.5051 3.49762H13.9018H14.2985L15.651 4.85097L17.0003 6.20119L16.9941 11.1926C16.9847 16.1778 16.9847 16.1841 16.9191 16.2685C16.7661 16.4748 16.738 16.4841 16.0914 16.4935L15.501 16.5029V14.6651C15.501 13.1336 15.4917 12.796 15.4542 12.646C15.3136 12.1053 14.8982 11.6865 14.361 11.5458C14.0861 11.4771 6.9239 11.4739 6.65216 11.5458C6.11179 11.6865 5.69324 12.1022 5.55268 12.6397C5.51208 12.796 5.50583 13.1148 5.50583 14.6651V16.5029L4.91549 16.4935C4.26892 16.4841 4.24081 16.4748 4.08776 16.2685L4.02217 16.1841L4.0128 10.0831C4.00967 6.72628 4.0128 3.93832 4.02217 3.88206C4.04403 3.75704 4.17522 3.59764 4.30328 3.54138C4.37512 3.51013 4.72808 3.50075 5.94937 3.49762H7.50175L7.51112 5.12914ZM12.5025 4.99787V6.49812H10.5034H8.5044V4.99787V3.49762H10.5034H12.5025V4.99787ZM14.2704 12.5804C14.3172 12.6147 14.386 12.6835 14.4203 12.7304C14.4859 12.8148 14.4859 12.8523 14.4953 14.6588L14.5015 16.4998H10.5034H6.50535V14.7057C6.50535 13.5086 6.51785 12.8804 6.53971 12.821C6.58344 12.7054 6.68652 12.5929 6.80209 12.5429C6.88017 12.5085 7.55173 12.5022 10.5409 12.5085C14.1673 12.5147 14.1861 12.5147 14.2704 12.5804Z" fill="white" stroke="white" stroke-width="0.5"/>
                        </svg>Save
                    </Button>
                </div>
            </div>
            <div className={`${styles.RtableData} ${styles.CursorNone}`}>
                <div className={`${styles.DaysRow} ${styles.GridColumn} ${styles.MobileSpaceShow}`}>
                    <div className={`${styles.Columns}`}></div>
                    <div className={`${styles.Columns}`}>
                        <div id='DayOne' onClick={() => handleClick3('DayOne')} className={`${styles.DayTop} ${activeElement === 'DayOne' ? styles.active : ''}`}>
                            <span>Mon<small className='d-none d-xl-inline-block'>,</small> <br className='d-xl-none' /><small>3</small> <small className='d-none d-xl-inline-block'>Jun</small></span>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DayTwo' onClick={() => handleClick3('DayTwo')} className={`${styles.DayTop} ${activeElement === 'DayTwo' ? styles.active : ''}`}>
                            <span>Tue<small className='d-none d-xl-inline-block'>,</small> <br className='d-xl-none' /><small>4</small> <small className='d-none d-xl-inline-block'>Jun</small></span>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DayThree' onClick={() => handleClick3('DayThree')} className={`${styles.DayTop} ${activeElement === 'DayThree' ? styles.active : ''}`}>
                            <span>Wed<small className='d-none d-xl-inline-block'>,</small> <br className='d-xl-none' /><small>5</small> <small className='d-none d-xl-inline-block'>Jun</small></span>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DayFour' onClick={() => handleClick3('DayFour')} className={`${styles.DayTop} ${activeElement === 'DayFour' ? styles.active : ''}`}>
                            <span>Thu<small className='d-none d-xl-inline-block'>,</small> <br className='d-xl-none' /><small>6</small> <small className='d-none d-xl-inline-block'>Jun</small></span>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DayFive' onClick={() => handleClick3('DayFive')} className={`${styles.DayTop} ${activeElement === 'DayFive' ? styles.active : ''}`}>
                            <span>Fri<small className='d-none d-xl-inline-block'>,</small> <br className='d-xl-none' /><small>7</small> <small className='d-none d-xl-inline-block'>Jun</small></span>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DaySix' onClick={() => handleClick3('DaySix')} className={`${styles.DayTop} ${activeElement === 'DaySix' ? styles.active : ''}`}>
                            <span>Sat<small className='d-none d-xl-inline-block'>,</small> <br className='d-xl-none' /><small>8</small> <small className='d-none d-xl-inline-block'>Jun</small></span>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DaySeven' onClick={() => handleClick3('DaySeven')} className={`${styles.DayTop} ${activeElement === 'DaySeven' ? styles.active : ''}`}>
                            <span>Sun<small className='d-none d-xl-inline-block'>,</small> <br className='d-xl-none' /><small>9</small> <small className='d-none d-xl-inline-block'>Jun</small></span>
                        </div>
                    </div>
                </div>
                <div className={`${styles.TheatreRowField} ${styles.BgShow} d-flex`}>
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
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="TheatreOneMon"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("TheatreMonYes") ? checkedItems['TheatreMonYes'] :true}
                                            onChange={() => handleChange('TheatreMonYes', true)}
                                            id="TheatreMonYes"
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="TheatreOneMon"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("TheatreMonNo") ? checkedItems['TheatreMonNo'] :false}
                                            onChange={() => handleChange('TheatreMonNo', false)}
                                            id="TheatreMonNo"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="TheatreOneThu"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("TheatreThuYes") ? checkedItems['TheatreThuYes'] :true}
                                            onChange={() => handleChange('TheatreThuYes', true)}
                                            id="TheatreThuYes"
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="TheatreOneThu"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("TheatreThuNo") ? checkedItems['TheatreThuNo'] :false}
                                            onChange={() => handleChange('TheatreThuNo', false)}
                                            id="TheatreThuNo"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="TheatreOneSat"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("TheatreSatYes") ? checkedItems['TheatreSatYes'] :false}
                                            onChange={() => handleChange('TheatreSatYes', false)}
                                            id="TheatreSatYes"
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="TheatreOneSat"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("TheatreSatNo") ? checkedItems['TheatreSatNo'] :true}
                                            onChange={() => handleChange('TheatreSatNo', true)}
                                            id="TheatreSatNo"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
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
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="TheatreOnePmMon"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("TheatreOnePmMonYes") ? checkedItems['TheatreOnePmMonYes'] :false}
                                            onChange={() => handleChange('TheatreOnePmMonYes', false)}
                                            id="TheatreOnePmMonYes"
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="TheatreOnePmMon"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("TheatreOnePmMonNo") ? checkedItems['TheatreOnePmMonNo'] :true}
                                            onChange={() => handleChange('TheatreOnePmMonNo', true)}
                                            id="TheatreOnePmMonNo"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Urology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="TheatreOnePmSat"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("TheatreOnePmSatYes") ? checkedItems['TheatreOnePmSatYes'] :true}
                                            onChange={() => handleChange('TheatreOnePmSatYes', true)}
                                            id="TheatreOnePmSatYes"
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="TheatreOnePmSat"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("TheatreOnePmSatNo") ? checkedItems['TheatreOnePmSatNo'] :false}
                                            onChange={() => handleChange('TheatreOnePmSatNo', false)}
                                            id="TheatreOnePmSatNo"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
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
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.TheatreRowField} ${styles.BgShow} d-flex`}>
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
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="TheatreIRAmMon"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("TheatreIRAmMonYes") ? checkedItems['TheatreIRAmMonYes'] :true}
                                            onChange={() => handleChange('TheatreIRAmMonYes', true)}
                                            id="TheatreIRAmMonYes"
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="TheatreIRAmMon"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("TheatreIRAmMonNo") ? checkedItems['TheatreIRAmMonNo'] :false}
                                            onChange={() => handleChange('TheatreIRAmMonNo', false)}
                                            id="TheatreIRAmMonNo"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
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
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="TheatreIRPmTue"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("TheatreIRPmTueYes") ? checkedItems['TheatreIRPmTueYes'] :true}
                                            onChange={() => handleChange('TheatreIRPmTueYes', true)}
                                            id="TheatreIRPmTueYes"
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="TheatreIRPmTue"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("TheatreIRPmTueNo") ? checkedItems['TheatreIRPmTueNo'] :false}
                                            onChange={() => handleChange('TheatreIRPmTueNo', false)}
                                            id="TheatreIRPmTueNo"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="TheatreIRPmSat"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("TheatreIRPmSatYes") ? checkedItems['TheatreIRPmSatYes'] :true}
                                            onChange={() => handleChange('TheatreIRPmSatYes', true)}
                                            id="TheatreIRPmSatYes"
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="TheatreIRPmSat"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("TheatreIRPmSatNo") ? checkedItems['TheatreIRPmSatNo'] :false}
                                            onChange={() => handleChange('TheatreIRPmSatNo', false)}
                                            id="TheatreIRPmSatNo"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
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
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.TheatreRowField} ${styles.BgShow} d-flex`}>
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
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Breast</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="MainTheatreAmWed"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("MainTheatreAmWedYes") ? checkedItems['MainTheatreAmWedYes'] :true}
                                            onChange={() => handleChange('MainTheatreAmWedYes', true)}
                                            id="MainTheatreAmWedYes"
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="MainTheatreAmWed"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("MainTheatreAmWedNo") ? checkedItems['MainTheatreAmWedNo'] :false}
                                            onChange={() => handleChange('MainTheatreAmWedNo', false)}
                                            id="MainTheatreAmWedNo"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="MainTheatreAmThu"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("MainTheatreAmThuYes") ? checkedItems['MainTheatreAmThuYes'] :false}
                                            onChange={() => handleChange('MainTheatreAmThuYes', false)}
                                            id="MainTheatreAmThuYes"
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="MainTheatreAmThu"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("MainTheatreAmThuNo") ? checkedItems['MainTheatreAmThuNo'] :true}
                                            onChange={() => handleChange('MainTheatreAmThuNo', true)}
                                            id="MainTheatreAmThuNo"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
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
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>

                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Urology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="MainTheatrePmSat"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("MainTheatrePmSatYes") ? checkedItems['MainTheatrePmSatYes'] :false}
                                            onChange={() => handleChange('MainTheatrePmSatYes', false)}
                                            id="MainTheatrePmSatYes"
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="MainTheatrePmSat"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("MainTheatrePmSatNo") ? checkedItems['MainTheatrePmSatNo'] :true}
                                            onChange={() => handleChange('MainTheatrePmSatNo', true)}
                                            id="MainTheatrePmSatNo"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
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
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.TheatreRowField} ${styles.BgShow} d-flex`}>
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
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="EOCAmMon"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("EOCAmMonYes") ? checkedItems['EOCAmMonYes'] :true}
                                            onChange={() => handleChange('EOCAmMonYes', true)}
                                            id="EOCAmMonYes"
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="EOCAmMon"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("EOCAmMonNo") ? checkedItems['EOCAmMonNo'] :false}
                                            onChange={() => handleChange('EOCAmMonNo', false)}
                                            id="EOCAmMonNo"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="EOCAmSun"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("EOCAmSunYes") ? checkedItems['EOCAmSunYes'] :true}
                                            onChange={() => handleChange('EOCAmSunYes', true)}
                                            id="EOCAmSunYes"
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="EOCAmSun"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("EOCAmSunNo") ? checkedItems['EOCAmSunNo'] :false}
                                            onChange={() => handleChange('EOCAmSunNo', false)}
                                            id="EOCAmSunNo"
                                        />
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
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="EOCPmTue"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("EOCPmTueYes") ? checkedItems['EOCPmTueYes'] :false}
                                            onChange={() => handleChange('EOCPmTueYes', false)}
                                            id="EOCPmTueYes"
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="EOCPmTue"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("EOCPmTueNo") ? checkedItems['EOCPmTueNo'] :true}
                                            onChange={() => handleChange('EOCPmTueNo', true)}
                                            id="EOCPmTueNo"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        <Form.Check
                                            inline
                                            label="Yes"
                                            name="EOCPmThu"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("EOCPmThuYes") ? checkedItems['EOCPmThuYes'] :true}
                                            onChange={() => handleChange('EOCPmThuYes', true)}
                                            id="EOCPmThuYes"
                                        />
                                        <Form.Check
                                            inline
                                            label="No"
                                            name="EOCPmThu"
                                            type="radio"
                                            checked={ checkedItems.hasOwnProperty("EOCPmThuNo") ? checkedItems['EOCPmThuNo'] :false}
                                            onChange={() => handleChange('EOCPmThuNo', false)}
                                            id="EOCPmThuNo"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.RadioBoxBlock}`}>
                                        
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
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default StaffConfimation2
