import React, { useState,useCallback } from 'react'
import Card from '../UI/Card'
import classes from './Expenses.module.css'
import ExpenseItem from './ExpenseItem'
import uid from '../../uid';
import ExpenseFilter from './ExpenseFilter';

function Expenses({ expenses }) {
    console.log(expenses);
    const [selectedYear, updateSelectedYear] = useState('2022');
    
    const getSelectedYear = useCallback((data) => {
        updateSelectedYear(data);
    },[]);

    const filteredExpenses = expenses.filter(expense => new Date(expense.date).getFullYear().toString() === selectedYear);
    
    return (
        <Card className={classes.expenses}>
            <ExpenseFilter sendSelectedYear={getSelectedYear} selectedYear={selectedYear}/>
            {filteredExpenses.length > 0 && 
                filteredExpenses.map(expense => <ExpenseItem {...expense} key={uid()}/>)
            }
        </Card>
    )
}

export default Expenses
