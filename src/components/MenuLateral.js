import React, { useState } from 'react';
import HierarquiaObjetivo from './HierarquiaObjetivo';

const MenuLateral = () => {
    const [departamentos, setDepartamentos] = useState([]);
    const [novoDepartamento, setNovoDepartamento] = useState("");
    const [departamentoSelecionado, setDepartamentoSelecionado] = useState(null);

    const adicionarDepartamento = () => {
        if (novoDepartamento.trim() !== "") {
            const id = `dep${departamentos.length + 1}`;
            setDepartamentos([...departamentos, { id, nome: novoDepartamento }]);
            setNovoDepartamento("");
        }
    };

    return (
        <div className="flex">
            <div className="w-64 h-screen bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold mb-4">Departamentos</h2>
                <ul>
                    {departamentos.map((dep) => (
                        <li key={dep.id} className="mt-2">
                            <button 
                                className="w-full text-left p-2 bg-gray-700 hover:bg-gray-600 rounded"
                                onClick={() => setDepartamentoSelecionado(dep)}
                            >
                                {dep.nome}
                            </button>
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

            <div className="flex-1 p-4">
                {departamentoSelecionado ? (
                    <HierarquiaObjetivo departamento={departamentoSelecionado.nome} />
                ) : (
                    <p className="text-gray-600">Selecione um departamento para visualizar seus objetivos.</p>
                )}
            </div>
        </div>
    );
};

export default MenuLateral;
