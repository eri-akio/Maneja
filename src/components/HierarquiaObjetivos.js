import React, { useState } from 'react';

const HierarquiaObjetivos = ({ departamentoId, objetivos, adicionarObjetivo, setObjetivosPorDepartamento }) => {
    const [visibilidade, setVisibilidade] = useState({});
    const [novoObjetivo, setNovoObjetivo] = useState("");
    const [novoSubobjetivo, setNovoSubobjetivo] = useState({});
    const [novaAcao, setNovaAcao] = useState({});

    const toggle = (id) => {
        setVisibilidade((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const adicionarSubobjetivo = (objId) => {
        if (novoSubobjetivo[objId]?.trim()) {
            const novoSub = {
                id: `${objId}-sub${objetivos.find((obj) => obj.id === objId).subobjetivos.length + 1}`,
                nome: novoSubobjetivo[objId],
                acoes: [],
            };
            const objetivosAtualizados = objetivos.map((obj) =>
                obj.id === objId
                    ? { ...obj, subobjetivos: [...obj.subobjetivos, novoSub] }
                    : obj
            );
            setObjetivosPorDepartamento((prev) => ({
                ...prev,
                [departamentoId]: objetivosAtualizados,
            }));
            setNovoSubobjetivo((prev) => ({ ...prev, [objId]: "" }));
        }
    };

    const adicionarAcao = (subId, objId) => {
        if (novaAcao[subId]?.trim()) {
            const novaAcaoObj = {
                id: `${subId}-acao${objetivos
                    .find((obj) => obj.id === objId)
                    .subobjetivos.find((sub) => sub.id === subId).acoes.length + 1}`,
                nome: novaAcao[subId],
            };
            const objetivosAtualizados = objetivos.map((obj) =>
                obj.id === objId
                    ? {
                        ...obj,
                        subobjetivos: obj.subobjetivos.map((sub) =>
                            sub.id === subId ? { ...sub, acoes: [...sub.acoes, novaAcaoObj] } : sub
                        ),
                    }
                    : obj
            );
            setObjetivosPorDepartamento((prev) => ({
                ...prev,
                [departamentoId]: objetivosAtualizados,
            }));
            setNovaAcao((prev) => ({ ...prev, [subId]: "" }));
        }
    };

    return (
        <div className="p-4">
            <ul className="list-none">
                {objetivos.map((obj) => (
                    <li key={obj.id}>
                        <span className="cursor-pointer text-blue-600" onClick={() => toggle(obj.id)}>
                            {visibilidade[obj.id] ? "▼" : "▶"} {obj.nome}
                        </span>
                        {visibilidade[obj.id] && (
                            <ul className="ml-4">
                                {obj.subobjetivos.map((sub) => (
                                    <li key={sub.id}>
                                        <span className="cursor-pointer text-blue-600" onClick={() => toggle(sub.id)}>
                                            {visibilidade[sub.id] ? "▼" : "▶"} {sub.nome}
                                        </span>
                                        {visibilidade[sub.id] && (
                                            <ul className="ml-8">
                                                {sub.acoes.map((acao) => (
                                                    <li key={acao.id}>
                                                        <span className="cursor-pointer text-gray-600">
                                                            • {acao.nome}
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
                        onClick={() => adicionarObjetivo(departamentoId, novoObjetivo)}
                        className="p-2 bg-red-500 text-white rounded"
                    >
                        + Adicionar Objetivo
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default HierarquiaObjetivos;