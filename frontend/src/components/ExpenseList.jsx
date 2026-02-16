import React from 'react';
import { ShoppingBag, Coffee, Car, AlertCircle } from 'lucide-react';

const getCategoryIcon = (categoryName) => {
    switch (categoryName?.toLowerCase()) {
        case 'cibo': return <Coffee size={20} color="#888" />;
        case 'trasporti': return <Car size={20} color="#888" />;
        case 'svago': return <ShoppingBag size={20} color="#888" />;
        default: return <AlertCircle size={20} color="#888" />;
    }
};

const ExpenseList = ({ expenses }) => {
    return (
        <div className="card">
            <h3 style={{ marginTop: 0 }}>Ultime Spese</h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {expenses.length === 0 ? (
                    <p style={{ color: '#aaa', textAlign: 'center' }}>Nessuna spesa recente</p>
                ) : (
                    expenses.map(expense => (
                        <div key={expense.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '12px 0',
                            borderBottom: '1px solid #f0f0f0'
                        }}>
                            <div style={{
                                width: '40px', height: '40px',
                                borderRadius: '50%', background: '#f5f5f5',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginRight: '15px'
                            }}>
                                {getCategoryIcon(expense.category_name)}
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '500' }}>{expense.description}</div>
                                <div style={{ fontSize: '0.8rem', color: '#999' }}>
                                    {new Date(expense.date).toLocaleDateString('it-IT')} • {expense.category_name}
                                </div>
                            </div>

                            <div style={{ fontWeight: 'bold', color: '#e74c3c' }}>
                                - € {parseFloat(expense.amount).toFixed(2)}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ExpenseList;
