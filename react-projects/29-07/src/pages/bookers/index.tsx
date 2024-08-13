import Layout from '@/components/Layout';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import Image from 'next/image';
import styles from "@/styles/table.module.css";
import DateRangeCalendar from '@/components/DateRangeCalendar';



const RotaTable = () => {
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

    // Checkbox Checked Condition in table
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
    const handleChange = (id: string, status: boolean) => {
        //console.log(typeof checkedItems[id],"prevState", id)
        setCheckedItems(prevState => ({
        ...prevState,
        [id]: typeof checkedItems[id]==='undefined' ? !status : !checkedItems[id]
        }));
    };

    // console.log("checkedItems", checkedItems);

    // Tab for Mobile
    const [activeElement, setActiveElement] = useState('DayOne');
    const handleClick3 = (id: string) => {
        setActiveElement(id);
    };

  return (
    <Layout>
        <div>
            <h4 className='maintitle'>Bookers Name</h4>
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
            <div className={`${styles.topBothBtn} justify-content-end d-none d-lg-flex`}>
                <div className={`${styles.RightBothBtn}`}>
                    <Button className='outlibe-btn-wicon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                            <path d="M3 8C3.13261 8 3.25979 7.94732 3.35355 7.85355C3.44732 7.75979 3.5 7.63261 3.5 7.5C3.5 7.36739 3.44732 7.24021 3.35355 7.14645C3.25979 7.05268 3.13261 7 3 7C2.86739 7 2.74021 7.05268 2.64645 7.14645C2.55268 7.24021 2.5 7.36739 2.5 7.5C2.5 7.63261 2.55268 7.75979 2.64645 7.85355C2.74021 7.94732 2.86739 8 3 8Z" fill="#295597"/>
                            <path d="M5.5 1C4.96957 1 4.46086 1.21071 4.08579 1.58579C3.71071 1.96086 3.5 2.46957 3.5 3V5H2.5C1.96957 5 1.46086 5.21071 1.08579 5.58579C0.710714 5.96086 0.5 6.46957 0.5 7L0.5 10C0.5 10.5304 0.710714 11.0391 1.08579 11.4142C1.46086 11.7893 1.96957 12 2.5 12H3.5V13C3.5 13.5304 3.71071 14.0391 4.08579 14.4142C4.46086 14.7893 4.96957 15 5.5 15H11.5C12.0304 15 12.5391 14.7893 12.9142 14.4142C13.2893 14.0391 13.5 13.5304 13.5 13V12H14.5C15.0304 12 15.5391 11.7893 15.9142 11.4142C16.2893 11.0391 16.5 10.5304 16.5 10V7C16.5 6.46957 16.2893 5.96086 15.9142 5.58579C15.5391 5.21071 15.0304 5 14.5 5H13.5V3C13.5 2.46957 13.2893 1.96086 12.9142 1.58579C12.5391 1.21071 12.0304 1 11.5 1H5.5ZM4.5 3C4.5 2.73478 4.60536 2.48043 4.79289 2.29289C4.98043 2.10536 5.23478 2 5.5 2H11.5C11.7652 2 12.0196 2.10536 12.2071 2.29289C12.3946 2.48043 12.5 2.73478 12.5 3V5H4.5V3ZM5.5 8C4.96957 8 4.46086 8.21071 4.08579 8.58579C3.71071 8.96086 3.5 9.46957 3.5 10V11H2.5C2.23478 11 1.98043 10.8946 1.79289 10.7071C1.60536 10.5196 1.5 10.2652 1.5 10V7C1.5 6.73478 1.60536 6.48043 1.79289 6.29289C1.98043 6.10536 2.23478 6 2.5 6H14.5C14.7652 6 15.0196 6.10536 15.2071 6.29289C15.3946 6.48043 15.5 6.73478 15.5 7V10C15.5 10.2652 15.3946 10.5196 15.2071 10.7071C15.0196 10.8946 14.7652 11 14.5 11H13.5V10C13.5 9.46957 13.2893 8.96086 12.9142 8.58579C12.5391 8.21071 12.0304 8 11.5 8H5.5ZM12.5 10V13C12.5 13.2652 12.3946 13.5196 12.2071 13.7071C12.0196 13.8946 11.7652 14 11.5 14H5.5C5.23478 14 4.98043 13.8946 4.79289 13.7071C4.60536 13.5196 4.5 13.2652 4.5 13V10C4.5 9.73478 4.60536 9.48043 4.79289 9.29289C4.98043 9.10536 5.23478 9 5.5 9H11.5C11.7652 9 12.0196 9.10536 12.2071 9.29289C12.3946 9.48043 12.5 9.73478 12.5 10Z" fill="#295597"/>
                        </svg>Print
                    </Button>
                </div>
            </div>
            <div className={`${styles.RtableData} ${styles.CursorNone} ${styles.Bookers}`}>
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
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="ophthalmology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-Ophthalmologycheck-1") ? checkedItems['inline-Ophthalmologycheck-1'] :true}
                                            onChange={() => handleChange('inline-Ophthalmologycheck-1', true)}
                                            id="inline-Ophthalmologycheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="ophthalmology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-Ophthalmologycheck-2") ? checkedItems['inline-Ophthalmologycheck-2'] :true}
                                            onChange={() => handleChange('inline-Ophthalmologycheck-2', true)}
                                            id="inline-Ophthalmologycheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="ophthalmology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-Ophthalmologycheck-3") ? checkedItems['inline-Ophthalmologycheck-3'] :true}
                                            onChange={() => handleChange('inline-Ophthalmologycheck-3', true)}
                                            id="inline-Ophthalmologycheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="Orthopaedics"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-Orthopaedicscheck-1") ? checkedItems['inline-Orthopaedicscheck-1'] :true}
                                            onChange={() => handleChange('inline-Orthopaedicscheck-1', true)}
                                            id="inline-Orthopaedicscheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="Orthopaedics"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-Orthopaedicscheck-2") ? checkedItems['inline-Orthopaedicscheck-2'] :true}
                                            onChange={() => handleChange('inline-Orthopaedicscheck-2', true)}
                                            id="inline-Orthopaedicscheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="Orthopaedics"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-Orthopaedicscheck-3") ? checkedItems['inline-Orthopaedicscheck-3'] :true}
                                            onChange={() => handleChange('inline-Orthopaedicscheck-3', true)}
                                            id="inline-Orthopaedicscheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="ENT"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-ENTcheck-1") ? checkedItems['inline-ENTcheck-1'] :true}
                                            onChange={() => handleChange('inline-ENTcheck-1', true)}
                                            id="inline-ENTcheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="ENT"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-ENTcheck-2") ? checkedItems['inline-ENTcheck-2'] :true}
                                            onChange={() => handleChange('inline-ENTcheck-2', true)}
                                            id="inline-ENTcheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="ENT"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-ENTcheck-3") ? checkedItems['inline-ENTcheck-3'] :true}
                                            onChange={() => handleChange('inline-ENTcheck-3', true)}
                                            id="inline-ENTcheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
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
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="PMENT"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-PMENTcheck-1") ? checkedItems['inline-PMENTcheck-1'] :true}
                                            onChange={() => handleChange('inline-PMENTcheck-1', true)}
                                            id="inline-PMENTcheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="PMENT"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-PMENTcheck-2") ? checkedItems['inline-PMENTcheck-2'] :true}
                                            onChange={() => handleChange('inline-PMENTcheck-2', true)}
                                            id="inline-PMENTcheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="PMENT"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-PMENTcheck-3") ? checkedItems['inline-PMENTcheck-3'] :true}
                                            onChange={() => handleChange('inline-PMENTcheck-3', true)}
                                            id="inline-PMENTcheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Urology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="PMUrology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-PMUrologycheck-1") ? checkedItems['inline-PMUrologycheck-1'] :true}
                                            onChange={() => handleChange('inline-PMUrologycheck-1', true)}
                                            id="inline-PMUrologycheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="PMUrology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-PMUrologycheck-2") ? checkedItems['inline-PMUrologycheck-2'] :true}
                                            onChange={() => handleChange('inline-PMUrologycheck-2', true)}
                                            id="inline-PMUrologycheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="PMUrology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-PMUrologycheck-3") ? checkedItems['inline-PMUrologycheck-3'] :true}
                                            onChange={() => handleChange('inline-PMUrologycheck-3', true)}
                                            id="inline-PMUrologycheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
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
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="TheatreMFU"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatreMFUcheck-1") ? checkedItems['inline-TheatreMFUcheck-1'] :true}
                                            onChange={() => handleChange('inline-TheatreMFUcheck-1', true)}
                                            id="inline-TheatreMFUcheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="TheatreMFU"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatreMFUcheck-2") ? checkedItems['inline-TheatreMFUcheck-2'] :true}
                                            onChange={() => handleChange('inline-TheatreMFUcheck-2', true)}
                                            id="inline-TheatreMFUcheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="TheatreMFU"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatreMFUcheck-3") ? checkedItems['inline-TheatreMFUcheck-3'] :true}
                                            onChange={() => handleChange('inline-TheatreMFUcheck-3', true)}
                                            id="inline-TheatreMFUcheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Ophthalmology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="TheatreOphthalmology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatreOphthalmologycheck-1") ? checkedItems['inline-TheatreOphthalmologycheck-1'] :true}
                                            onChange={() => handleChange('inline-TheatreOphthalmologycheck-1', true)}
                                            id="inline-TheatreOphthalmologycheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="TheatreOphthalmology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatreOphthalmologycheck-2") ? checkedItems['inline-TheatreOphthalmologycheck-2'] :true}
                                            onChange={() => handleChange('inline-TheatreOphthalmologycheck-2', true)}
                                            id="inline-TheatreOphthalmologycheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="TheatreOphthalmology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatreOphthalmologycheck-3") ? checkedItems['inline-TheatreOphthalmologycheck-3'] :true}
                                            onChange={() => handleChange('inline-TheatreOphthalmologycheck-3', true)}
                                            id="inline-TheatreOphthalmologycheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="TheatreGynaecology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatreGynaecologycheck-1") ? checkedItems['inline-TheatreGynaecologycheck-1'] :true}
                                            onChange={() => handleChange('inline-TheatreGynaecologycheck-1', true)}
                                            id="inline-TheatreGynaecologycheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="TheatreGynaecology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatreGynaecologycheck-2") ? checkedItems['inline-TheatreGynaecologycheck-2'] :true}
                                            onChange={() => handleChange('inline-TheatreGynaecologycheck-2', true)}
                                            id="inline-TheatreGynaecologycheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="TheatreGynaecology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatreGynaecologycheck-3") ? checkedItems['inline-TheatreGynaecologycheck-3'] :true}
                                            onChange={() => handleChange('inline-TheatreGynaecologycheck-3', true)}
                                            id="inline-TheatreGynaecologycheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
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
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="TheatrePMGynaecology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatrePMGynaecologycheck-1") ? checkedItems['inline-TheatrePMGynaecologycheck-1'] :true}
                                            onChange={() => handleChange('inline-TheatrePMGynaecologycheck-1', true)}
                                            id="inline-TheatrePMGynaecologycheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="TheatrePMGynaecology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatrePMGynaecologycheck-2") ? checkedItems['inline-TheatrePMGynaecologycheck-2'] :true}
                                            onChange={() => handleChange('inline-TheatrePMGynaecologycheck-2', true)}
                                            id="inline-TheatrePMGynaecologycheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="TheatrePMGynaecology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatrePMGynaecologycheck-3") ? checkedItems['inline-TheatrePMGynaecologycheck-3'] :true}
                                            onChange={() => handleChange('inline-TheatrePMGynaecologycheck-3', true)}
                                            id="inline-TheatrePMGynaecologycheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="TheatrePMMFU"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatrePMMFUcheck-1") ? checkedItems['inline-TheatrePMMFUcheck-1'] :true}
                                            onChange={() => handleChange('inline-TheatrePMMFUcheck-1', true)}
                                            id="inline-TheatrePMMFUcheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="TheatrePMMFU"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatrePMMFUcheck-2") ? checkedItems['inline-TheatrePMMFUcheck-2'] :true}
                                            onChange={() => handleChange('inline-TheatrePMMFUcheck-2', true)}
                                            id="inline-TheatrePMMFUcheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="TheatrePMMFU"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatrePMMFUcheck-3") ? checkedItems['inline-TheatrePMMFUcheck-3'] :true}
                                            onChange={() => handleChange('inline-TheatrePMMFUcheck-3', true)}
                                            id="inline-TheatrePMMFUcheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="TheatrePMENT"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatrePMENTcheck-1") ? checkedItems['inline-TheatrePMENTcheck-1'] :true}
                                            onChange={() => handleChange('inline-TheatrePMENTcheck-1', true)}
                                            id="inline-TheatrePMENTcheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="TheatrePMENT"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatrePMENTcheck-2") ? checkedItems['inline-TheatrePMENTcheck-2'] :true}
                                            onChange={() => handleChange('inline-TheatrePMENTcheck-2', true)}
                                            id="inline-TheatrePMENTcheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="TheatrePMENT"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-TheatrePMENTcheck-3") ? checkedItems['inline-TheatrePMENTcheck-3'] :true}
                                            onChange={() => handleChange('inline-TheatrePMENTcheck-3', true)}
                                            id="inline-TheatrePMENTcheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
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
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="MainTheatreMFU"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatreMFUcheck-1") ? checkedItems['inline-MainTheatreMFUcheck-1'] :true}
                                            onChange={() => handleChange('inline-MainTheatreMFUcheck-1', true)}
                                            id="inline-MainTheatreMFUcheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="MainTheatreMFU"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatreMFUcheck-2") ? checkedItems['inline-MainTheatreMFUcheck-2'] :true}
                                            onChange={() => handleChange('inline-MainTheatreMFUcheck-2', true)}
                                            id="inline-MainTheatreMFUcheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="MainTheatreMFU"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatreMFUcheck-3") ? checkedItems['inline-MainTheatreMFUcheck-3'] :true}
                                            onChange={() => handleChange('inline-MainTheatreMFUcheck-3', true)}
                                            id="inline-MainTheatreMFUcheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Breast</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="MainTheatreBreast"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatreBreastcheck-1") ? checkedItems['inline-MainTheatreBreastcheck-1'] :true}
                                            onChange={() => handleChange('inline-MainTheatreBreastcheck-1', true)}
                                            id="inline-MainTheatreBreastcheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="MainTheatreBreast"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatreBreastcheck-2") ? checkedItems['inline-MainTheatreBreastcheck-2'] :true}
                                            onChange={() => handleChange('inline-MainTheatreBreastcheck-2', true)}
                                            id="inline-MainTheatreBreastcheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="MainTheatreBreast"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatreBreastcheck-3") ? checkedItems['inline-MainTheatreBreastcheck-3'] :true}
                                            onChange={() => handleChange('inline-MainTheatreBreastcheck-3', true)}
                                            id="inline-MainTheatreBreastcheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="MainTheatreOrthopaedics"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatreOrthopaedicscheck-1") ? checkedItems['inline-MainTheatreOrthopaedicscheck-1'] :true}
                                            onChange={() => handleChange('inline-MainTheatreOrthopaedicscheck-1', true)}
                                            id="inline-MainTheatreOrthopaedicscheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="MainTheatreOrthopaedics"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatreOrthopaedicscheck-2") ? checkedItems['inline-MainTheatreOrthopaedicscheck-2'] :true}
                                            onChange={() => handleChange('inline-MainTheatreOrthopaedicscheck-2', true)}
                                            id="inline-MainTheatreOrthopaedicscheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="MainTheatreOrthopaedics"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatreOrthopaedicscheck-3") ? checkedItems['inline-MainTheatreOrthopaedicscheck-3'] :true}
                                            onChange={() => handleChange('inline-MainTheatreOrthopaedicscheck-3', true)}
                                            id="inline-MainTheatreOrthopaedicscheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="MainTheatreENT"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatreENTcheck-1") ? checkedItems['inline-MainTheatreENTcheck-1'] :true}
                                            onChange={() => handleChange('inline-MainTheatreENTcheck-1', true)}
                                            id="inline-MainTheatreENTcheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="MainTheatreENT"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatreENTcheck-2") ? checkedItems['inline-MainTheatreENTcheck-2'] :true}
                                            onChange={() => handleChange('inline-MainTheatreENTcheck-2', true)}
                                            id="inline-MainTheatreENTcheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="MainTheatreENT"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatreENTcheck-3") ? checkedItems['inline-MainTheatreENTcheck-3'] :true}
                                            onChange={() => handleChange('inline-MainTheatreENTcheck-3', true)}
                                            id="inline-MainTheatreENTcheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="MainTheatreOrthopaedics2"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatreOrthopaedics2check-1") ? checkedItems['inline-MainTheatreOrthopaedics2check-1'] :true}
                                            onChange={() => handleChange('inline-MainTheatreOrthopaedics2check-1', true)}
                                            id="inline-MainTheatreOrthopaedics2check-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="MainTheatreOrthopaedics2"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatreOrthopaedics2check-2") ? checkedItems['inline-MainTheatreOrthopaedics2check-2'] :true}
                                            onChange={() => handleChange('inline-MainTheatreOrthopaedics2check-2', true)}
                                            id="inline-MainTheatreOrthopaedics2check-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="MainTheatreOrthopaedics2"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatreOrthopaedics2check-3") ? checkedItems['inline-MainTheatreOrthopaedics2check-3'] :true}
                                            onChange={() => handleChange('inline-MainTheatreOrthopaedics2check-3', true)}
                                            id="inline-MainTheatreOrthopaedics2check-3"
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
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="MainTheatrePMGynaecology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatrePMGynaecologycheck-1") ? checkedItems['inline-MainTheatrePMGynaecologycheck-1'] :true}
                                            onChange={() => handleChange('inline-MainTheatrePMGynaecologycheck-1', true)}
                                            id="inline-MainTheatrePMGynaecologycheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="MainTheatrePMGynaecology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatrePMGynaecologycheck-2") ? checkedItems['inline-MainTheatrePMGynaecologycheck-2'] :true}
                                            onChange={() => handleChange('inline-MainTheatrePMGynaecologycheck-2', true)}
                                            id="inline-MainTheatrePMGynaecologycheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="MainTheatrePMGynaecology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatrePMGynaecologycheck-3") ? checkedItems['inline-MainTheatrePMGynaecologycheck-3'] :true}
                                            onChange={() => handleChange('inline-MainTheatrePMGynaecologycheck-3', true)}
                                            id="inline-MainTheatrePMGynaecologycheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Urology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="MainTheatrePMUrology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatrePMUrologycheck-1") ? checkedItems['inline-MainTheatrePMUrologycheck-1'] :true}
                                            onChange={() => handleChange('inline-MainTheatrePMUrologycheck-1', true)}
                                            id="inline-MainTheatrePMUrologycheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="MainTheatrePMUrology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatrePMUrologycheck-2") ? checkedItems['inline-MainTheatrePMUrologycheck-2'] :true}
                                            onChange={() => handleChange('inline-MainTheatrePMUrologycheck-2', true)}
                                            id="inline-MainTheatrePMUrologycheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="MainTheatrePMUrology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-MainTheatrePMUrologycheck-3") ? checkedItems['inline-MainTheatrePMUrologycheck-3'] :true}
                                            onChange={() => handleChange('inline-MainTheatrePMUrologycheck-3', true)}
                                            id="inline-MainTheatrePMUrologycheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
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
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="EOCMFU"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCMFUcheck-1") ? checkedItems['inline-EOCMFUcheck-1'] :true}
                                            onChange={() => handleChange('inline-EOCMFUcheck-1', true)}
                                            id="inline-EOCMFUcheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="EOCMFU"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCMFUcheck-2") ? checkedItems['inline-EOCMFUcheck-2'] :true}
                                            onChange={() => handleChange('inline-EOCMFUcheck-2', true)}
                                            id="inline-EOCMFUcheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="EOCMFU"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCMFUcheck-3") ? checkedItems['inline-EOCMFUcheck-3'] :true}
                                            onChange={() => handleChange('inline-EOCMFUcheck-3', true)}
                                            id="inline-EOCMFUcheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Ophthalmology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="EOCOphthalmologycheck"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCOphthalmologycheck-1") ? checkedItems['inline-EOCOphthalmologycheck-1'] :true}
                                            onChange={() => handleChange('inline-EOCOphthalmologycheck-1', true)}
                                            id="inline-EOCOphthalmologycheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="EOCOphthalmology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCOphthalmologycheck-2") ? checkedItems['inline-EOCOphthalmologycheck-2'] :true}
                                            onChange={() => handleChange('inline-EOCOphthalmologycheck-2', true)}
                                            id="inline-EOCOphthalmologycheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="EOCOphthalmology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCOphthalmologycheck-3") ? checkedItems['inline-EOCOphthalmologycheck-3'] :true}
                                            onChange={() => handleChange('inline-EOCOphthalmologycheck-3', true)}
                                            id="inline-EOCOphthalmologycheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="EOCGynaecology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCGynaecologycheck-1") ? checkedItems['inline-EOCGynaecologycheck-1'] :true}
                                            onChange={() => handleChange('inline-EOCGynaecologycheck-1', true)}
                                            id="inline-EOCGynaecologycheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="EOCGynaecology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCGynaecologycheck-2") ? checkedItems['inline-EOCGynaecologycheck-2'] :true}
                                            onChange={() => handleChange('inline-EOCGynaecologycheck-2', true)}
                                            id="inline-EOCGynaecologycheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="EOCGynaecology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCGynaecologycheck-3") ? checkedItems['inline-EOCGynaecologycheck-3'] :true}
                                            onChange={() => handleChange('inline-EOCGynaecologycheck-3', true)}
                                            id="inline-EOCGynaecologycheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="EOCMFU2"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCMFU2check-1") ? checkedItems['inline-EOCMFU2check-1'] :true}
                                            onChange={() => handleChange('inline-EOCMFU2check-1', true)}
                                            id="inline-EOCMFU2check-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="EOCMFU2"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCMFU2check-2") ? checkedItems['inline-EOCMFU2check-2'] :true}
                                            onChange={() => handleChange('inline-EOCMFU2check-2', true)}
                                            id="inline-EOCMFU2check-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="EOCMFU2"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCMFU2check-3") ? checkedItems['inline-EOCMFU2check-3'] :true}
                                            onChange={() => handleChange('inline-EOCMFU2check-3', true)}
                                            id="inline-EOCMFU2check-3"
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
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="EOCPMGynaecology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCPMGynaecologycheck-1") ? checkedItems['inline-EOCPMGynaecologycheck-1'] :true}
                                            onChange={() => handleChange('inline-EOCPMGynaecologycheck-1', true)}
                                            id="inline-EOCPMGynaecologycheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="EOCPMGynaecology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCPMGynaecologycheck-2") ? checkedItems['inline-EOCPMGynaecologycheck-2'] :true}
                                            onChange={() => handleChange('inline-EOCPMGynaecologycheck-2', true)}
                                            id="inline-EOCPMGynaecologycheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="EOCPMGynaecology"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCPMGynaecologycheck-3") ? checkedItems['inline-EOCPMGynaecologycheck-3'] :true}
                                            onChange={() => handleChange('inline-EOCPMGynaecologycheck-3', true)}
                                            id="inline-EOCPMGynaecologycheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="EOCPMMFU"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCPMMFUcheck-1") ? checkedItems['inline-EOCPMMFUcheck-1'] :true}
                                            onChange={() => handleChange('inline-EOCPMMFUcheck-1', true)}
                                            id="inline-EOCPMMFUcheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="EOCPMMFU"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCPMMFUcheck-2") ? checkedItems['inline-EOCPMMFUcheck-2'] :true}
                                            onChange={() => handleChange('inline-EOCPMMFUcheck-2', true)}
                                            id="inline-EOCPMMFUcheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="EOCPMMFU"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCPMMFUcheck-3") ? checkedItems['inline-EOCPMMFUcheck-3'] :true}
                                            onChange={() => handleChange('inline-EOCPMMFUcheck-3', true)}
                                            id="inline-EOCPMMFUcheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="EOCPMOrthopaedics"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCPMOrthopaedicscheck-1") ? checkedItems['inline-EOCPMOrthopaedicscheck-1'] :true}
                                            onChange={() => handleChange('inline-EOCPMOrthopaedicscheck-1', true)}
                                            id="inline-EOCPMOrthopaedicscheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="EOCPMOrthopaedics"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCPMOrthopaedicscheck-2") ? checkedItems['inline-EOCPMOrthopaedicscheck-2'] :true}
                                            onChange={() => handleChange('inline-EOCPMOrthopaedicscheck-2', true)}
                                            id="inline-EOCPMOrthopaedicscheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="EOCPMOrthopaedics"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCPMOrthopaedicscheck-3") ? checkedItems['inline-EOCPMOrthopaedicscheck-3'] :true}
                                            onChange={() => handleChange('inline-EOCPMOrthopaedicscheck-3', true)}
                                            id="inline-EOCPMOrthopaedicscheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6></h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="EOCPMENT"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCPMENTcheck-1") ? checkedItems['inline-EOCPMENTcheck-1'] :true}
                                            onChange={() => handleChange('inline-EOCPMENTcheck-1', true)}
                                            id="inline-EOCPMENTcheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="EOCPMENT"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCPMENTcheck-2") ? checkedItems['inline-EOCPMENTcheck-2'] :true}
                                            onChange={() => handleChange('inline-EOCPMENTcheck-2', true)}
                                            id="inline-EOCPMENTcheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="EOCPMENT"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCPMENTcheck-3") ? checkedItems['inline-EOCPMENTcheck-3'] :true}
                                            onChange={() => handleChange('inline-EOCPMENTcheck-3', true)}
                                            id="inline-EOCPMENTcheck-3"
                                        />
                                    </div>
                                </div>
                                <div className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Vascular</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <Form.Check
                                            inline
                                            label="1"
                                            name="EOCPMVascular"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCPMVascularcheck-1") ? checkedItems['inline-EOCPMVascularcheck-1'] :true}
                                            onChange={() => handleChange('inline-EOCPMVascularcheck-1', true)}
                                            id="inline-EOCPMVascularcheck-1"
                                        />
                                        <Form.Check
                                            inline
                                            label="2"
                                            name="EOCPMVascular"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCPMVascularcheck-2") ? checkedItems['inline-EOCPMVascularcheck-2'] :true}
                                            onChange={() => handleChange('inline-EOCPMVascularcheck-2', true)}
                                            id="inline-EOCPMVascularcheck-2"
                                        />
                                        <Form.Check
                                            inline
                                            label="3"
                                            name="EOCPMVascular"
                                            type="checkbox"
                                            checked={ checkedItems.hasOwnProperty("inline-EOCPMVascularcheck-3") ? checkedItems['inline-EOCPMVascularcheck-3'] :true}
                                            onChange={() => handleChange('inline-EOCPMVascularcheck-3', true)}
                                            id="inline-EOCPMVascularcheck-3"
                                        />
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

export default RotaTable
