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
        <div className="">
            <ul className="">
                {objetivos.map((obj) => (
                    <li key={obj.id}>
                        <span className="" onClick={() => toggle(obj.id)}>
                            {visibilidade[obj.id] ? "▼" : "▶"} {obj.nome}
                        </span>
                        {visibilidade[obj.id] && (
                            <ul className="">
                                {obj.subobjetivos.map((sub) => (
                                    <li key={sub.id}>
                                        <span className="" onClick={() => toggle(sub.id)}>
                                            {visibilidade[sub.id] ? "▼" : "▶"} {sub.nome}
                                        </span>
                                        {visibilidade[sub.id] && (
                                            <ul className="">
                                                {sub.acoes.map((acao) => (
                                                    <li key={acao.id}>
                                                        <span className="">
                                                            • {acao.nome}
                                                        </span>
                                                    </li>
                                                ))}
                                                <li className="">
                                                    <input
                                                        type="text"
                                                        value={novaAcao[sub.id] || ""}
                                                        onChange={(e) =>
                                                            setNovaAcao((prev) => ({ ...prev, [sub.id]: e.target.value }))
                                                        }
                                                        className=""
                                                        placeholder="Nova ação"
                                                    />
                                                    <button
                                                        onClick={() => adicionarAcao(sub.id, obj.id)}
                                                        className=""
                                                    >
                                                        + Adicionar Ação
                                                    </button>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                ))}
                                <li className="">
                                    <input
                                        type="text"
                                        value={novoSubobjetivo[obj.id] || ""}
                                        onChange={(e) =>
                                            setNovoSubobjetivo((prev) => ({ ...prev, [obj.id]: e.target.value }))
                                        }
                                        className=""
                                        placeholder="Novo subobjetivo"
                                    />
                                    <button
                                        onClick={() => adicionarSubobjetivo(obj.id)}
                                        className=""
                                    >
                                        + Adicionar Subobjetivo
                                    </button>
                                </li>
                            </ul>
                        )}
                    </li>
                ))}
                <li className="">
                    <input
                        type="text"
                        value={novoObjetivo}
                        onChange={(e) => setNovoObjetivo(e.target.value)}
                        className=""
                        placeholder="Novo objetivo"
                    />
                    <button
                        onClick={() => {
                            adicionarObjetivo(departamentoId, novoObjetivo);
                            setNovoObjetivo("");
                        }}
                        className=""
                    >
                        + Adicionar Objetivo
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default HierarquiaObjetivos;