import { Button, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import { useState } from 'react';
import { useBudgets } from './contexts/BudgetsContext';
import AddExpenseModal from './components/AddExpenseModal';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';

const App = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const {budgets, getBudgetExpenses} = useBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }

  return(
    <>
      <Container className='my-4'>
        <Stack direction='horizontal' gap='2' className='mb-4'>
          <h1 className='me-auto'>Budgets</h1>
          <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
          <Button variant='outline-primary' onClick={openAddExpenseModal}>Add Expense</Button>
        </Stack>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, lfr))', gap: '1rem', alignItems: 'flex-start'}}>
          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
            return (<BudgetCard key={budget.id} name={budget.name} amount={amount} max={budget.max} openAddExpenseClick={() => openAddExpenseModal(budget.id)} />)
          })}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={addExpenseModalBudgetId} handleClose={() => setShowAddExpenseModal(false)} />
   </>
  )
}

export default App; 
