import React, { useState } from 'react';
import HierarquiaObjetivos from './HierarquiaObjetivos';
import '../styles/MenuLateral.css'

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
        <div className="container">
            <div className="menu">
                <h2 className="menu-title">Maneja</h2>
                <ul className="menu-lista">
                    {departamentos.map((dep) => (
                        <li key={dep.id} className="departamento-item">
                            <span
                                className="departamento-nome"
                                onClick={() => selecionarDepartamento(dep)}
                            >
                                {dep.nome}
                            </span>
                        </li>
                    ))}
                    <li className="adicionar-departamento">
                        <input
                            type="text"
                            value={novoDepartamento}
                            onChange={(e) => setNovoDepartamento(e.target.value)}
                            className="input-departamento"
                            placeholder="Novo departamento"
                        />
                        <button
                            onClick={adicionarDepartamento}
                            className="botao-adicionar"
                        >
                            + Adicionar Departamento
                        </button>
                    </li>
                </ul>
            </div>
            {departamentoSelecionado && (
                <div className="objetivos">
                    <h2 className="objetivos-titulo">{departamentoSelecionado.nome}</h2>
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