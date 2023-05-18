import React, { useState } from "react";
import './css/dob.css'
const DateOfBirthForm = () => {
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    // Tạo danh sách các giá trị ngày
    const days = [];
    for (let i = 1; i <= 31; i++) {
        days.push(i);
    }

    // Tạo danh sách các giá trị tháng
    const months = [
        { id: 1, name: "Tháng 1" },
        { id: 2, name: "Tháng 2" },
        { id: 3, name: "Tháng 3" },
        { id: 4, name: "Tháng 4" },
        { id: 5, name: "Tháng 5" },
        { id: 6, name: "Tháng 6" },
        { id: 7, name: "Tháng 7" },
        { id: 8, name: "Tháng 8" },
        { id: 9, name: "Tháng 9" },
        { id: 10, name: "Tháng 10" },
        { id: 11, name: "Tháng 11" },
        { id: 12, name: "Tháng 12" },
    ];

    // Tạo danh sách các giá trị năm
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 100; i--) {
        years.push(i);
    }

    const handleDayChange = (event) => {
        setDay(event.target.value);
    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    return (
        <form>
            <div className="selectDate">
            <select value={day} onChange={handleDayChange}>
                <option value="">Ngày</option>
                {days.map((day) => (
                    <option key={day} value={day}>
                        {day}
                    </option>
                ))}
            </select>
            <select value={month} onChange={handleMonthChange}>
                <option value="">Tháng</option>
                {months.map((month) => (
                    <option key={month.id} value={month.id}>
                        {month.name}
                    </option>
                ))}
            </select>
            <select value={year} onChange={handleYearChange}>
                <option value="">Năm</option>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
            </div>
        </form>
    );
};

export default DateOfBirthForm;