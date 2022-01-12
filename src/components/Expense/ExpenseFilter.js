import React from 'react'
import './ExpenseFilter.css';

function ExpenseFilter({sendSelectedYear,selectedYear}) {
    
    const filterHandler = (event) => {
        sendSelectedYear(event.target.value);
    }
    console.log('filter');
    return (
        <div className="expenses-filter_container">
            <div className="expenses-filter__control">
                <label className='expenses-filter_label'>Filter By Year</label>
                <select value={selectedYear} className='expenses-filter_select' onChange={filterHandler}>
                    <option value={'2022'}>2022</option>
                    <option value={'2021'}>2021</option>
                    <option value={'2020'}>2020</option>
                    <option value={'2019'}>2019</option>
                </select>
            </div>
        </div>
    )
}

export default React.memo(ExpenseFilter);
