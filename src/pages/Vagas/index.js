import style from "./Vagas.module.css";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { useState, useEffect } from "react";

function Vagas() {
    const [filtros, setFiltros] = useState({
        tipoContrato: {
            Freelancer: false,
            PJ: false,
            CLT: true,
            estagio: false
        },
        areaAtuacao: {
            "Front-end": false,
            "Back-end": false,
            Fullstack: true,
            "Banco de dados": false,
            "Suporte de T.I": false,
            HELP: false,
            "Tecnico de informatica": false,
            "Ciber Securite": false
        }
    });

    const [termoBusca, setTermoBusca] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    // Detecta se está em mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleFiltroChange = (categoria, filtro) => {
        setFiltros(prev => ({
            ...prev,
            [categoria]: {
                ...prev[categoria],
                [filtro]: !prev[categoria][filtro]
            }
        }));
    };

    const handleSubmitFiltros = (e) => {
        e.preventDefault();
        
        const dadosFiltros = {
            tiposContrato: Object.keys(filtros.tipoContrato).filter(key => filtros.tipoContrato[key]),
            areasAtuacao: Object.keys(filtros.areaAtuacao).filter(key => filtros.areaAtuacao[key]),
            termoBusca: termoBusca
        };

        console.log("Dados para enviar ao backend:", dadosFiltros);
        // Aqui você faria a chamada para o backend
        // Exemplo: api.buscarVagas(dadosFiltros)
    };

    const handleBuscaSubmit = (e) => {
        e.preventDefault();
        handleSubmitFiltros(e);
    };

    return(
        <>
            <Navbar />
            <br/>
            <br/>
            <br/>
            <main className={style.Vagasmain}>
                {!isMobile && (
                    <div className={style.barradefiltragemlateral}>
                        <form onSubmit={handleSubmitFiltros}>
                            <h3>Tipo de Contrato</h3>
                            {Object.keys(filtros.tipoContrato).map(tipo => (
                                <div key={tipo} className={style.checkboxGroup}>
                                    <input 
                                        type="checkbox" 
                                        id={`contrato-${tipo}`}
                                        checked={filtros.tipoContrato[tipo]}
                                        onChange={() => handleFiltroChange('tipoContrato', tipo)}
                                    />
                                    <label htmlFor={`contrato-${tipo}`}>{tipo}</label>
                                </div>
                            ))}

                            <h3>Área de Atuação</h3>
                            {Object.keys(filtros.areaAtuacao).map(area => (
                                <div key={area} className={style.checkboxGroup}>
                                    <input 
                                        type="checkbox" 
                                        id={`area-${area}`}
                                        checked={filtros.areaAtuacao[area]}
                                        onChange={() => handleFiltroChange('areaAtuacao', area)}
                                    />
                                    <label htmlFor={`area-${area}`}>{area}</label>
                                </div>
                            ))}
                            
                            <button type="submit" className={style.botaoFiltrar}>
                                Filtrar
                            </button>
                        </form>
                    </div>
                )}

                <div className={style.areadevagas}>
                    <div className={style.barradebusdevaga}>
                        <form onSubmit={handleBuscaSubmit}>
                            <input 
                                type="text" 
                                placeholder="Digite a vaga que procura"
                                value={termoBusca}
                                onChange={(e) => setTermoBusca(e.target.value)}
                            />
                            <button type="submit">Procurar</button>
                        </form>
                    </div>

                    <div className={style.ondevaificarasvagas}>
                        {/* Área onde as vagas serão listadas */}
                        
                    </div>
                </div>
            </main>
            <br/>
            <Footer />
        </>
    );
}

export default Vagas;