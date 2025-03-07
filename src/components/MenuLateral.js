const MenuLateral = () => {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <ul>
                <li className="mb-2 cursor-pointer hover:text-gray-400">Opção 1</li>
                <li className="mb-2 cursor-pointer hover:text-gray-400">Opção 2</li>
                <li className="mb-2 cursor-pointer hover:text-gray-400">Opção 3</li>
            </ul>
        </div>
    );
};

export default MenuLateral;