import React, { useState } from 'react';

const MenuLateral = () => {
    const [visibilidade, setVisibilidade] = useState({});
    const [departamentos, setDepartamentos] = useState([]);
    const [novoDepartamento, setNovoDepartamento] = useState("");

    const toggle = (id) => {
        setVisibilidade((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const adicionarDepartamento = () => {
        if (novoDepartamento.trim() !== "") {
            const id = `dep${departamentos.length + 1}`;
            setDepartamentos([...departamentos, { id, nome: novoDepartamento }]);
            setNovoDepartamento("");
        }
    };

    return (
        <div className="w-64 h-screen bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <ul>
                {departamentos.map((dep) => (
                    <li key={dep.id} className="mt-2">
                        <span className="cursor-pointer text-blue-400" onClick={() => toggle(dep.id)}>
                            {dep.nome}
                        </span>
                    </li>
                ))}
                <li className="mt-4">
                    <input
                        type="text"
                        value={novoDepartamento}
                        onChange={(e) => setNovoDepartamento(e.target.value)}
                        className="p-2 border rounded mr-2 text-black"
                        placeholder="Novo departamento"
                    />
                    <button
                        onClick={adicionarDepartamento}
                        className="p-2 bg-red-500 text-white rounded"
                    >
                        + Adicionar Departamento
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default MenuLateral;
