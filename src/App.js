import React, { useState } from 'react';
import './App.css';

const HierarquiaObjetivos = () => {
    const [visibilidade, setVisibilidade] = useState({});
    const [objetivos, setObjetivos] = useState([
        { 
            id: "obj1", 
            nome: "📌 Objetivo 1", 
            subobjetivos: [
                { id: "sub1", nome: "✅ Subobjetivo 1.1", acoes: [
                    { id: "acao1.1.1", nome: "➡️ Ação 1.1.1" },
                    { id: "acao1.1.2", nome: "➡️ Ação 1.1.2" }
                ] }
            ]
        }
    ]);
    const [novoObjetivo, setNovoObjetivo] = useState("");
    const [novoSubobjetivo, setNovoSubobjetivo] = useState({});
    const [novaAcao, setNovaAcao] = useState({});

    const toggle = (id) => {
        setVisibilidade((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const adicionarObjetivo = () => {
        if (novoObjetivo.trim() !== "") {
            const id = `obj${objetivos.length + 1}`;
            setObjetivos([...objetivos, { id, nome: `📌 ${novoObjetivo}`, subobjetivos: [] }]);
            setNovoObjetivo("");
        }
    };

    const adicionarSubobjetivo = (objId) => {
        if (novoSubobjetivo[objId]?.trim()) {
            setObjetivos((prev) =>
                prev.map((obj) =>
                    obj.id === objId
                        ? { ...obj, subobjetivos: [...obj.subobjetivos, { id: `${objId}-sub${obj.subobjetivos.length + 1}`, nome: `✅ ${novoSubobjetivo[objId]}`, acoes: [] }] }
                        : obj
                )
            );
            setNovoSubobjetivo((prev) => ({ ...prev, [objId]: "" }));
        }
    };

    const adicionarAcao = (subId, objId) => {
        if (novaAcao[subId]?.trim()) {
            setObjetivos((prev) =>
                prev.map((obj) =>
                    obj.id === objId
                        ? {
                            ...obj,
                            subobjetivos: obj.subobjetivos.map((sub) =>
                                sub.id === subId ? { ...sub, acoes: [...sub.acoes, { id: `${subId}-acao${sub.acoes.length + 1}`, nome: `➡️ ${novaAcao[subId]}` }] } : sub
                            )
                        }
                        : obj
                )
            );
            setNovaAcao((prev) => ({ ...prev, [subId]: "" }));
        }
    };

    return (
        <div className="p-4">
            <ul className="list-none">
                {objetivos.map((obj) => (
                    <li key={obj.id}>
                        <span className="cursor-pointer text-blue-600" onClick={() => toggle(obj.id)}>
                            {obj.nome}
                        </span>
                        {visibilidade[obj.id] && (
                            <ul className="ml-4">
                                {obj.subobjetivos.map((sub) => (
                                    <li key={sub.id}>
                                        <span className="cursor-pointer text-blue-600" onClick={() => toggle(sub.id)}>
                                            {sub.nome}
                                        </span>
                                        {visibilidade[sub.id] && (
                                            <ul className="ml-8">
                                                {sub.acoes.map((acao) => (
                                                    <li key={acao.id}>
                                                        <span className="cursor-pointer text-gray-600" onClick={() => toggle(acao.id)}>
                                                            {acao.nome}
                                                        </span>
                                                    </li>
                                                ))}
                                                <li className="mt-2">
                                                    <input
                                                        type="text"
                                                        value={novaAcao[sub.id] || ""}
                                                        onChange={(e) =>
                                                            setNovaAcao((prev) => ({ ...prev, [sub.id]: e.target.value }))
                                                        }
                                                        className="p-2 border rounded mr-2"
                                                        placeholder="Nova ação"
                                                    />
                                                    <button
                                                        onClick={() => adicionarAcao(sub.id, obj.id)}
                                                        className="p-2 bg-blue-500 text-white rounded"
                                                    >
                                                        + Adicionar Ação
                                                    </button>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                ))}
                                <li className="mt-4">
                                    <input
                                        type="text"
                                        value={novoSubobjetivo[obj.id] || ""}
                                        onChange={(e) =>
                                            setNovoSubobjetivo((prev) => ({ ...prev, [obj.id]: e.target.value }))
                                        }
                                        className="p-2 border rounded mr-2"
                                        placeholder="Novo subobjetivo"
                                    />
                                    <button
                                        onClick={() => adicionarSubobjetivo(obj.id)}
                                        className="p-2 bg-green-500 text-white rounded"
                                    >
                                        + Adicionar Subobjetivo
                                    </button>
                                </li>
                            </ul>
                        )}
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
                        className="p-2 bg-red-500 text-white rounded"
                    >
                        + Adicionar Objetivo
                    </button>
                </li>
            </ul>
        </div>
    );
};

function App() {
    return (
        <div className="App">
            <HierarquiaObjetivos />
        </div>
    );
}

export default App;
