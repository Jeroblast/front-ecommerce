
const Cart = ({ isOpen, toggleCart }) => {
    return (
        <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
                <button
                    className="absolute top-2 right-2 text-gray-600"
                    onClick={toggleCart}
                >
                    Close
                </button>
                <div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
