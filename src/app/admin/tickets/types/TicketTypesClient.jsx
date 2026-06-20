'use client';

import { useState, useTransition } from 'react';
import { updateTicketPrice } from './actions';
import { Pencil, Check, X, Tag } from 'lucide-react';

export default function TicketTypesClient({ initialProducts }) {
    const [products, setProducts] = useState(initialProducts || []);
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleEditClick = (product) => {
        setEditingId(product.id);
        setEditValue(product.price?.toString() || '0');
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditValue('');
    };

    const handleSave = (id) => {
        const newPrice = parseFloat(editValue);
        if (isNaN(newPrice) || newPrice < 0) {
            alert('Please enter a valid positive price.');
            return;
        }

        startTransition(async () => {
            const res = await updateTicketPrice(id, newPrice);
            if (res.success) {
                // Optimistically update the UI
                setProducts(products.map(p => p.id === id ? { ...p, price: newPrice } : p));
                setEditingId(null);
            } else {
                alert(`Failed to update price: ${res.error}`);
            }
        });
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl shadow-primary/5 border border-primary/10 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-primary uppercase bg-primary/5 border-b border-primary/10">
                        <tr>
                            <th className="px-6 py-4 font-black tracking-widest">Ticket Type</th>
                            <th className="px-6 py-4 font-black tracking-widest">Status</th>
                            <th className="px-6 py-4 font-black tracking-widest">Price (ZAR)</th>
                            <th className="px-6 py-4 font-black tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                                            <Tag className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-base">{product.name}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                        product.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {product.active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    {editingId === product.id ? (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 font-bold">R</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="w-24 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary py-1.5 px-3 font-bold text-gray-900"
                                                autoFocus
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') handleSave(product.id);
                                                    if (e.key === 'Escape') handleCancel();
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <span className="font-black text-primary text-lg">
                                            R {product.price?.toLocaleString() || '0'}
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-5 text-right">
                                    {editingId === product.id ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleSave(product.id)}
                                                disabled={isPending}
                                                className="p-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors disabled:opacity-50"
                                                title="Save"
                                            >
                                                <Check className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                disabled={isPending}
                                                className="p-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors disabled:opacity-50"
                                                title="Cancel"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleEditClick(product)}
                                            className="p-2 bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors inline-flex items-center gap-2 font-bold text-xs uppercase tracking-wider"
                                        >
                                            <Pencil className="w-4 h-4" />
                                            Edit Price
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-500 font-medium">
                                    No ticket types found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
