import React from 'react';

const HeroCard = ({ budget, residual, percentSpent }) => {
    const isLowBudget = residual < (budget * 0.1);
    const statusColor = isLowBudget ? 'var(--color-coral)' : 'var(--color-text)';

    return (
        <div className="card" style={{ background: 'linear-gradient(135deg, #fff 0%, #f7f9fc 100%)' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#888', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Budget Residuo
            </h3>

            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: statusColor, marginBottom: '20px' }}>
                € {parseFloat(residual).toFixed(2)}
            </div>

            <div style={{ position: 'relative', height: '10px', background: '#eee', borderRadius: '5px', overflow: 'hidden' }}>
                <div
                    style={{
                        width: `${Math.min(percentSpent, 100)}%`,
                        height: '100%',
                        background: isLowBudget ? 'var(--color-coral)' : 'var(--color-mint)',
                        transition: 'width 0.5s ease-in-out'
                    }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.85rem', color: '#666' }}>
                <span>Speso: € {parseFloat(budget - residual).toFixed(2)}</span>
                <span>Budget: € {parseFloat(budget).toFixed(2)}</span>
            </div>
        </div>
    );
};

export default HeroCard;
