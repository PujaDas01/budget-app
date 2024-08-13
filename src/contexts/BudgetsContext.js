import React, { useContext, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import useLocalStorage from "../hooks/useLocalStorage";
const BudgetsContext = React.createContext();


export const useBudgets = () => {
    return useContext(BudgetsContext)
}

// {
//     id:
//     name:
//     max:
// }

// {
//     id:
//     budgetId:
//     amount:
//     description:
// }

export const BudgetsProvider = ({children}) => {

    const [budgets, setBudgets] = useLocalStorage('budgets', []);
    const [expenses, setExpenses] = useLocalStorage('expenses', []);

    const getBudgetExpenses = (budgetId) => {   
        return expenses.filter(expense => expense.budgetId === budgetId);
    }

    const addExpense = ({description, amount, budgetId}) => {
        setExpenses(prevExpenses => {
            return [...prevExpenses, {id: uuidv4(), description, amount, budgetId}]
        })
    }

    const addBudget = ({name, max}) => {
        setBudgets(prevBudgets => {
            if(prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets;
            }
            return [...prevBudgets, {id: uuidv4(), name, max}]
        })
    }

    const deleteBudget = ({id}) => {
        // TODO Deal with expenses
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id);
        })
    }

    const deleteExpense = ({id}) => {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id);
        })
    }

    return (
        <BudgetsContext.Provider value={{
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense
        }}>
            {children}
        </BudgetsContext.Provider>
    )
}