import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ categories, onExpenseAdded }) => {
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        category_id: '',
        notes: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.category_id && categories.length > 0) {
                formData.category_id = categories[0].id; // Default to first category if not selected
            }

            await axios.post('/api/spese', formData);
            onExpenseAdded(); // Refresh parent data

            // Reset form
            setFormData({
                description: '',
                amount: '',
                date: new Date().toISOString().split('T')[0],
                category_id: categories.length > 0 ? categories[0].id : '',
                notes: ''
            });
        } catch (error) {
            console.error("Error adding expense:", error);
            alert("Errore nell'inserimento della spesa");
        }
    };

    return (
        <div className="card" style={{ background: 'var(--color-lavender)' }}>
            <h3 style={{ marginTop: 0 }}>Nuova Spesa</h3>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Descrizione"
                        className="input-control"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="input-group" style={{ flex: 1 }}>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Importo €"
                            className="input-control"
                            value={formData.amount}
                            onChange={e => setFormData({ ...formData, amount: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group" style={{ flex: 1 }}>
                        <input
                            type="date"
                            className="input-control"
                            value={formData.date}
                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <select
                        className="input-control"
                        value={formData.category_id}
                        onChange={e => setFormData({ ...formData, category_id: e.target.value })}
                        required
                        style={{ backgroundColor: '#fff' }}
                    >
                        <option value="" disabled>Seleziona Categoria</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="input-group">
                    <textarea
                        placeholder="Note (opzionale)"
                        className="input-control"
                        rows="2"
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', background: 'var(--color-mint)' }}>
                    Aggiungi Spesa 💸
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
