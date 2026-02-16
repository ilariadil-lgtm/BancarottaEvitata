import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeroCard from './components/HeroCard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import DistributionChart from './components/DistributionChart';

function App() {
  const [budgetStatus, setBudgetStatus] = useState({ budget: 0, spent: 0, residual: 0, percent_spent: 0 });
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [budgetRes, expensesRes, categoriesRes, summaryRes] = await Promise.all([
        axios.get('/api/budget-status'),
        axios.get('/api/spese'),
        axios.get('/api/categories'),
        axios.get('/api/riepilogo')
      ]);

      setBudgetStatus(budgetRes.data);
      setExpenses(expensesRes.data);
      setCategories(categoriesRes.data);
      setSummary(summaryRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExpenseAdded = () => {
    fetchData();
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--color-mint)' }}>Caricamento...</div>;
  }

  return (
    <div className="App" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#555', fontSize: '1.8rem', fontWeight: '700' }}>Bancarotta Evitata 💸</h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Top Row: Hero Card & Distribution */}
        <div style={{ gridColumn: 'span 2' }}>
          {/* Mobile responsiveness hook might be needed to un-span on small screens, 
               but for now simple grid is fine. Let's make HeroCard full width if needed or split.
               Actually, let's put HeroCard and New Expense on top? 
               Let's follow the user request: 
               Hero Card (Big)
               Widget New Expense (Side)
               Widget Recent Expenses
               Widget Distribution
           */}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>

        {/* Left Column (Main Stats) */}
        <div style={{ gridColumn: 'span 8' }}>
          <div style={{ marginBottom: '24px' }}>
            <HeroCard
              budget={budgetStatus.budget}
              residual={budgetStatus.residual}
              percentSpent={budgetStatus.percent_spent}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <ExpenseList expenses={expenses} />
          </div>
        </div>

        {/* Right Column (Actions & Charts) */}
        <div style={{ gridColumn: 'span 4' }}>
          <div style={{ marginBottom: '24px' }}>
            <ExpenseForm categories={categories} onExpenseAdded={handleExpenseAdded} />
          </div>

          <div>
            <DistributionChart data={summary} />
          </div>
        </div>

      </div>

      {/* Responsive adjustment for small screens */}
      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(12, 1fr)"] {
            display: flex !important;
            flex-direction: column;
          }
          div[style*="gridColumn: span 8"], div[style*="gridColumn: span 4"] {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
