import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { Supplier } from '../lib/types'
import ThemeToggle from '../components/ThemeToggle';

function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [newSupplier, setNewSupplier] = useState({ name: '', contactInfo: '' });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const data = await apiService.getAllSuppliers();
    setSuppliers(data);
  };

  const handleAddSupplier = async () => {
    await apiService.createSupplier({
      name: newSupplier.name, contactInfo: newSupplier.contactInfo,
      id: ''
    });
    fetchSuppliers();
    setNewSupplier({ name: '', contactInfo: '' });
  };

  const handleDeleteSupplier = async (id: string) => {
    await apiService.deleteSupplier(id);
    fetchSuppliers();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <ThemeToggle />
      </div>

      <h2 className="text-xl font-bold mb-2">Add New Supplier</h2>
      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <div className="flex flex-wrap -mx-2">
          <input
            type="text"
            placeholder="Name"
            value={newSupplier.name}
            onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
            className="border p-2 m-2 flex-1"
          />
          <input
            type="text"
            placeholder="Contact Info"
            value={newSupplier.contactInfo}
            onChange={(e) => setNewSupplier({ ...newSupplier, contactInfo: e.target.value })}
            className="border p-2 m-2 flex-1"
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={handleAddSupplier}
        >
          Add Supplier
        </button>
      </div>

      <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-700">ID</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Name</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Contact Info</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td className="py-2 px-4 border-b dark:border-gray-700">{supplier.id}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{supplier.name}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{supplier.contactInfo}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteSupplier(supplier.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Suppliers;