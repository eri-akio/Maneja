import React, { useState } from 'react';
import HierarquiaObjetivos from './HierarquiaObjetivos';

const MenuLateral = () => {
    const [departamentos, setDepartamentos] = useState([]);
    const [novoDepartamento, setNovoDepartamento] = useState("");
    const [departamentoSelecionado, setDepartamentoSelecionado] = useState(null);
    const [objetivosPorDepartamento, setObjetivosPorDepartamento] = useState({});

    const adicionarDepartamento = () => {
        if (novoDepartamento.trim() !== "") {
            const id = `dep${departamentos.length + 1}`;
            const novoDepartamentoObj = { id, nome: novoDepartamento };
            setDepartamentos([...departamentos, novoDepartamentoObj]);
            setObjetivosPorDepartamento((prev) => ({
                ...prev,
                [id]: [], // Inicializa a lista de objetivos para o novo departamento
            }));
            setNovoDepartamento("");
        }
    };

    const selecionarDepartamento = (dep) => {
        setDepartamentoSelecionado(dep);
    };

    const adicionarObjetivo = (departamentoId, nomeObjetivo) => {
        if (nomeObjetivo.trim() !== "") {
            const id = `obj${objetivosPorDepartamento[departamentoId].length + 1}`;
            const novoObjetivoObj = { id, nome: nomeObjetivo, subobjetivos: [] };
            setObjetivosPorDepartamento((prev) => ({
                ...prev,
                [departamentoId]: [...prev[departamentoId], novoObjetivoObj],
            }));
        }
    };

    return (
        <div className="flex">
            <div className="w-64 h-screen bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold mb-4">Menu</h2>
                <ul>
                    {departamentos.map((dep) => (
                        <li key={dep.id} className="mt-2">
                            <span
                                className="cursor-pointer text-blue-400"
                                onClick={() => selecionarDepartamento(dep)}
                            >
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
            {departamentoSelecionado && (
                <div className="flex-1 p-4">
                    <h2 className="text-xl font-bold mb-4">{departamentoSelecionado.nome}</h2>
                    <HierarquiaObjetivos
                        departamentoId={departamentoSelecionado.id}
                        objetivos={objetivosPorDepartamento[departamentoSelecionado.id] || []}
                        adicionarObjetivo={adicionarObjetivo}
                        setObjetivosPorDepartamento={setObjetivosPorDepartamento}
                    />
                </div>
            )}
        </div>
    );
};

export default MenuLateral;