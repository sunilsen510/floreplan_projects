import Layout from '@/components/Layout';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Modal, ProgressBar } from 'react-bootstrap';
import Image from 'next/image';
import styles from "@/styles/table.module.css";
import DateRangeCalendar from '@/components/DateRangeCalendar';



const RotaTable = () => {
    const [DocDetailsShow, setDocDetailsShow] = useState(false);
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
    const handleCheckboxClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    // Modal Open When click on data
    const ModalOpenClick = () => {
        setDocDetailsShow(true);
    };

    // ProgressBar
    const now = 75;
    const now2 = 55;
    const now3 = 30;

    // Filter
    const [filterShow, setFilterShow] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<string>('Role');
    const [selectedOptionsFilter, setSelectedOptionsFilter] = useState<string[]>([]);
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const selectBoxRef = useRef<HTMLDivElement>(null);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilter(event.target.value);
    setSelectedOptionsFilter([]);
    };

    const handleOptionChange = (option: string) => {
        setSelectedOptionsFilter((prevSelectedOptions) => {
            if (prevSelectedOptions.includes(option)) {
            return prevSelectedOptions.filter((opt) => opt !== option);
            } else {
            return [...prevSelectedOptions, option];
            }
        });
    };
    const handleClickOutside = (event: MouseEvent) => {
    if (selectBoxRef.current && !selectBoxRef.current.contains(event.target as Node)) {
        setShowOptions(false);
    }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const renderOptions = () => {
        let options: string[] = [];
        switch (selectedFilter) {
            case 'Room':
            options = ['BHD', 'DSU 1', 'DSU 2', 'DSU 3', 'EOC 1', 'EOC 2', 'EOC 3', 'EOC 4', 'Main Theatre 1', 'Main Theatre 2', 'Main Theatre 3', 'Main Theatre 4', 'Main Theatre 5', 'Main Theatre 7', 'Main Theatre 6/EVT', 'Ophthal Suite', 'Theatre I.R Suite', 'Virtual'];
            break;
            case 'Specialty':
            options = ['Orthopaedics', 'Ophthalmology', 'ENT', 'Gynaecology', 'Urology', 'General', 'MFU', 'Breast', 'Vascular'];
            break;
            case 'Status':
            options = ['Closed', 'At Risk'];
            break;
            default:
            break;
        }
        return options.map((option) => (
            <li key={option} className="option">
                <label>
                    <input
                        type="checkbox"
                        id={option}
                        value={option}
                        checked={selectedOptionsFilter.includes(option)}
                        onChange={() => handleOptionChange(option)}
                    />
                    <span>{option}</span>
                </label>
            </li>
        ));
    };

    // Tab for Mobile
        const [activeElement, setActiveElement] = useState('DayOne');
        const handleClick3 = (id: string) => {
            setActiveElement(id);
        };

  return (
    <Layout>
        <div>
            <h4 className='maintitle'>Reports</h4>
            <div className="topBlock">
                <div className={`${styles.TableBlockInner} topBlockInner`}>
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
                    <Link href="/session-template" className='outlibe-btn-wicon outlibe-btn-wiconsmall'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M19.045 7.40137C19.423 7.02337 19.631 6.52137 19.631 5.98737C19.631 5.45337 19.423 4.95137 19.045 4.57337L17.459 2.98737C17.081 2.60937 16.579 2.40137 16.045 2.40137C15.511 2.40137 15.009 2.60937 14.632 2.98637L4 13.5854V18.0004H8.413L19.045 7.40137ZM16.045 4.40137L17.632 5.98637L16.042 7.57037L14.456 5.98537L16.045 4.40137ZM6 16.0004V14.4154L13.04 7.39737L14.626 8.98337L7.587 16.0004H6ZM4 20.0004H20V22.0004H4V20.0004Z" fill="#295597"/>
                        </svg>Edit
                    </Link>
                </div>
                <div className={`${styles.RightBothBtn}`}>
                    <Button className='outlibe-btn-wicon' onClick={() => setFilterShow(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                            <path d="M1.62985 2.97264L6.88463 9.68182V15L10.1154 12.6364V9.68182L15.3702 2.97264C15.6695 2.58855 15.4181 2 14.9539 2H2.04607C1.58192 2 1.33047 2.58855 1.62985 2.97264Z" stroke="#295597" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>Filter
                    </Button>
                    <Button className='outlibe-btn-wicon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                            <path d="M3 8C3.13261 8 3.25979 7.94732 3.35355 7.85355C3.44732 7.75979 3.5 7.63261 3.5 7.5C3.5 7.36739 3.44732 7.24021 3.35355 7.14645C3.25979 7.05268 3.13261 7 3 7C2.86739 7 2.74021 7.05268 2.64645 7.14645C2.55268 7.24021 2.5 7.36739 2.5 7.5C2.5 7.63261 2.55268 7.75979 2.64645 7.85355C2.74021 7.94732 2.86739 8 3 8Z" fill="#295597"/>
                            <path d="M5.5 1C4.96957 1 4.46086 1.21071 4.08579 1.58579C3.71071 1.96086 3.5 2.46957 3.5 3V5H2.5C1.96957 5 1.46086 5.21071 1.08579 5.58579C0.710714 5.96086 0.5 6.46957 0.5 7L0.5 10C0.5 10.5304 0.710714 11.0391 1.08579 11.4142C1.46086 11.7893 1.96957 12 2.5 12H3.5V13C3.5 13.5304 3.71071 14.0391 4.08579 14.4142C4.46086 14.7893 4.96957 15 5.5 15H11.5C12.0304 15 12.5391 14.7893 12.9142 14.4142C13.2893 14.0391 13.5 13.5304 13.5 13V12H14.5C15.0304 12 15.5391 11.7893 15.9142 11.4142C16.2893 11.0391 16.5 10.5304 16.5 10V7C16.5 6.46957 16.2893 5.96086 15.9142 5.58579C15.5391 5.21071 15.0304 5 14.5 5H13.5V3C13.5 2.46957 13.2893 1.96086 12.9142 1.58579C12.5391 1.21071 12.0304 1 11.5 1H5.5ZM4.5 3C4.5 2.73478 4.60536 2.48043 4.79289 2.29289C4.98043 2.10536 5.23478 2 5.5 2H11.5C11.7652 2 12.0196 2.10536 12.2071 2.29289C12.3946 2.48043 12.5 2.73478 12.5 3V5H4.5V3ZM5.5 8C4.96957 8 4.46086 8.21071 4.08579 8.58579C3.71071 8.96086 3.5 9.46957 3.5 10V11H2.5C2.23478 11 1.98043 10.8946 1.79289 10.7071C1.60536 10.5196 1.5 10.2652 1.5 10V7C1.5 6.73478 1.60536 6.48043 1.79289 6.29289C1.98043 6.10536 2.23478 6 2.5 6H14.5C14.7652 6 15.0196 6.10536 15.2071 6.29289C15.3946 6.48043 15.5 6.73478 15.5 7V10C15.5 10.2652 15.3946 10.5196 15.2071 10.7071C15.0196 10.8946 14.7652 11 14.5 11H13.5V10C13.5 9.46957 13.2893 8.96086 12.9142 8.58579C12.5391 8.21071 12.0304 8 11.5 8H5.5ZM12.5 10V13C12.5 13.2652 12.3946 13.5196 12.2071 13.7071C12.0196 13.8946 11.7652 14 11.5 14H5.5C5.23478 14 4.98043 13.8946 4.79289 13.7071C4.60536 13.5196 4.5 13.2652 4.5 13V10C4.5 9.73478 4.60536 9.48043 4.79289 9.29289C4.98043 9.10536 5.23478 9 5.5 9H11.5C11.7652 9 12.0196 9.10536 12.2071 9.29289C12.3946 9.48043 12.5 9.73478 12.5 10Z" fill="#295597"/>
                        </svg>Print
                    </Button>
                </div>
            </div>
            <div className={`${styles.RtableData}`}>
                <div className={`${styles.DaysRow} ${styles.GridColumn}`}>
                    <div className={`${styles.Columns}`}></div>
                    <div className={`${styles.Columns}`}>
                        <div id='DayOne' onClick={() => handleClick3('DayOne')} className={`${styles.DayTop} ${activeElement === 'DayOne' ? styles.active : ''}`}>
                            <span>Mon<small className='d-none d-xl-inline-block'>,</small> <br className='d-xl-none' /><small>3</small> <small className='d-none d-xl-inline-block'>Jun</small></span>
                            <label className={`${styles.FullResult}`}><span>{`${now}%`}</span><ProgressBar now={now} className={`${styles.ProgressBar}`} /></label>
                        </div>
                        <div className={`${styles.SurgenSpecial} ${styles.FullResult}`}>
                            <ul>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/surgeon.svg" width={20} height={20} alt="Surgeons Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now}%`}</span></label>
                                </li>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/anaesthetics.svg" width={20} height={20} alt="Anaesthetics Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now}%`}</span></label>
                                </li>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/staff.svg" width={20} height={20} alt="Staff Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now}%`}</span></label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DayTwo' onClick={() => handleClick3('DayTwo')} className={`${styles.DayTop} ${activeElement === 'DayTwo' ? styles.active : ''}`}>
                            <span>Tue<small className='d-none d-xl-inline-block'>,</small> <br className='d-xl-none' /><small>4</small> <small className='d-none d-xl-inline-block'>Jun</small></span>
                            <label className={`${styles.halfResult}`}><span>{`${now2}%`}</span><ProgressBar now={now} className={`${styles.ProgressBar}`} /></label>
                        </div>
                        <div className={`${styles.SurgenSpecial}`}>
                            <ul>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/surgeon.svg" width={20} height={20} alt="Surgeons Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.halfResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now2}%`}</span></label>
                                </li>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/anaesthetics.svg" width={20} height={20} alt="Anaesthetics Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.halfResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now2}%`}</span></label>
                                </li>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/staff.svg" width={20} height={20} alt="Staff Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.halfResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now2}%`}</span></label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DayThree' onClick={() => handleClick3('DayThree')} className={`${styles.DayTop} ${activeElement === 'DayThree' ? styles.active : ''}`}>
                            <span>Wed<small className='d-none d-xl-inline-block'>,</small> <br className='d-xl-none' /><small>5</small> <small className='d-none d-xl-inline-block'>Jun</small></span>
                            <label className={`${styles.quaterResult}`}><span>{`${now3}%`}</span><ProgressBar now={now} className={`${styles.ProgressBar}`} /></label>
                        </div>
                        <div className={`${styles.SurgenSpecial}`}>
                            <ul>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/surgeon.svg" width={20} height={20} alt="Surgeons Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.quaterResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now3}%`}</span></label>
                                </li>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/anaesthetics.svg" width={20} height={20} alt="Anaesthetics Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.quaterResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now3}%`}</span></label>
                                </li>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/staff.svg" width={20} height={20} alt="Staff Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.quaterResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now3}%`}</span></label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DayFour' onClick={() => handleClick3('DayFour')} className={`${styles.DayTop} ${activeElement === 'DayFour' ? styles.active : ''}`}>
                            <span>Thu<small className='d-none d-xl-inline-block'>,</small> <br className='d-xl-none' /><small>6</small> <small className='d-none d-xl-inline-block'>Jun</small></span>
                            <label className={`${styles.FullResult}`}><span>{`${now}%`}</span><ProgressBar now={now} className={`${styles.ProgressBar}`} /></label>
                        </div>
                        <div className={`${styles.SurgenSpecial}`}>
                            <ul>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/surgeon.svg" width={20} height={20} alt="Surgeons Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.FullResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now}%`}</span></label>
                                </li>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/anaesthetics.svg" width={20} height={20} alt="Anaesthetics Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.FullResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now}%`}</span></label>
                                </li>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/staff.svg" width={20} height={20} alt="Staff Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.FullResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now}%`}</span></label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DayFive' onClick={() => handleClick3('DayFive')} className={`${styles.DayTop} ${activeElement === 'DayFive' ? styles.active : ''}`}>
                            <span>Fri<small className='d-none d-xl-inline-block'>,</small> <br className='d-xl-none' /><small>7</small> <small className='d-none d-xl-inline-block'>Jun</small></span>
                            <label className={`${styles.FullResult}`}><span>{`${now}%`}</span><ProgressBar now={now} className={`${styles.ProgressBar}`} /></label>
                        </div>
                        <div className={`${styles.SurgenSpecial}`}>
                            <ul>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/surgeon.svg" width={20} height={20} alt="Surgeons Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.FullResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now}%`}</span></label>
                                </li>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/anaesthetics.svg" width={20} height={20} alt="Anaesthetics Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.FullResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now}%`}</span></label>
                                </li>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/staff.svg" width={20} height={20} alt="Staff Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.FullResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now}%`}</span></label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DaySix' onClick={() => handleClick3('DaySix')} className={`${styles.DayTop} ${activeElement === 'DaySix' ? styles.active : ''}`}>
                            <span>Sat<small className='d-none d-xl-inline-block'>,</small> <br className='d-xl-none' /><small>8</small> <small className='d-none d-xl-inline-block'>Jun</small></span>
                            <label className={`${styles.FullResult}`}><span>{`${now}%`}</span><ProgressBar now={now} className={`${styles.ProgressBar}`} /></label>
                        </div>
                        <div className={`${styles.SurgenSpecial}`}>
                            <ul>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/surgeon.svg" width={20} height={20} alt="Surgeons Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.FullResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now}%`}</span></label>
                                </li>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/anaesthetics.svg" width={20} height={20} alt="Anaesthetics Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.FullResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now}%`}</span></label>
                                </li>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/staff.svg" width={20} height={20} alt="Staff Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.FullResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now}%`}</span></label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${styles.Columns}`}>
                        <div id='DaySeven' onClick={() => handleClick3('DaySeven')} className={`${styles.DayTop} ${activeElement === 'DaySeven' ? styles.active : ''}`}>
                            <span>Sun<small className='d-none d-xl-inline-block'>,</small> <br className='d-xl-none' /><small>9</small> <small className='d-none d-xl-inline-block'>Jun</small></span>
                            <label className={`${styles.FullResult}`}><span>{`${now}%`}</span><ProgressBar now={now} className={`${styles.ProgressBar}`} /></label>
                        </div>
                        <div className={`${styles.SurgenSpecial}`}>
                            <ul>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/surgeon.svg" width={20} height={20} alt="Surgeons Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.FullResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now}%`}</span></label>
                                </li>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/anaesthetics.svg" width={20} height={20} alt="Anaesthetics Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.FullResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now}%`}</span></label>
                                </li>
                                <li className='d-flex align-items-center gap-1'>
                                    <span><Image src="/images/staff.svg" width={20} height={20} alt="Staff Icon" quality={100} /></span>
                                    <label className={`${styles.ProgressBarArea} ${styles.FullResult} mt-0 w-100`}><ProgressBar now={now} className={`${styles.ProgressBar}`} /><span>{`${now}%`}</span></label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={`${styles.TheatreRowField} d-flex`}>
                    <div className={`${styles.TheatreLeft}`}>
                        <h6>Theatre 1</h6>
                    </div>
                    <div className={`${styles.TheatreRight}`}>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                AM
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Ophthalmology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
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
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="gynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Gynaecologycheck-1") ? checkedItems['inline-Gynaecologycheck-1'] :true}
                                                onChange={() => handleChange('inline-Gynaecologycheck-1', true)}
                                                id="inline-Gynaecologycheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="gynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Gynaecologycheck-2") ? checkedItems['inline-Gynaecologycheck-2'] :false}
                                                onChange={() => handleChange('inline-Gynaecologycheck-2', false)}
                                                id="inline-Gynaecologycheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="gynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Gynaecologycheck-3") ? checkedItems['inline-Gynaecologycheck-3'] :false}
                                                onChange={() => handleChange('inline-Gynaecologycheck-3', false)}
                                                id="inline-Gynaecologycheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Breast</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="breast"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Breastcheck-1") ? checkedItems['inline-Breastcheck-1'] :true}
                                                onChange={() => handleChange('inline-Breastcheck-1', true)}
                                                id="inline-Breastcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="breast"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Breastcheck-2") ? checkedItems['inline-Breastcheck-2'] :false}
                                                onChange={() => handleChange('inline-Breastcheck-2', false)}
                                                id="inline-Breastcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="breast"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Breastcheck-3") ? checkedItems['inline-Breastcheck-3'] :false}
                                                onChange={() => handleChange('inline-Breastcheck-3', false)}
                                                id="inline-Breastcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="orthopaedics"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-ophthalmologycheck-1") ? checkedItems['inline-ophthalmologycheck-1'] :true}
                                                onChange={() => handleChange('inline-ophthalmologycheck-1', true)}
                                                id="inline-ophthalmologycheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="orthopaedics"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-ophthalmologycheck-2") ? checkedItems['inline-ophthalmologycheck-2'] :true}
                                                onChange={() => handleChange('inline-ophthalmologycheck-2', true)}
                                                id="inline-ophthalmologycheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="orthopaedics"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-ophthalmologycheck-3") ? checkedItems['inline-ophthalmologycheck-3'] :true}
                                                onChange={() => handleChange('inline-ophthalmologycheck-3', true)}
                                                id="inline-ophthalmologycheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="ent"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-ENTcheck-1") ? checkedItems['inline-ENTcheck-1'] :false}
                                                onChange={() => handleChange('inline-ENTcheck-1', false)}
                                                id="inline-ENTcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="ent"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-ENTcheck-2") ? checkedItems['inline-ENTcheck-2'] :false}
                                                onChange={() => handleChange('inline-ENTcheck-2', false)}
                                                id="inline-ENTcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="ent"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-ENTcheck-3") ? checkedItems['inline-ENTcheck-3'] :false}
                                                onChange={() => handleChange('inline-ENTcheck-3', false)}
                                                id="inline-ENTcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="ent2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-ENT2check-1") ? checkedItems['inline-ENT2check-1'] :true}
                                                onChange={() => handleChange('inline-ENT2check-1', true)}
                                                id="inline-ENT2check-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="ent2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-ENT2check-2") ? checkedItems['inline-ENT2check-2'] :true}
                                                onChange={() => handleChange('inline-ENT2check-2', true)}
                                                id="inline-ENT2check-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="ent2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-ENT2check-3") ? checkedItems['inline-ENT2check-3'] :true}
                                                onChange={() => handleChange('inline-ENT2check-3', true)}
                                                id="inline-ENT2check-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="orthopaedics2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-orthopaedics2check-1") ? checkedItems['inline-orthopaedics2check-1'] :true}
                                                onChange={() => handleChange('inline-orthopaedics2check-1', true)}
                                                id="inline-orthopaedics2check-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="orthopaedics2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-orthopaedics2check-2") ? checkedItems['inline-orthopaedics2check-2'] :false}
                                                onChange={() => handleChange('inline-orthopaedics2check-2', false)}
                                                id="inline-orthopaedics2check-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="orthopaedics2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-orthopaedics2check-3") ? checkedItems['inline-orthopaedics2check-3'] :false}
                                                onChange={() => handleChange('inline-orthopaedics2check-3', false)}
                                                id="inline-orthopaedics2check-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                PM
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
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
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>General</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMGeneral"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMGeneralcheck-1") ? checkedItems['inline-PMGeneralcheck-1'] :true}
                                                onChange={() => handleChange('inline-PMGeneralcheck-1', true)}
                                                id="inline-PMGeneralcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMGeneral"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMGeneralcheck-2") ? checkedItems['inline-PMGeneralcheck-2'] :false}
                                                onChange={() => handleChange('inline-PMGeneralcheck-2', false)}
                                                id="inline-PMGeneralcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMGeneral"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMGeneralcheck-3") ? checkedItems['inline-PMGeneralcheck-3'] :false}
                                                onChange={() => handleChange('inline-PMGeneralcheck-3', false)}
                                                id="inline-PMGeneralcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Vascular</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMVascular"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMVascularcheck-1") ? checkedItems['inline-PMVascularcheck-1'] :true}
                                                onChange={() => handleChange('inline-PMVascularcheck-1', true)}
                                                id="inline-PMVascularcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMVascular"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMVascularcheck-2") ? checkedItems['inline-PMVascularcheck-2'] :false}
                                                onChange={() => handleChange('inline-PMVascularcheck-2', false)}
                                                id="inline-PMVascularcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMVascular"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMVascularcheck-3") ? checkedItems['inline-PMVascularcheck-3'] :false}
                                                onChange={() => handleChange('inline-PMVascularcheck-3', false)}
                                                id="inline-PMVascularcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMMFU"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMMFUcheck-1") ? checkedItems['inline-PMMFUcheck-1'] :true}
                                                onChange={() => handleChange('inline-PMMFUcheck-1', true)}
                                                id="inline-PMMFUcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMMFU"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMMFUcheck-2") ? checkedItems['inline-PMMFUcheck-2'] :true}
                                                onChange={() => handleChange('inline-PMMFUcheck-2', true)}
                                                id="inline-PMMFUcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMMFU"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMMFUcheck-3") ? checkedItems['inline-PMMFUcheck-3'] :true}
                                                onChange={() => handleChange('inline-PMMFUcheck-3', true)}
                                                id="inline-PMMFUcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Urology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMUrology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMUrologycheck-1") ? checkedItems['inline-PMUrologycheck-1'] :false}
                                                onChange={() => handleChange('inline-PMUrologycheck-1', false)}
                                                id="inline-PMUrologycheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMUrology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMUrologycheck-2") ? checkedItems['inline-PMUrologycheck-2'] :false}
                                                onChange={() => handleChange('inline-PMUrologycheck-2', false)}
                                                id="inline-PMUrologycheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMUrology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMUrologycheck-3") ? checkedItems['inline-PMUrologycheck-3'] :false}
                                                onChange={() => handleChange('inline-PMUrologycheck-3', false)}
                                                id="inline-PMUrologycheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Urology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMUrology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMUrology2check-1") ? checkedItems['inline-PMUrology2check-1'] :true}
                                                onChange={() => handleChange('inline-PMUrology2check-1', true)}
                                                id="inline-PMUrology2check-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMUrology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMUrology2check-2") ? checkedItems['inline-PMUrology2check-2'] :true}
                                                onChange={() => handleChange('inline-PMUrology2check-2', true)}
                                                id="inline-PMUrology2check-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMUrology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMUrology2check-3") ? checkedItems['inline-PMUrology2check-3'] :true}
                                                onChange={() => handleChange('inline-PMUrology2check-3', true)}
                                                id="inline-PMUrology2check-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Ophthalmology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMOphthalmology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMOphthalmologycheck-1") ? checkedItems['inline-PMOphthalmologycheck-1'] :true}
                                                onChange={() => handleChange('inline-PMOphthalmologycheck-1', true)}
                                                id="inline-PMOphthalmologycheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMOphthalmology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMOphthalmologycheck-2") ? checkedItems['inline-PMOphthalmologycheck-2'] :false}
                                                onChange={() => handleChange('inline-PMOphthalmologycheck-2', false)}
                                                id="inline-PMOphthalmologycheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMOphthalmology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMOphthalmologycheck-3") ? checkedItems['inline-PMOphthalmologycheck-3'] :false}
                                                onChange={() => handleChange('inline-PMOphthalmologycheck-3', false)}
                                                id="inline-PMOphthalmologycheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                EVE
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.TheatreRowField} d-flex`}>
                    <div className={`${styles.TheatreLeft}`}>
                        <h6>Theatre I.R Suite</h6>
                    </div>
                    <div className={`${styles.TheatreRight}`}>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                AM
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
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
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Urology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="TheatreUrology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreUrologycheck-1") ? checkedItems['inline-TheatreUrologycheck-1'] :true}
                                                onChange={() => handleChange('inline-TheatreUrologycheck-1', true)}
                                                id="inline-TheatreUrologycheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="TheatreUrology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreUrologycheck-2") ? checkedItems['inline-TheatreUrologycheck-2'] :false}
                                                onChange={() => handleChange('inline-TheatreUrologycheck-2', false)}
                                                id="inline-TheatreUrologycheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="TheatreUrology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreUrologycheck-3") ? checkedItems['inline-TheatreUrologycheck-3'] :false}
                                                onChange={() => handleChange('inline-TheatreUrologycheck-3', false)}
                                                id="inline-TheatreUrologycheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="TheatreMFU2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreMFU2check-1") ? checkedItems['inline-TheatreMFU2check-1'] :true}
                                                onChange={() => handleChange('inline-TheatreMFU2check-1', true)}
                                                id="inline-TheatreMFU2check-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="TheatreMFU2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreMFU2check-2") ? checkedItems['inline-TheatreMFU2check-2'] :false}
                                                onChange={() => handleChange('inline-TheatreMFU2check-2', false)}
                                                id="inline-TheatreMFU2check-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="TheatreMFU2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreMFU2check-3") ? checkedItems['inline-TheatreMFU2check-3'] :false}
                                                onChange={() => handleChange('inline-TheatreMFU2check-3', false)}
                                                id="inline-TheatreMFU2check-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Ophthalmology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
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
                                                name="TheatreTheatreOphthalmology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreOphthalmologycheck-2") ? checkedItems['inline-TheatreOphthalmologycheck-2'] :true}
                                                onChange={() => handleChange('inline-TheatreOphthalmologycheck-2', true)}
                                                id="inline-TheatreOphthalmologycheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="TheatreTheatreOphthalmology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreOphthalmologycheck-3") ? checkedItems['inline-TheatreOphthalmologycheck-3'] :true}
                                                onChange={() => handleChange('inline-TheatreOphthalmologycheck-3', true)}
                                                id="inline-TheatreOphthalmologycheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="TheatreGynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreGynaecologycheck-1") ? checkedItems['inline-TheatreGynaecologycheck-1'] :false}
                                                onChange={() => handleChange('inline-TheatreGynaecologycheck-1', false)}
                                                id="inline-TheatreGynaecologycheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="TheatreGynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreGynaecologycheck-2") ? checkedItems['inline-TheatreGynaecologycheck-2'] :false}
                                                onChange={() => handleChange('inline-TheatreGynaecologycheck-2', false)}
                                                id="inline-TheatreGynaecologycheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="TheatreGynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreGynaecologycheck-3") ? checkedItems['inline-TheatreGynaecologycheck-3'] :false}
                                                onChange={() => handleChange('inline-TheatreGynaecologycheck-3', false)}
                                                id="inline-TheatreGynaecologycheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="TheatreGynaecology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreGynaecology2check-1") ? checkedItems['inline-TheatreGynaecology2check-1'] :true}
                                                onChange={() => handleChange('inline-TheatreGynaecology2check-1', true)}
                                                id="inline-TheatreGynaecology2check-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="TheatreGynaecology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreGynaecology2check-2") ? checkedItems['inline-TheatreGynaecology2check-2'] :true}
                                                onChange={() => handleChange('inline-TheatreGynaecology2check-2', true)}
                                                id="inline-TheatreGynaecology2check-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="TheatreGynaecology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreGynaecology2check-3") ? checkedItems['inline-TheatreGynaecology2check-3'] :true}
                                                onChange={() => handleChange('inline-TheatreGynaecology2check-3', true)}
                                                id="inline-TheatreGynaecology2check-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="TheatreMFU3"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreMFU3check-1") ? checkedItems['inline-TheatreMFU3check-1'] :true}
                                                onChange={() => handleChange('inline-TheatreMFU3check-1', true)}
                                                id="inline-TheatreMFU3check-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="TheatreMFU3"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreMFU3check-2") ? checkedItems['inline-TheatreMFU3check-2'] :false}
                                                onChange={() => handleChange('inline-TheatreMFU3check-2', false)}
                                                id="inline-TheatreMFU3check-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="TheatreMFU3"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-TheatreMFU3check-3") ? checkedItems['inline-TheatreMFU3check-3'] :false}
                                                onChange={() => handleChange('inline-TheatreMFU3check-3', false)}
                                                id="inline-TheatreMFU3check-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                PM
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMTheatreGynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreGynaecologycheck-1") ? checkedItems['inline-PMTheatreGynaecologycheck-1'] :true}
                                                onChange={() => handleChange('inline-PMTheatreGynaecologycheck-1', true)}
                                                id="inline-PMTheatreGynaecologycheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMTheatreGynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreGynaecologycheck-2") ? checkedItems['inline-PMTheatreGynaecologycheck-2'] :true}
                                                onChange={() => handleChange('inline-PMTheatreGynaecologycheck-2', true)}
                                                id="inline-PMTheatreGynaecologycheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMTheatreGynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreGynaecologycheck-3") ? checkedItems['inline-PMTheatreGynaecologycheck-3'] :true}
                                                onChange={() => handleChange('inline-PMTheatreGynaecologycheck-3', true)}
                                                id="inline-PMTheatreGynaecologycheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMTheatreMFU"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreMFUcheck-1") ? checkedItems['inline-PMTheatreMFUcheck-1'] :true}
                                                onChange={() => handleChange('inline-PMTheatreMFUcheck-1', true)}
                                                id="inline-PMTheatreMFUcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMTheatreMFU"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreMFUcheck-2") ? checkedItems['inline-PMTheatreMFUcheck-2'] :false}
                                                onChange={() => handleChange('inline-PMTheatreMFUcheck-2', false)}
                                                id="inline-PMTheatreMFUcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMTheatreMFU"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreMFUcheck-3") ? checkedItems['inline-PMTheatreMFUcheck-3'] :false}
                                                onChange={() => handleChange('inline-PMTheatreMFUcheck-3', false)}
                                                id="inline-PMTheatreMFUcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Breast</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMTheatreBreast"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreBreastcheck-1") ? checkedItems['inline-PMTheatreBreastcheck-1'] :true}
                                                onChange={() => handleChange('inline-PMTheatreBreastcheck-1', true)}
                                                id="inline-PMTheatreBreastcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMTheatreBreast"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreBreastcheck-2") ? checkedItems['inline-PMTheatreBreastcheck-2'] :false}
                                                onChange={() => handleChange('inline-PMTheatreBreastcheck-2', false)}
                                                id="inline-PMTheatreBreastcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMTheatreBreast"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreBreastcheck-3") ? checkedItems['inline-PMTheatreBreastcheck-3'] :false}
                                                onChange={() => handleChange('inline-PMTheatreBreastcheck-3', false)}
                                                id="inline-PMTheatreBreastcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMTheatreOrthopaedics"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreOrthopaedicscheck-1") ? checkedItems['inline-PMTheatreOrthopaedicscheck-1'] :true}
                                                onChange={() => handleChange('inline-PMTheatreOrthopaedicscheck-1', true)}
                                                id="inline-PMTheatreOrthopaedicscheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMTheatreOrthopaedics"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreOrthopaedicscheck-2") ? checkedItems['inline-PMTheatreOrthopaedicscheck-2'] :true}
                                                onChange={() => handleChange('inline-PMTheatreOrthopaedicscheck-2', true)}
                                                id="inline-PMTheatreOrthopaedicscheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMTheatreOrthopaedics"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreOrthopaedicscheck-3") ? checkedItems['inline-PMTheatreOrthopaedicscheck-3'] :true}
                                                onChange={() => handleChange('inline-PMTheatreOrthopaedicscheck-3', true)}
                                                id="inline-PMTheatreOrthopaedicscheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMTheatreGynaecology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreGynaecology2check-1") ? checkedItems['inline-PMTheatreGynaecology2check-1'] :false}
                                                onChange={() => handleChange('inline-PMTheatreGynaecology2check-1', false)}
                                                id="inline-PMTheatreGynaecology2check-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMTheatreGynaecology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreGynaecology2check-2") ? checkedItems['inline-PMTheatreGynaecology2check-2'] :false}
                                                onChange={() => handleChange('inline-PMTheatreGynaecology2check-2', false)}
                                                id="inline-PMTheatreGynaecology2check-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMTheatreGynaecology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreGynaecology2check-3") ? checkedItems['inline-PMTheatreGynaecology2check-3'] :false}
                                                onChange={() => handleChange('inline-PMTheatreGynaecology2check-3', false)}
                                                id="inline-PMTheatreGynaecology2check-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMTheatreENT"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreENTcheck-1") ? checkedItems['inline-PMTheatreENTcheck-1'] :true}
                                                onChange={() => handleChange('inline-PMTheatreENTcheck-1', true)}
                                                id="inline-PMTheatreENTcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMTheatreENT"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreENTcheck-2") ? checkedItems['inline-PMTheatreENTcheck-2'] :true}
                                                onChange={() => handleChange('inline-PMTheatreENTcheck-2', true)}
                                                id="inline-PMTheatreENTcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMTheatreENT"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreENTcheck-3") ? checkedItems['inline-PMTheatreENTcheck-3'] :true}
                                                onChange={() => handleChange('inline-PMTheatreENTcheck-3', true)}
                                                id="inline-PMTheatreENTcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Vascular</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMTheatreVascular"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreVascularcheck-1") ? checkedItems['inline-PMTheatreVascularcheck-1'] :true}
                                                onChange={() => handleChange('inline-PMTheatreVascularcheck-1', true)}
                                                id="inline-PMTheatreVascularcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMTheatreVascular"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreVascularcheck-2") ? checkedItems['inline-PMTheatreVascularcheck-2'] :false}
                                                onChange={() => handleChange('inline-PMTheatreVascularcheck-2', false)}
                                                id="inline-PMTheatreVascularcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMTheatreVascular"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMTheatreVascularcheck-3") ? checkedItems['inline-PMTheatreVascularcheck-3'] :false}
                                                onChange={() => handleChange('inline-PMTheatreVascularcheck-3', false)}
                                                id="inline-PMTheatreVascularcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                EVE
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.TheatreRowField} d-flex`}>
                    <div className={`${styles.TheatreLeft}`}>
                        <h6>Main Theatre 7</h6>
                    </div>
                    <div className={`${styles.TheatreRight}`}>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                AM
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="Theatre7MFU"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7MFUcheck-1") ? checkedItems['inline-Theatre7MFUcheck-1'] :true}
                                                onChange={() => handleChange('inline-Theatre7MFUcheck-1', true)}
                                                id="inline-Theatre7MFUcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="Theatre7MFU"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7MFUcheck-2") ? checkedItems['inline-Theatre7MFUcheck-2'] :true}
                                                onChange={() => handleChange('inline-Theatre7MFUcheck-2', true)}
                                                id="inline-Theatre7MFUcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="Theatre7MFU"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7MFUcheck-3") ? checkedItems['inline-Theatre7MFUcheck-3'] :true}
                                                onChange={() => handleChange('inline-Theatre7MFUcheck-3', true)}
                                                id="inline-Theatre7MFUcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="Theatre7Gynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7Gynaecologycheck-1") ? checkedItems['inline-Theatre7Gynaecologycheck-1'] :true}
                                                onChange={() => handleChange('inline-Theatre7Gynaecologycheck-1', true)}
                                                id="inline-Theatre7Gynaecologycheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="Theatre7Gynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7Gynaecologycheck-2") ? checkedItems['inline-Theatre7Gynaecologycheck-2'] :false}
                                                onChange={() => handleChange('inline-Theatre7Gynaecologycheck-2', false)}
                                                id="inline-Theatre7Gynaecologycheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="Theatre7Gynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7Gynaecologycheck-3") ? checkedItems['inline-Theatre7Gynaecologycheck-3'] :false}
                                                onChange={() => handleChange('inline-Theatre7Gynaecologycheck-3', false)}
                                                id="inline-Theatre7Gynaecologycheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Breast</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="Theatre7Breast"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7Breastcheck-1") ? checkedItems['inline-Theatre7Breastcheck-1'] :true}
                                                onChange={() => handleChange('inline-Theatre7Breastcheck-1', true)}
                                                id="inline-Theatre7Breastcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="Theatre7Breast"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7Breastcheck-2") ? checkedItems['inline-Theatre7Breastcheck-2'] :false}
                                                onChange={() => handleChange('inline-Theatre7Breastcheck-2', false)}
                                                id="inline-Theatre7Breastcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="Theatre7Breast"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7Breastcheck-3") ? checkedItems['inline-Theatre7Breastcheck-3'] :false}
                                                onChange={() => handleChange('inline-Theatre7Breastcheck-3', false)}
                                                id="inline-Theatre7Breastcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="Theatre7Orthopaedics"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7Orthopaedicscheck-1") ? checkedItems['inline-Theatre7Orthopaedicscheck-1'] :true}
                                                onChange={() => handleChange('inline-Theatre7Orthopaedicscheck-1', true)}
                                                id="inline-Theatre7Orthopaedicscheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="TheatreTheatre7Orthopaedics"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7Orthopaedicscheck-2") ? checkedItems['inline-Theatre7Orthopaedicscheck-2'] :true}
                                                onChange={() => handleChange('inline-Theatre7Orthopaedicscheck-2', true)}
                                                id="inline-Theatre7Orthopaedicscheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="TheatreTheatre7Orthopaedics"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7Orthopaedicscheck-3") ? checkedItems['inline-Theatre7Orthopaedicscheck-3'] :true}
                                                onChange={() => handleChange('inline-Theatre7Orthopaedicscheck-3', true)}
                                                id="inline-Theatre7Orthopaedicscheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="Theatre7OENT"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OENTcheck-1") ? checkedItems['inline-Theatre7OENTcheck-1'] :false}
                                                onChange={() => handleChange('inline-Theatre7OENTcheck-1', false)}
                                                id="inline-Theatre7OENTcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="Theatre7OENT"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OENTcheck-2") ? checkedItems['inline-Theatre7OENTcheck-2'] :false}
                                                onChange={() => handleChange('inline-Theatre7OENTcheck-2', false)}
                                                id="inline-Theatre7OENTcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="Theatre7OENT"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OENTcheck-3") ? checkedItems['inline-Theatre7OENTcheck-3'] :false}
                                                onChange={() => handleChange('inline-Theatre7OENTcheck-3', false)}
                                                id="inline-Theatre7OENTcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="Theatre7OENT2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OENT2check-1") ? checkedItems['inline-Theatre7OENT2check-1'] :true}
                                                onChange={() => handleChange('inline-Theatre7OENT2check-1', true)}
                                                id="inline-Theatre7OENT2check-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="Theatre7OENT2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OENT2check-2") ? checkedItems['inline-Theatre7OENT2check-2'] :true}
                                                onChange={() => handleChange('inline-Theatre7OENT2check-2', true)}
                                                id="inline-Theatre7OENT2check-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="Theatre7OENT2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OENT2check-3") ? checkedItems['inline-Theatre7OENT2check-3'] :true}
                                                onChange={() => handleChange('inline-Theatre7OENT2check-3', true)}
                                                id="inline-Theatre7OENT2check-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="Theatre7OOrthopaedics2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OOrthopaedics2check-1") ? checkedItems['inline-Theatre7OOrthopaedics2check-1'] :true}
                                                onChange={() => handleChange('inline-Theatre7OOrthopaedics2check-1', true)}
                                                id="inline-Theatre7OOrthopaedics2check-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="Theatre7OOrthopaedics2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OOrthopaedics2check-2") ? checkedItems['inline-Theatre7OOrthopaedics2check-2'] :false}
                                                onChange={() => handleChange('inline-Theatre7OOrthopaedics2check-2', false)}
                                                id="inline-Theatre7OOrthopaedics2check-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="Theatre7OOrthopaedics2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OOrthopaedics2check-3") ? checkedItems['inline-Theatre7OOrthopaedics2check-3'] :false}
                                                onChange={() => handleChange('inline-Theatre7OOrthopaedics2check-3', false)}
                                                id="inline-Theatre7OOrthopaedics2check-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                PM
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="Theatre7OPMGynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMGynaecologycheck-1") ? checkedItems['inline-Theatre7OPMGynaecologycheck-1'] :true}
                                                onChange={() => handleChange('inline-Theatre7OPMGynaecologycheck-1', true)}
                                                id="inline-Theatre7OPMGynaecologycheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="Theatre7OPMGynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMGynaecologycheck-2") ? checkedItems['inline-Theatre7OPMGynaecologycheck-2'] :true}
                                                onChange={() => handleChange('inline-Theatre7OPMGynaecologycheck-2', true)}
                                                id="inline-Theatre7OPMGynaecologycheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="Theatre7OPMGynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMGynaecologycheck-3") ? checkedItems['inline-Theatre7OPMGynaecologycheck-3'] :true}
                                                onChange={() => handleChange('inline-Theatre7OPMGynaecologycheck-3', true)}
                                                id="inline-Theatre7OPMGynaecologycheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>General</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="Theatre7OPMGeneral"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMGeneralcheck-1") ? checkedItems['inline-Theatre7OPMGeneralcheck-1'] :true}
                                                onChange={() => handleChange('inline-Theatre7OPMGeneralcheck-1', true)}
                                                id="inline-Theatre7OPMGeneralcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="Theatre7OPMGeneral"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMGeneralcheck-2") ? checkedItems['inline-Theatre7OPMGeneralcheck-2'] :false}
                                                onChange={() => handleChange('inline-Theatre7OPMGeneralcheck-2', false)}
                                                id="inline-Theatre7OPMGeneralcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="Theatre7OPMGeneral"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMGeneralcheck-3") ? checkedItems['inline-Theatre7OPMGeneralcheck-3'] :false}
                                                onChange={() => handleChange('inline-Theatre7OPMGeneralcheck-3', false)}
                                                id="inline-Theatre7OPMGeneralcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Vascular</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="Theatre7OPMVascular"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMVascularcheck-1") ? checkedItems['inline-Theatre7OPMVascularcheck-1'] :true}
                                                onChange={() => handleChange('inline-Theatre7OPMVascularcheck-1', true)}
                                                id="inline-Theatre7OPMVascularcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="Theatre7OPMVascular"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMVascularcheck-2") ? checkedItems['inline-Theatre7OPMVascularcheck-2'] :false}
                                                onChange={() => handleChange('inline-Theatre7OPMVascularcheck-2', false)}
                                                id="inline-Theatre7OPMVascularcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="Theatre7OPMVascular"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMVascularcheck-3") ? checkedItems['inline-Theatre7OPMVascularcheck-3'] :false}
                                                onChange={() => handleChange('inline-Theatre7OPMVascularcheck-3', false)}
                                                id="inline-Theatre7OPMVascularcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="Theatre7OPMMFU"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMMFUcheck-1") ? checkedItems['inline-Theatre7OPMMFUcheck-1'] :true}
                                                onChange={() => handleChange('inline-Theatre7OPMMFUcheck-1', true)}
                                                id="inline-Theatre7OPMMFUcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="Theatre7OPMMFU"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMMFUcheck-2") ? checkedItems['inline-Theatre7OPMMFUcheck-2'] :true}
                                                onChange={() => handleChange('inline-Theatre7OPMMFUcheck-2', true)}
                                                id="inline-Theatre7OPMMFUcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="Theatre7OPMMFU"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMMFUcheck-3") ? checkedItems['inline-Theatre7OPMMFUcheck-3'] :true}
                                                onChange={() => handleChange('inline-Theatre7OPMMFUcheck-3', true)}
                                                id="inline-Theatre7OPMMFUcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Urology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="Theatre7OPMUrology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMUrologycheck-1") ? checkedItems['inline-Theatre7OPMUrologycheck-1'] :false}
                                                onChange={() => handleChange('inline-Theatre7OPMUrologycheck-1', false)}
                                                id="inline-Theatre7OPMUrologycheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="Theatre7OPMUrology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMUrologycheck-2") ? checkedItems['inline-Theatre7OPMUrologycheck-2'] :false}
                                                onChange={() => handleChange('inline-Theatre7OPMUrologycheck-2', false)}
                                                id="inline-Theatre7OPMUrologycheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="Theatre7OPMUrology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMUrologycheck-3") ? checkedItems['inline-Theatre7OPMUrologycheck-3'] :false}
                                                onChange={() => handleChange('inline-Theatre7OPMUrologycheck-3', false)}
                                                id="inline-Theatre7OPMUrologycheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Urology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="Theatre7OPMUrology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMUrology2check-1") ? checkedItems['inline-Theatre7OPMUrology2check-1'] :true}
                                                onChange={() => handleChange('inline-Theatre7OPMUrology2check-1', true)}
                                                id="inline-Theatre7OPMUrology2check-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="Theatre7OPMUrology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMUrology2check-2") ? checkedItems['inline-Theatre7OPMUrology2check-2'] :true}
                                                onChange={() => handleChange('inline-Theatre7OPMUrology2check-2', true)}
                                                id="inline-Theatre7OPMUrology2check-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="Theatre7OPMUrology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMUrology2check-3") ? checkedItems['inline-Theatre7OPMUrology2check-3'] :true}
                                                onChange={() => handleChange('inline-Theatre7OPMUrology2check-3', true)}
                                                id="inline-Theatre7OPMUrology2check-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Ophthalmology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="Theatre7OPMOphthalmology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMOphthalmologycheck-1") ? checkedItems['inline-Theatre7OPMOphthalmologycheck-1'] :true}
                                                onChange={() => handleChange('inline-Theatre7OPMOphthalmologycheck-1', true)}
                                                id="inline-Theatre7OPMOphthalmologycheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="Theatre7OPMOphthalmology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMOphthalmologycheck-2") ? checkedItems['inline-Theatre7OPMOphthalmologycheck-2'] :false}
                                                onChange={() => handleChange('inline-Theatre7OPMOphthalmologycheck-2', false)}
                                                id="inline-Theatre7OPMOphthalmologycheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="Theatre7OPMOphthalmology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-Theatre7OPMOphthalmologycheck-3") ? checkedItems['inline-Theatre7OPMOphthalmologycheck-3'] :false}
                                                onChange={() => handleChange('inline-Theatre7OPMOphthalmologycheck-3', false)}
                                                id="inline-Theatre7OPMOphthalmologycheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                EVE
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${styles.TheatreRowField} d-flex`}>
                    <div className={`${styles.TheatreLeft}`}>
                        <h6>EOC 1</h6>
                    </div>
                    <div className={`${styles.TheatreRight}`}>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                AM
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
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
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Urology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="EOCUrology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-EOCUrologycheck-1") ? checkedItems['inline-EOCUrologycheck-1'] :true}
                                                onChange={() => handleChange('inline-EOCUrologycheck-1', true)}
                                                id="inline-EOCUrologycheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="EOCUrology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-EOCUrologycheck-2") ? checkedItems['inline-EOCUrologycheck-2'] :false}
                                                onChange={() => handleChange('inline-EOCUrologycheck-2', false)}
                                                id="inline-EOCUrologycheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="EOCUrology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-EOCUrologycheck-3") ? checkedItems['inline-EOCUrologycheck-3'] :false}
                                                onChange={() => handleChange('inline-EOCUrologycheck-3', false)}
                                                id="inline-EOCUrologycheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
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
                                                checked={ checkedItems.hasOwnProperty("inline-EOCMFU2check-2") ? checkedItems['inline-EOCMFU2check-2'] :false}
                                                onChange={() => handleChange('inline-EOCMFU2check-2', false)}
                                                id="inline-EOCMFU2check-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="EOCMFU2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-EOCMFU2check-3") ? checkedItems['inline-EOCMFU2check-3'] :false}
                                                onChange={() => handleChange('inline-EOCMFU2check-3', false)}
                                                id="inline-EOCMFU2check-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Ophthalmology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="EOCOphthalmology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-EOCOphthalmologycheck-1") ? checkedItems['inline-EOCOphthalmologycheck-1'] :true}
                                                onChange={() => handleChange('inline-EOCOphthalmologycheck-1', true)}
                                                id="inline-EOCOphthalmologycheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="TheatreEOCOphthalmology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-EOCOphthalmologycheck-2") ? checkedItems['inline-EOCOphthalmologycheck-2'] :true}
                                                onChange={() => handleChange('inline-EOCOphthalmologycheck-2', true)}
                                                id="inline-EOCOphthalmologycheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="TheatreEOCOphthalmology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-EOCOphthalmologycheck-3") ? checkedItems['inline-EOCOphthalmologycheck-3'] :true}
                                                onChange={() => handleChange('inline-EOCOphthalmologycheck-3', true)}
                                                id="inline-EOCOphthalmologycheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="EOCGynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-EOCGynaecologycheck-1") ? checkedItems['inline-EOCGynaecologycheck-1'] :false}
                                                onChange={() => handleChange('inline-EOCGynaecologycheck-1', false)}
                                                id="inline-EOCGynaecologycheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="EOCGynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-EOCGynaecologycheck-2") ? checkedItems['inline-EOCGynaecologycheck-2'] :false}
                                                onChange={() => handleChange('inline-EOCGynaecologycheck-2', false)}
                                                id="inline-EOCGynaecologycheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="EOCGynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-EOCGynaecologycheck-3") ? checkedItems['inline-EOCGynaecologycheck-3'] :false}
                                                onChange={() => handleChange('inline-EOCGynaecologycheck-3', false)}
                                                id="inline-EOCGynaecologycheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="EOCGynaecology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-EOCGynaecology2check-1") ? checkedItems['inline-EOCGynaecology2check-1'] :true}
                                                onChange={() => handleChange('inline-EOCGynaecology2check-1', true)}
                                                id="inline-EOCGynaecology2check-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="EOCGynaecology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-EOCGynaecology2check-2") ? checkedItems['inline-EOCGynaecology2check-2'] :true}
                                                onChange={() => handleChange('inline-EOCGynaecology2check-2', true)}
                                                id="inline-EOCGynaecology2check-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="EOCGynaecology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-EOCGynaecology2check-3") ? checkedItems['inline-EOCGynaecology2check-3'] :true}
                                                onChange={() => handleChange('inline-EOCGynaecology2check-3', true)}
                                                id="inline-EOCGynaecology2check-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="EOCMFU3"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-EOCMFU3check-1") ? checkedItems['inline-EOCMFU3check-1'] :true}
                                                onChange={() => handleChange('inline-EOCMFU3check-1', true)}
                                                id="inline-EOCMFU3check-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="EOCMFU3"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-EOCMFU3check-2") ? checkedItems['inline-EOCMFU3check-2'] :false}
                                                onChange={() => handleChange('inline-EOCMFU3check-2', false)}
                                                id="inline-EOCMFU3check-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="EOCMFU3"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-EOCMFU3check-3") ? checkedItems['inline-EOCMFU3check-3'] :false}
                                                onChange={() => handleChange('inline-EOCMFU3check-3', false)}
                                                id="inline-EOCMFU3check-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                PM
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMEOCGynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCGynaecologycheck-1") ? checkedItems['inline-PMEOCGynaecologycheck-1'] :true}
                                                onChange={() => handleChange('inline-PMEOCGynaecologycheck-1', true)}
                                                id="inline-PMEOCGynaecologycheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMEOCGynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCGynaecologycheck-2") ? checkedItems['inline-PMEOCGynaecologycheck-2'] :true}
                                                onChange={() => handleChange('inline-PMEOCGynaecologycheck-2', true)}
                                                id="inline-PMEOCGynaecologycheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMEOCGynaecology"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCGynaecologycheck-3") ? checkedItems['inline-PMEOCGynaecologycheck-3'] :true}
                                                onChange={() => handleChange('inline-PMEOCGynaecologycheck-3', true)}
                                                id="inline-PMEOCGynaecologycheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>MFU</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMEOCMFU"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCMFUcheck-1") ? checkedItems['inline-PMEOCMFUcheck-1'] :true}
                                                onChange={() => handleChange('inline-PMEOCMFUcheck-1', true)}
                                                id="inline-PMEOCMFUcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMEOCMFU"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCMFUcheck-2") ? checkedItems['inline-PMEOCMFUcheck-2'] :false}
                                                onChange={() => handleChange('inline-PMEOCMFUcheck-2', false)}
                                                id="inline-PMEOCMFUcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMEOCMFU"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCMFUcheck-3") ? checkedItems['inline-PMEOCMFUcheck-3'] :false}
                                                onChange={() => handleChange('inline-PMEOCMFUcheck-3', false)}
                                                id="inline-PMEOCMFUcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Breast</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMEOCBreast"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCBreastcheck-1") ? checkedItems['inline-PMEOCBreastcheck-1'] :true}
                                                onChange={() => handleChange('inline-PMEOCBreastcheck-1', true)}
                                                id="inline-PMEOCBreastcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMEOCBreast"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCBreastcheck-2") ? checkedItems['inline-PMEOCBreastcheck-2'] :false}
                                                onChange={() => handleChange('inline-PMEOCBreastcheck-2', false)}
                                                id="inline-PMEOCBreastcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMEOCBreast"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCBreastcheck-3") ? checkedItems['inline-PMEOCBreastcheck-3'] :false}
                                                onChange={() => handleChange('inline-PMEOCBreastcheck-3', false)}
                                                id="inline-PMEOCBreastcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Orthopaedics</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMEOCOrthopaedics"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCOrthopaedicscheck-1") ? checkedItems['inline-PMEOCOrthopaedicscheck-1'] :true}
                                                onChange={() => handleChange('inline-PMEOCOrthopaedicscheck-1', true)}
                                                id="inline-PMEOCOrthopaedicscheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMEOCOrthopaedics"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCOrthopaedicscheck-2") ? checkedItems['inline-PMEOCOrthopaedicscheck-2'] :true}
                                                onChange={() => handleChange('inline-PMEOCOrthopaedicscheck-2', true)}
                                                id="inline-PMEOCOrthopaedicscheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMEOCOrthopaedics"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCOrthopaedicscheck-3") ? checkedItems['inline-PMEOCOrthopaedicscheck-3'] :true}
                                                onChange={() => handleChange('inline-PMEOCOrthopaedicscheck-3', true)}
                                                id="inline-PMEOCOrthopaedicscheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Gynaecology</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMEOCGynaecology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCGynaecology2check-1") ? checkedItems['inline-PMEOCGynaecology2check-1'] :false}
                                                onChange={() => handleChange('inline-PMEOCGynaecology2check-1', false)}
                                                id="inline-PMEOCGynaecology2check-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMEOCGynaecology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCGynaecology2check-2") ? checkedItems['inline-PMEOCGynaecology2check-2'] :false}
                                                onChange={() => handleChange('inline-PMEOCGynaecology2check-2', false)}
                                                id="inline-PMEOCGynaecology2check-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMEOCGynaecology2"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCGynaecology2check-3") ? checkedItems['inline-PMEOCGynaecology2check-3'] :false}
                                                onChange={() => handleChange('inline-PMEOCGynaecology2check-3', false)}
                                                id="inline-PMEOCGynaecology2check-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>ENT</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} fullFill`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMEOCENT"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCENTcheck-1") ? checkedItems['inline-PMEOCENTcheck-1'] :true}
                                                onChange={() => handleChange('inline-PMEOCENTcheck-1', true)}
                                                id="inline-PMEOCENTcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMEOCENT"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCENTcheck-2") ? checkedItems['inline-PMEOCENTcheck-2'] :true}
                                                onChange={() => handleChange('inline-PMEOCENTcheck-2', true)}
                                                id="inline-PMEOCENTcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMEOCENT"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCENTcheck-3") ? checkedItems['inline-PMEOCENTcheck-3'] :true}
                                                onChange={() => handleChange('inline-PMEOCENTcheck-3', true)}
                                                id="inline-PMEOCENTcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Vascular</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom}`}>
                                        <div className={`${styles.GroupCheckBox}`} onClick={handleCheckboxClick}>
                                            <Form.Check
                                                inline
                                                label="1"
                                                name="PMEOCVascular"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCVascularcheck-1") ? checkedItems['inline-PMEOCVascularcheck-1'] :true}
                                                onChange={() => handleChange('inline-PMEOCVascularcheck-1', true)}
                                                id="inline-PMEOCVascularcheck-1"
                                            />
                                            <Form.Check
                                                inline
                                                label="2"
                                                name="PMEOCVascular"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCVascularcheck-2") ? checkedItems['inline-PMEOCVascularcheck-2'] :false}
                                                onChange={() => handleChange('inline-PMEOCVascularcheck-2', false)}
                                                id="inline-PMEOCVascularcheck-2"
                                            />
                                            <Form.Check
                                                inline
                                                label="3"
                                                name="PMEOCVascular"
                                                type="checkbox"
                                                checked={ checkedItems.hasOwnProperty("inline-PMEOCVascularcheck-3") ? checkedItems['inline-PMEOCVascularcheck-3'] :false}
                                                onChange={() => handleChange('inline-PMEOCVascularcheck-3', false)}
                                                id="inline-PMEOCVascularcheck-3"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.TheatreRow} d-flex`}>
                            <div className={`${styles.TheatreAm} d-flex align-items-center justify-content-center`}>
                                EVE
                            </div>
                            <div className={`${styles.TheatreColumns}`}>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayOne' ? styles.show : ''}`} data-related="DayOne">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayTwo' ? styles.show : ''}`} data-related="DayTwo">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayThree' ? styles.show : ''}`} data-related="DayThree">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFour' ? styles.show : ''}`} data-related="DayFour">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DayFive' ? styles.show : ''}`} data-related="DayFive">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySix' ? styles.show : ''}`} data-related="DaySix">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                                <div onClick={ModalOpenClick} className={`${styles.InColumn} ${activeElement === 'DaySeven' ? styles.show : ''}`} data-related="DaySeven">
                                    <div className={`${styles.InColumnTop}`}>
                                        <h6>Unavailable</h6>
                                    </div>
                                    <div className={`${styles.InColumnBottom} ${styles.UnavailableBox}`}>
                                        <Image src="/images/lock-icon.svg" width={16} height={16} alt="Lock Icon" quality={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Filter Modal */}
        <Modal show={filterShow} onHide={() => setFilterShow(false)} centered className='bottomSlideModalMob'>
            <Modal.Header closeButton className='headerBlankMobile'>
                <Modal.Title>Filter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-20">
                        <Form.Label>Filter By :</Form.Label>
                        <div className='customRadioArea'>
                            <Form.Check
                                inline
                                label="Room"
                                name="filters"
                                type="radio"
                                id="FilterRoom"
                                value="Room"
                                checked={selectedFilter === 'Room'}
                                onChange={handleRadioChange}
                            />
                            <Form.Check
                                inline
                                label="Specialty"
                                name="filters"
                                type="radio"
                                id="FilterSpecialty"
                                value="Specialty"
                                checked={selectedFilter === 'Specialty'}
                                onChange={handleRadioChange}
                            />
                            <Form.Check
                                inline
                                label="Status"
                                name="filters"
                                type="radio"
                                id="FilterStatus"
                                value="Status"
                                checked={selectedFilter === 'Status'}
                                onChange={handleRadioChange}
                            />
                        </div>
                    </Form.Group>
                    {selectedFilter && (
                        <Form.Group>
                            <Form.Label className='fontRegular'>{selectedFilter}</Form.Label>
                            <div
                                onClick={() => setShowOptions(!showOptions)}
                                ref={selectBoxRef}
                                className={`${showOptions ? 'active' : ''} customSelect FilterSelectBox BottomAlignBox`}
                            >
                                <div className="selectedOption">
                                {selectedOptionsFilter.length > 0
                                    ? selectedOptionsFilter.join(', ') || ''
                                    : ` `}
                                </div>
                                <ul className="options">
                                    {renderOptions()}
                                </ul>
                            </div>
                        </Form.Group>
                    )}
                    <Button className="default-btn w-100 mt-48" type="submit">
                        Filter
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

        {/* Doctors Details List Modal */}
        <Modal show={DocDetailsShow} onHide={() => setDocDetailsShow(false)} centered>
            <Modal.Header closeButton  className={`${styles.DocDetailHeader} text-center justify-content-center flex-column`}>
                <Modal.Title>Mon, 3 Jun<br />ENT<br />Theatre 1<br />PM</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="bg-white radius-24 ModalInnerSpace text-center">
                    <ul className={`${styles.DocDetailLists}`}>
                        <li><span>Staff</span>
                            <span className={`${styles.DocDetailCheck}`}>
                                <Image src="/images/check-white.svg" width={16} height={16} alt="Check Icon" quality={100} />
                            </span>
                        </li>
                        <li><span>Specialist lead</span>
                            <span className={`${styles.DocDetailCheck}`}>
                                <Image src="/images/check-white.svg" width={16} height={16} alt="Check Icon" quality={100} />
                            </span>
                        </li>
                        <li><span>Anaesthetics</span><span className={`${styles.DocDetailCheck} ${styles.bgnone}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9993 5.33341C13.1704 5.33341 10.4573 6.45722 8.45688 8.45761C6.45649 10.458 5.33268 13.1711 5.33268 16.0001C5.33268 17.4008 5.60858 18.7879 6.14463 20.082C6.68068 21.3762 7.46638 22.5521 8.45688 23.5426C9.44737 24.533 10.6233 25.3187 11.9174 25.8548C13.2115 26.3908 14.5986 26.6667 15.9993 26.6667C17.4001 26.6667 18.7872 26.3908 20.0813 25.8548C21.3754 25.3187 22.5513 24.533 23.5418 23.5426C24.5323 22.5521 25.318 21.3762 25.8541 20.082C26.3901 18.7879 26.666 17.4008 26.666 16.0001C26.666 13.1711 25.5422 10.458 23.5418 8.45761C21.5414 6.45722 18.8283 5.33341 15.9993 5.33341ZM6.57126 6.57199C9.07174 4.07151 12.4631 2.66675 15.9993 2.66675C19.5356 2.66675 22.927 4.07151 25.4274 6.57199C27.9279 9.07248 29.3327 12.4639 29.3327 16.0001C29.3327 17.751 28.9878 19.4849 28.3177 21.1025C27.6477 22.7202 26.6656 24.1901 25.4274 25.4282C24.1893 26.6663 22.7195 27.6484 21.1018 28.3185C19.4841 28.9885 17.7503 29.3334 15.9993 29.3334C14.2484 29.3334 12.5146 28.9885 10.8969 28.3185C9.27923 27.6484 7.80937 26.6663 6.57126 25.4282C5.33314 24.1901 4.35102 22.7202 3.68096 21.1025C3.01089 19.4849 2.66602 17.751 2.66602 16.0001C2.66602 12.4639 4.07077 9.07248 6.57126 6.57199ZM15.9993 9.33341C16.7357 9.33341 17.3327 9.93037 17.3327 10.6667V16.0001C17.3327 16.7365 16.7357 17.3334 15.9993 17.3334C15.263 17.3334 14.666 16.7365 14.666 16.0001V10.6667C14.666 9.93037 15.263 9.33341 15.9993 9.33341ZM14.666 21.3334C14.666 20.597 15.263 20.0001 15.9993 20.0001H16.0127C16.7491 20.0001 17.346 20.597 17.346 21.3334C17.346 22.0698 16.7491 22.6667 16.0127 22.6667H15.9993C15.263 22.6667 14.666 22.0698 14.666 21.3334Z" fill="#FFA500"/>
                            </svg></span>
                        </li>
                    </ul>
                </div>
            </Modal.Body>
        </Modal>
    </Layout>
  )
}

export default RotaTable
