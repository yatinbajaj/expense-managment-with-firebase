import React, { useState,useContext } from "react";
import classes from "./ExpenseForm.module.css";
import authContext from "../../store/auth-context";

function ExpenseForm({ sendDataToApp }) {
    const [title, updateTitle] = useState("");
    const [amount, updateAmount] = useState("");
    const [date, updateDate] = useState("");
    const ctx = useContext(authContext);

    const titleChangeHandler = (event) => {
        updateTitle(event.target.value);
    }
    const amountChangeHandler = (event) => {
        updateAmount(event.target.value)
    }
    const dateChangeHandler = (event) => {
        updateDate(event.target.value);
    }
    console.log('form');
    const formSubmitHandler = (event) => {
        event.preventDefault();
        const expense = { title, amount, date };
        sendDataToApp(expense);
        updateAmount("");
        updateDate("");
        updateTitle("");
    }

    return (
        <div className={classes.new_expense}>
            <form onSubmit={formSubmitHandler}>
                <div className={classes.new_expense__controls}>
                    <div className={classes.new_expense__control}>
                        <label>Title</label>
                        <input type="text" value={title} onChange={titleChangeHandler} />
                    </div>
                    <div className={classes.new_expense__control}>
                        <label>Amount</label>
                        <input type="number" min="0.01" step="0.01" value={amount} onChange={amountChangeHandler} />
                    </div>
                    <div className={classes.new_expense__control}>
                        <label>Date</label>
                        <input type="date" min="2019-01-01" max="2022-12-31" value={date} onChange={dateChangeHandler} />
                    </div>
                </div>
                <div className={classes.new_expense__actions}>
                    <button type="button" onClick={ctx.logout}>Logout</button>
                    <button type="submit">Add Expense</button>
                </div>
            </form>
        </div>
    );
}

const MemoizedExpenseForm = React.memo(ExpenseForm);

export default MemoizedExpenseForm;
