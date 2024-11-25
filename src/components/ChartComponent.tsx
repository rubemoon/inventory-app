import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import { apiService } from '../services/apiService';
import { useTheme } from '../context/ThemeContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const ChartComponent: React.FC = () => {
    const { theme } = useTheme();
    const [orderData, setOrderData] = useState<number[]>([]);
    const [revenueData, setRevenueData] = useState<number[]>([]);
    const [productData, setProductData] = useState<number[]>([]);
    const [supplierData, setSupplierData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [productLabels, setProductLabels] = useState<string[]>([]);
    const [supplierLabels, setSupplierLabels] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orders = await apiService.getAllOrders();
                const products = await apiService.getAllProducts();
                const suppliers = await apiService.getAllSuppliers();

                const orderQuantities = orders.map((item: any) => item.quantity);
                const orderRevenue = orders.map((item: any) => item.total);
                const orderDates = orders.map((item: any) => new Date(item.date).toLocaleDateString());

                const productQuantities = products.map((item: any) => item.quantity);
                const productNames = products.map((item: any) => item.name);

                const supplierCounts = suppliers.map((item: any) => item.productCount);
                const supplierNames = suppliers.map((item: any) => item.name);

                setOrderData(orderQuantities);
                setRevenueData(orderRevenue);
                setLabels(orderDates);
                setProductData(productQuantities);
                setProductLabels(productNames);
                setSupplierData(supplierCounts);
                setSupplierLabels(supplierNames);
            } catch (error) {
                console.error('Falha ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    const barData = {
        labels,
        datasets: [
            {
                label: 'Pedidos',
                data: orderData,
                backgroundColor: theme === 'dark' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)',
                borderColor: theme === 'dark' ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const lineData = {
        labels,
        datasets: [
            {
                label: 'Receita',
                data: revenueData,
                fill: false,
                backgroundColor: theme === 'dark' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)',
                borderColor: theme === 'dark' ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const pieDataProducts = {
        labels: productLabels,
        datasets: [
            {
                label: 'Disponibilidade de Produtos',
                data: productData,
                backgroundColor: [
                    theme === 'dark' ? 'rgba(255, 99, 132, 0.2)' : 'rgba(255, 99, 132, 0.2)',
                    theme === 'dark' ? 'rgba(54, 162, 235, 0.2)' : 'rgba(54, 162, 235, 0.2)',
                    theme === 'dark' ? 'rgba(255, 206, 86, 0.2)' : 'rgba(255, 206, 86, 0.2)',
                    theme === 'dark' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)',
                    theme === 'dark' ? 'rgba(153, 102, 255, 0.2)' : 'rgba(153, 102, 255, 0.2)',
                    theme === 'dark' ? 'rgba(255, 159, 64, 0.2)' : 'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    theme === 'dark' ? 'rgba(255, 99, 132, 1)' : 'rgba(255, 99, 132, 1)',
                    theme === 'dark' ? 'rgba(54, 162, 235, 1)' : 'rgba(54, 162, 235, 1)',
                    theme === 'dark' ? 'rgba(255, 206, 86, 1)' : 'rgba(255, 206, 86, 1)',
                    theme === 'dark' ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)',
                    theme === 'dark' ? 'rgba(153, 102, 255, 1)' : 'rgba(153, 102, 255, 1)',
                    theme === 'dark' ? 'rgba(255, 159, 64, 1)' : 'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieDataSuppliers = {
        labels: supplierLabels,
        datasets: [
            {
                label: 'Fornecedores',
                data: supplierData,
                backgroundColor: [
                    theme === 'dark' ? 'rgba(255, 99, 132, 0.2)' : 'rgba(255, 99, 132, 0.2)',
                    theme === 'dark' ? 'rgba(54, 162, 235, 0.2)' : 'rgba(54, 162, 235, 0.2)',
                    theme === 'dark' ? 'rgba(255, 206, 86, 0.2)' : 'rgba(255, 206, 86, 0.2)',
                    theme === 'dark' ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)',
                    theme === 'dark' ? 'rgba(153, 102, 255, 0.2)' : 'rgba(153, 102, 255, 0.2)',
                    theme === 'dark' ? 'rgba(255, 159, 64, 0.2)' : 'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    theme === 'dark' ? 'rgba(255, 99, 132, 1)' : 'rgba(255, 99, 132, 1)',
                    theme === 'dark' ? 'rgba(54, 162, 235, 1)' : 'rgba(54, 162, 235, 1)',
                    theme === 'dark' ? 'rgba(255, 206, 86, 1)' : 'rgba(255, 206, 86, 1)',
                    theme === 'dark' ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)',
                    theme === 'dark' ? 'rgba(153, 102, 255, 1)' : 'rgba(153, 102, 255, 1)',
                    theme === 'dark' ? 'rgba(255, 159, 64, 1)' : 'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-neutral-800 p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Gráfico de Barras de Pedidos</h2>
                <Bar data={barData} />
                <p className="mt-2 text-gray-600 dark:text-gray-400">Este gráfico mostra o número de pedidos ao longo do tempo.</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Gráfico de Linha de Receita</h2>
                <Line data={lineData} />
                <p className="mt-2 text-gray-600 dark:text-gray-400">Este gráfico mostra a receita gerada pelos pedidos ao longo do tempo.</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Disponibilidade de Produtos</h2>
                <Pie data={pieDataProducts} />
                <p className="mt-2 text-gray-600 dark:text-gray-400">Este gráfico mostra a disponibilidade de diferentes produtos.</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Fornecedores</h2>
                <Pie data={pieDataSuppliers} />
                <p className="mt-2 text-gray-600 dark:text-gray-400">Este gráfico mostra o número de produtos fornecidos por diferentes fornecedores.</p>
            </div>
        </div>
    );
};

export default ChartComponent;