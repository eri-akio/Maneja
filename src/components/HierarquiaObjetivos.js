import React, { useState } from 'react';

const HierarquiaObjetivo = ({ departamento }) => {
    const [visibilidade, setVisibilidade] = useState({});
    const [objetivos, setObjetivos] = useState([]);
    const [novoObjetivo, setNovoObjetivo] = useState("");

    const toggle = (id) => {
        setVisibilidade((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const adicionarObjetivo = () => {
        if (novoObjetivo.trim() !== "") {
            const id = `obj${objetivos.length + 1}`;
            setObjetivos([...objetivos, { id, nome: novoObjetivo, subobjetivos: [] }]);
            setNovoObjetivo("");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{departamento} - Objetivos</h2>
            <ul className="list-none">
                {objetivos.map((obj) => (
                    <li key={obj.id}>
                        <span className="cursor-pointer text-blue-600" onClick={() => toggle(obj.id)}>
                            {visibilidade[obj.id] ? "▼" : "▶"} {obj.nome}
                        </span>
                    </li>
                ))}
                <li className="mt-4">
                    <input
                        type="text"
                        value={novoObjetivo}
                        onChange={(e) => setNovoObjetivo(e.target.value)}
                        className="p-2 border rounded mr-2"
                        placeholder="Novo objetivo"
                    />
                    <button
                        onClick={adicionarObjetivo}
                        className="p-2 bg-green-500 text-white rounded"
                    >
                        + Adicionar Objetivo
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default HierarquiaObjetivo;
