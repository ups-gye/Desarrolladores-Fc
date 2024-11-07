// components/Modal.js
import React from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null; // No renderiza el modal si no está abierto.

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-60">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
