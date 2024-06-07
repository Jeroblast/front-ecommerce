// File: src/components/DeleteProduct.js
import React, { useState, useEffect } from 'react';

const DeleteProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8000/api/products')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched products:', data);
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    const handleChange = (event) => {
        setSelectedProductId(event.target.value);
    };

    const handleDelete = () => {
        if (selectedProductId) {
            fetch(`http://localhost:8000/api/products/${selectedProductId}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        setProducts(products.filter(product => product.id !== selectedProductId));
                        setSelectedProductId('');
                    } else {
                        console.error('Failed to delete product');
                    }
                })
                .catch(error => console.error('Error deleting product:', error));
        }
    };

    return (
        <div>
            <label htmlFor="product-select" className="block text-gray-700 font-bold mb-2">Choisir un produit :</label>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <select
                    id="product-select"
                    value={selectedProductId}
                    onChange={handleChange}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">--Veuillez choisir une option--</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.title}
                        </option>
                    ))}
                </select>
            )}
            <button
                onClick={handleDelete}
                disabled={!selectedProductId || loading}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600 disabled:bg-gray-300"
            >
                Supprimer le produit
            </button>
        </div>
    );
};

export default DeleteProduct;
