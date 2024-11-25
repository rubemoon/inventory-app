import { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { Supplier } from '../lib/types';

function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [newSupplier, setNewSupplier] = useState<Supplier>({ id: '', name: '', contact: '', address: '' });
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const data = await apiService.getAllSuppliers();
      setSuppliers(data);
    } catch (error) {
      console.error('Falha ao buscar fornecedores:', error);
      setError('Falha ao buscar fornecedores');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSupplier = async () => {
    setLoading(true);
    try {
      if (editingSupplier) {
        await apiService.updateSupplier(editingSupplier.id, newSupplier);
        setEditingSupplier(null);
      } else {
        await apiService.createSupplier({ ...newSupplier, id: crypto.randomUUID() });
      }
      fetchSuppliers();
      setNewSupplier({ id: '', name: '', contact: '', address: '' });
      setIsModalOpen(false);
    } catch (error) {
      setError('Falha ao adicionar/atualizar fornecedor');
      console.error('Falha ao adicionar/atualizar fornecedor:', error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const handleDeleteSupplier = async (id: string) => {
    setLoading(true);
    try {
      await apiService.deleteSupplier(id);
      fetchSuppliers();
    } catch (error) {
      console.error('Falha ao deletar fornecedor:', error);
      setError('Falha ao deletar fornecedor');
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setNewSupplier(supplier);
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-4">Fornecedores</h1>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar Novo Fornecedor
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading && <div className="text-blue-500 mb-4">Carregando...</div>}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-2">{editingSupplier ? 'Editar Fornecedor' : 'Adicionar Novo Fornecedor'}</h2>
            <div className="mb-4">
              <label className="block mb-1">Nome</label>
              <input
                type="text"
                placeholder="Nome"
                value={newSupplier.name}
                onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <label className="block mb-1">Contato</label>
              <input
                type="text"
                placeholder="Contato"
                value={newSupplier.contact}
                onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
              <label className="block mb-1">Endereço</label>
              <input
                type="text"
                placeholder="Endereço"
                value={newSupplier.address}
                onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                className="border p-2 mb-2 w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingSupplier(null);
                  setNewSupplier({ id: '', name: '', contact: '', address: '' });
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleAddSupplier}
                disabled={loading}
              >
                {editingSupplier ? 'Atualizar Fornecedor' : 'Adicionar Fornecedor'}
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b dark:border-gray-700">ID</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Nome</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Contato</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Endereço</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Ações</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={supplier.id || index}>
              <td className="py-2 px-4 border-b dark:border-gray-700">{supplier.id || 'N/A'}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{supplier.name}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{supplier.contact}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">{supplier.address}</td>
              <td className="py-2 px-4 border-b dark:border-gray-700">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => supplier.id && handleDeleteSupplier(supplier.id)}
                  disabled={loading}
                >
                  Deletar
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEditSupplier(supplier)}
                  disabled={loading}
                >
                  Editar
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