import React, { useState } from 'react';
import '../styles/HierarquiaObjetivos.css'

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
        <div className="hierarquia-container">
            <ul className="objetivo-lista">
                {objetivos.map((obj) => (
                    <li key={obj.id} className="objetivo-item">
                        <span className="objetivo-titulo" onClick={() => toggle(obj.id)}>
                            {visibilidade[obj.id] ? "▼" : "▶"} {obj.nome}
                        </span>
                        {visibilidade[obj.id] && (
                            <ul className="subobjetivo-lista">
                                {obj.subobjetivos.map((sub) => (
                                    <li key={sub.id} className="subobjetivo-item">
                                        <span className="subobjetivo-titulo" onClick={() => toggle(sub.id)}>
                                            {visibilidade[sub.id] ? "▼" : "▶"} {sub.nome}
                                        </span>
                                        {visibilidade[sub.id] && (
                                            <ul className="acao-lista">
                                                {sub.acoes.map((acao) => (
                                                    <li key={acao.id} className="acao-item">
                                                        <span className="acao-titulo">
                                                            • {acao.nome}
                                                        </span>
                                                    </li>
                                                ))}
                                                <li className="adicionar-acao">
                                                    <input
                                                        type="text"
                                                        value={novaAcao[sub.id] || ""}
                                                        onChange={(e) =>
                                                            setNovaAcao((prev) => ({ ...prev, [sub.id]: e.target.value }))
                                                        }
                                                        className="input-acao"
                                                        placeholder="Nova ação"
                                                    />
                                                    <button
                                                        onClick={() => adicionarAcao(sub.id, obj.id)}
                                                        className="adicionar-acao-btn"
                                                    >
                                                        + Adicionar Ação
                                                    </button>
                                                </li>
                                            </ul>
                                        )}
                                    </li>
                                ))}
                                <li className="adicionar-subobjetivo">
                                    <input
                                        type="text"
                                        value={novoSubobjetivo[obj.id] || ""}
                                        onChange={(e) =>
                                            setNovoSubobjetivo((prev) => ({ ...prev, [obj.id]: e.target.value }))
                                        }
                                        className="input-subobjetivo"
                                        placeholder="Novo subobjetivo"
                                    />
                                    <button
                                        onClick={() => adicionarSubobjetivo(obj.id)}
                                        className="adicionar-subobjetivo-btn"
                                    >
                                        + Adicionar Subobjetivo
                                    </button>
                                </li>
                            </ul>
                        )}
                    </li>
                ))}
                <li className="adicionar-objetivo">
                    <input
                        type="text"
                        value={novoObjetivo}
                        onChange={(e) => setNovoObjetivo(e.target.value)}
                        className="input-objetivo"
                        placeholder="Novo objetivo"
                    />
                    <button
                        onClick={() => {
                            adicionarObjetivo(departamentoId, novoObjetivo);
                            setNovoObjetivo("");
                        }}
                        className="adicionar-objetivo-btn"
                    >
                        + Adicionar Objetivo
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default HierarquiaObjetivos;