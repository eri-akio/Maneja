import React, { useState } from 'react';
import './App.css';

const HierarquiaObjetivos = () => {
    const [visibilidade, setVisibilidade] = useState({});
    const [acoes, setAcoes] = useState(["➡️ Ação 1.1.1", "➡️ Ação 1.1.2"]);
    const [novaAcao, setNovaAcao] = useState("");

    const toggle = (id) => {
        setVisibilidade((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const adicionarAcao = () => {
        if (novaAcao.trim() !== "") {
            setAcoes((prev) => [...prev, `➡️ ${novaAcao}`]);
            setNovaAcao("");
        }
    };

    return (
        <div className="p-4">
            <ul className="list-none">
                <li>
                    <span className="cursor-pointer text-blue-600" onClick={() => toggle("sub1")}>📌 Objetivo 1</span>
                    {visibilidade["sub1"] && (
                        <ul className="ml-4">
                            <li>
                                <span className="cursor-pointer text-blue-600" onClick={() => toggle("acao1")}>✅ Subobjetivo 1.1</span>
                                {visibilidade["acao1"] && (
                                    <ul className="ml-8">
                                        {acoes.map((acao, index) => (
                                            <li key={index}>{acao}</li>
                                        ))}
                                        <li className="mt-2">
                                            <input 
                                                type="text" 
                                                value={novaAcao} 
                                                onChange={(e) => setNovaAcao(e.target.value)} 
                                                className="p-2 border rounded mr-2"
                                                placeholder="Nova ação"
                                            />
                                            <button 
                                                onClick={adicionarAcao} 
                                                className="p-2 bg-blue-500 text-white rounded"
                                            >
                                                + Adicionar Ação
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </li>
                        </ul>
                    )}
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
