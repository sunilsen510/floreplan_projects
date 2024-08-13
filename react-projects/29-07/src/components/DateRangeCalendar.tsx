import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { getYear, getMonth, addDays, format } from 'date-fns';
import { nullable } from 'zod';

// Date Range Picker
interface CustomDropdownProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    isOpen: boolean;
    toggleDropdown: () => void;
}
const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange, placeholder, isOpen, toggleDropdown }) => {
    //const [isOpen, setIsOpen] = useState(false);
    return (
      <div className={`dropdown-container ${isOpen ? 'active' : ''}`}>
        <button onClick={toggleDropdown}>
          {value || placeholder}
        </button>
        {isOpen && (
          <div className='yearMonthDropDown'>
            {options.map((option) => (
              <div
                key={option}
                className={value === option ? 'selected' : ''}
                onClick={() => {
                  onChange(option);
                  toggleDropdown();
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

const DateRangeCalendar = () => {
    // DatePicker
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [tempDateRange, setTempDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState(getYear(new Date()));
    const [selectedMonth, setSelectedMonth] = useState(getMonth(new Date()));
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
    const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => currentYear - 1 + i);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handleApply = () => {
        setDateRange(tempDateRange);
        setIsDatePickerOpen(false);
    };
    const handleCancel = () => {
        setTempDateRange(dateRange);
        setIsDatePickerOpen(false);
    };
    const handleDateChange = (update: [Date | null, Date | null]) => {
        if (update[0]) {
        const newEndDate = addDays(update[0], 6);
        setTempDateRange([update[0], newEndDate]);
        } else {
        setTempDateRange([null, null]);
        }
    };
    const formatDateRange = (start: Date | null, end: Date | null): string => {
        if (!start || !end) return '';
        const startDate = format(start, "EEE d MMMM");
        const endDate = format(end, "EEE d MMMM");
        return `${startDate} - ${endDate}`;
    };
    const CustomInput = ({ value, onClick }: any) => (
        <input
            type="text"
            value={formatDateRange(tempDateRange[0], tempDateRange[1])}
            onClick={() => setIsDatePickerOpen(true)}
            readOnly
            placeholder=""
        />
    );

    useEffect(() => {
        const updateDayNames = () => {
          const dayNames = document.querySelectorAll('.react-datepicker__day-name');
          const shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          dayNames.forEach((dayName, index) => {
            dayName.setAttribute('data-short', shortDayNames[index]);
          });
        };
    
        if (isDatePickerOpen) {
          updateDayNames();
        }
      }, [isDatePickerOpen]);

  return (
    <div className={`date-picker-container ${isDatePickerOpen ? 'active' : ''}`}>
        <DatePicker
            selected={tempDateRange[0]}
            onChange={handleDateChange}
            // startDate={tempDateRange[0]}
            // endDate={tempDateRange[1]}
            startDate={tempDateRange[0] || undefined}
            endDate={tempDateRange[1] || undefined}
            selectsRange
            shouldCloseOnSelect={false}
            customInput={<CustomInput />}
            open={isDatePickerOpen}
            onClickOutside={() => setIsDatePickerOpen(false)}
            renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            }) => (
            <div>
                <span className='DefaultMonthYear'>{months[selectedMonth]} {String(selectedYear)}</span>
                <div className='MonthYearArea'>
                <CustomDropdown
                    options={years.map(String)}
                    value={String(selectedYear)}
                    onChange={(year) => {
                    setSelectedYear(Number(year));
                    changeYear(Number(year));
                    setIsYearDropdownOpen(false);
                    }}
                    placeholder="Select year"
                    isOpen={isYearDropdownOpen}
                    toggleDropdown={() => {
                    setIsYearDropdownOpen(!isYearDropdownOpen);
                    if (!isYearDropdownOpen) setIsMonthDropdownOpen(false);
                    }}
                />
                <CustomDropdown
                    options={months}
                    value={months[selectedMonth]}
                    onChange={(month) => {
                    setSelectedMonth(months.indexOf(month));
                    changeMonth(months.indexOf(month));
                    setIsMonthDropdownOpen(false);
                    }}
                    placeholder="Select month"
                    isOpen={isMonthDropdownOpen}
                    toggleDropdown={() => {
                    setIsMonthDropdownOpen(!isMonthDropdownOpen);
                    if (!isMonthDropdownOpen) setIsYearDropdownOpen(false);
                    }}
                />
                </div>
                {isDatePickerOpen && (
                    <div className='CalendarBothBtn'>
                        <button onClick={handleApply} className='default-btn2-wicon'>Okay</button>
                        <button onClick={handleCancel} className='outlibe-btn-wicon'>Cancel</button>
                    </div>
                )}
            </div>
            )}
        />
    </div>
  )
}

export default DateRangeCalendar
