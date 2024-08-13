import Layout from '@/components/Layout';
import React, { useEffect, useState, useRef } from 'react';
import styles from "./reports.module.css";
import Image from 'next/image';
import DateRangeCalendar from '@/components/DateRangeCalendar';
import { GetStaticProps } from 'next';
import path from 'path';
import fs from 'fs';

interface ReportCategory {
    percentage: number;
    title: string;
    description: string;
    icon: string;
};
interface ReportData {
    [key: string]: ReportCategory;
};
interface ReportsProps {
    reportData: ReportData;
};

const Reports: React.FC<ReportsProps> = ({ reportData }) => {
    const [selectedOption, setSelectedOption] = useState('Kent & Canterbury Hospital');
    const [isOpen, setIsOpen] = useState(false);
    const selectBoxRef = useRef<HTMLDivElement>(null);
    const options = ['Kent & Canterbury Hospital', 'Queen Elizabeth the Queen Mother Hospital', 'William Harvey Hospital'];
    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectBoxRef.current && !selectBoxRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Fetch data from JSON file
    const [percentageOverview, setPercentageOverview] = useState(0);
    useEffect(() => {
        const total = reportData.surgeons.percentage + reportData.anaesthetics.percentage + reportData.staff.percentage;
        const avg = total / 3;
        setPercentageOverview(avg);
    }, [reportData]);
    const strokeDashoffsetOverview = 440 - (440 * percentageOverview) / 100;
    const categories = Object.keys(reportData);

    const getGradientColors = (percentage: number): string[] => {
        if (percentage >= 60) return ['#078C64', '#55B598', '#25A780'];
        if (percentage >= 40) return ['#DDB348', '#F5C859', '#FFC023'];
        if (percentage >= 30) return ['#CC3229', '#E56F68', '#D5433A'];
        return ['#CC3229', '#F8B7B7', '#FFF1F1'];
    };
    const [startColor, midColor, endColor] = getGradientColors(percentageOverview);
    
    const getBackgroundColor = (percentage: number): string => {
        if (percentage >= 60) return '#F1FFF9';
        if (percentage >= 40) return '#FFFDE9';
        if (percentage >= 30) return '#FFF1F1';
        return '#FFF1F1';
    };

    const getBorderColor = (percentage: number): string => {
        if (percentage >= 60) return '#078C64';
        if (percentage >= 40) return '#F6B000';
        if (percentage >= 30) return '#CC3229';
        return '#CC3229';
    };

    const formatPercentage = (value: number): string => {
        return value % 1 === 0 ? `${value}` : `${value.toFixed(2)}`;
    };

  return (
    <Layout>
        <div>
            <h4 className='maintitle'>Reports</h4>
            <div className="topBlock">
                <div className="topBlockInner">
                    <div className='topBlockLeft position-relative'>
                        <DateRangeCalendar />
                    </div>
                    <div className='topBlockRight'>
                        <div className={`${isOpen ? 'active': ''} customSelect`} ref={selectBoxRef}>
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
            <div className={`${styles.ReportData}`}>
                <div className={`${styles.ReportOverview} d-flex flex-wrap align-items-center`} 
                    style={{ 
                        backgroundColor: getBackgroundColor(percentageOverview), 
                        borderColor: getBorderColor(percentageOverview),
                        }}
                    >
                    <div className={`${styles.ReportLeft}`}>
                        <h2>Overview</h2>
                        <h3 className='fontRegular'>The following graphic shows the level of progress in approved surgical procedures throughout the week in the selected hospital.</h3>
                    </div>
                    <div className={`${styles.ReportRight}`}>
                        <svg className={styles.svg} viewBox="0 0 182 182">
                            <defs>
                                <linearGradient id="progress-Overviewgradient" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(45)">
                                    <stop offset="0%" style={{ stopColor: startColor, stopOpacity: 1 }} />
                                    <stop offset="35%" style={{ stopColor: midColor, stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: endColor, stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                            <circle className={styles.StrokeBg} cx="91" cy="91" r="70" />
                            <circle
                                className={styles.Strokeprogress}
                                cx="91"
                                cy="91"
                                r="70"
                                style={{ strokeDashoffset: strokeDashoffsetOverview }}
                                stroke="url(#progress-Overviewgradient)"
                            />
                        </svg>
                        <div className={styles.ReportPercentage}>
                            <span>{formatPercentage(percentageOverview)}%</span>Completed
                        </div>
                    </div>
                </div>
                <div className={`${styles.ReportBelowList}`}>
                    <ul>
                        {categories.map((category) => {
                            const { percentage, title, description, icon } = reportData[category];
                            const strokeDashoffset = 440 - (440 * percentage) / 100;
                            const [startColor, midColor, endColor] = getGradientColors(percentage);
                            return (
                                <li key={category} className='d-flex align-items-center flex-wrap justify-content-center'>
                                    <div className={`${styles.ReportLeft}`}>
                                        <h2 className='mb-md-2 position-relative'>
                                            <div className={`${styles.ReportSpeIcon}`}>
                                                <Image src={icon} width={24} height={24} alt={`${title} Icon`} quality={100} />
                                            </div>{title}
                                        </h2>
                                        <h3 className='fontRegular'>{description}</h3>
                                    </div>
                                    <div className={`${styles.ReportRight}`}>
                                        <svg className={styles.svg} viewBox="0 0 171 171">
                                            <defs>
                                                <linearGradient id={`progress-gradient${title}`} x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(45)">
                                                    <stop offset="0%" style={{ stopColor: startColor, stopOpacity: 1 }} />
                                                    <stop offset="35%" style={{ stopColor: midColor, stopOpacity: 1 }} />
                                                    <stop offset="100%" style={{ stopColor: endColor, stopOpacity: 1 }} />
                                                </linearGradient>
                                            </defs>
                                            <circle className={styles.StrokeBg} cx="85.5" cy="85.5" r="70" />
                                            <circle
                                                className={styles.StrokeprogressSmall}
                                                cx="85.5"
                                                cy="85.5"
                                                r="70"
                                                style={{ strokeDashoffset: strokeDashoffset }}
                                                stroke={`url(#progress-gradient${title})`}
                                            />
                                        </svg>
                                        <div className={styles.ReportPercentage}>
                                            <span>{percentage}%</span>Completed
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
    const filePath = path.join(process.cwd(), 'reportData.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const reportData: ReportData = JSON.parse(jsonData);
  
    return {
      props: {
        reportData
      }
    };
};

export default Reports
