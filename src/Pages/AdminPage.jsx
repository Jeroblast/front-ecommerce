// File: src/pages/AdminPage.js
import { useState } from 'react';
import Navbar from '../Components/Navbar/Navbar.jsx';
import CreateProductForm from "./CreateProductForm.jsx";
import DeleteProduct from "../Components/DeleteProduct.jsx";

const AdminPage = () => {
    const [showForm, setShowForm] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleCreateProduct = () => {
        setShowForm(true);
        setShowDelete(false); // Hide delete product form when creating a product
    };

    const handleDeleteProduct = () => {
        setShowDelete(true);
        setShowForm(false); // Hide create product form when deleting a product
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center h-auto py-20 bg-gray-100">
                <div className="bg-gray-200 w-96 p-8 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-8 text-black">Espace administrateur</h1>
                    <div className="space-y-4">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
                            onClick={handleCreateProduct}
                        >
                            Créer un produit
                        </button>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded shadow-md hover:bg-red-600"
                            onClick={handleDeleteProduct}
                        >
                            Supprimer un produit
                        </button>
                    </div>
                </div>
                {showForm && (
                    <div className="bg-white w-full max-w-lg p-8 mt-10 rounded-lg shadow-lg">
                        <CreateProductForm />
                    </div>
                )}
                {showDelete && (
                    <div className="bg-white w-full max-w-lg p-8 mt-10 rounded-lg shadow-lg">
                        <DeleteProduct />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
