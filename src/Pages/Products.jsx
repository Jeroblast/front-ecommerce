import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../Components/Navbar/Navbar.jsx";

const Products = () => {
    // État local pour gérer la liste des produits
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Nombre de produits par page
    const productsPerPage = 12;

    // Nombre de produits par ligne
    const productsPerRow = 4;

    // État local pour gérer la page actuelle
    const [currentPage, setCurrentPage] = useState(1);

    // Charger les produits depuis l'API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/products');
                const data = await response.json(); // Lire la réponse comme texte
                console.log(data)
                setProducts(data);
                setLoading(false);
            } catch (err) {
                console.log(err)
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Index de début et de fin des produits à afficher sur la page actuelle
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Fonction pour changer de page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Navbar />

            <div className="container mx-auto mt-8 px-4">
                <h1 className="text-3xl font-bold mb-4 text-center">Products</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {currentProducts.map((product) => (
                        <Link key={product.id} to={`/product/${product.id}`} className="w-full">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img className="w-full h-40 object-cover" src={`https://via.placeholder.com/400x250.png?text=${product.name}`} alt={product.name} />
                                <div className="p-4">
                                    <h2 className="text-gray-900 font-semibold text-lg">{product.name}</h2>
                                    <p className="text-gray-700 mt-1">Price: ${product.price}</p>
                                    <button
                                        className="mt-2 font-bold py-2 px-4 rounded focus:outline-none"
                                        style={{ backgroundColor: 'rgba(46, 223, 209, 0.65)', color: 'white' }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="mt-8 flex justify-center mb-8">
                    {/* Pagination */}
                    <ul className="flex">
                        {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => paginate(index + 1)}
                                    className={`bg-purple-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2 ${currentPage === index + 1 ? 'bg-purple-900' : 'hover:bg-purple-900'}`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Products;
