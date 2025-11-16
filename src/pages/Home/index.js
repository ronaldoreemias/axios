import React, { useState, useEffect } from "react";
import style from "./Home.module.css";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async handleSubmit(event) {
    alert('Um email foi enviado: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form className={style.form} onSubmit={this.handleSubmit}>
        <div>
            <h3>Newsletter</h3>
            <div className={style.linha}></div>
        </div>
        <p>Receba as últimas novidades do mundo tech diretamente no seu email</p>
        <label>
          <input type="text" className={style.inputtexto} placeholder="digite seu melhor Email..." value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" className={style.botaoenviar} value="inscrever-se" />
      </form>
    );
  }
}


function Home() {
  const [postagensSemFoto, setPostagensSemFoto] = useState([]);
  const [postagensComFoto, setPostagensComFoto] = useState([]);

  useEffect(() => {
    fetch('/Dbjason/Postagenssemfoto.json')
      .then((response) => response.json())
      .then((dados) => setPostagensSemFoto(dados));
  }, []);

  useEffect(() => {
    fetch('/Dbjason/Postagemcomfotos.json')
      .then((response) => response.json())
      .then((dados) => setPostagensComFoto(dados));
  }, []);


    return (
        <main className={style.mainHome}>
            <Navbar />
            <br/>
            <div className={style.banner}>
                <h1>Sua rede de tecnologia</h1>
                <br/>
                <p>As últimas novidades, análises e dicas do mundo tech</p>
            </div>
            <br/>
            <div className={style.postagens}>
                <div className={style.containercentro}>
                    <div className={style.headercentro}>
                        <h2>informações do sistema</h2>
                        <div className={style.Postagenssemfoto}>
                            {postagensSemFoto.map(postagem => (
                                <div key={postagem.id} className={style.postagemSemFoto}>
                                    <h3>{postagem.titulo}</h3>
                                    <div className={style.data}>{postagem.data}</div>
                                    <p className={style.resumo}>{postagem.resumo}</p>
                                    {postagem.link && (
                                        <a 
                                            href={postagem.link} 
                                            className={style.lerMais}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Ler mais →
                                        </a>
                                    )}
                                     <br/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={style.menucentro}>
                        <h2>Publicações</h2>
                        <div className={style.Postagemcomfotos}>
                            {postagensComFoto.map(postagem => (
                                <div key={postagem.id} className={style.postagemComFoto}>
                                    <img src={postagem.imagem} alt={postagem.titulo} />
                                    <div className={style.conteudo}>
                                        <h3>{postagem.titulo}</h3>
                                        <div className={style.data}>{postagem.data}</div>
                                        <p className={style.resumo}>{postagem.resumo}</p>
                                        {postagem.link && (
                                            <a 
                                                href={postagem.link} 
                                                className={style.lerMais}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Ler mais →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={style.contentcentro}>
                        <div className={style.sobre}>
                            <h3>Sobre o Site</h3>
                            <div className={style.linha}></div>
                            <br/>
                            <p>O blog Love Tecno traz as últimas novidades, 
                                análises e dicas sobre tecnologia,
                                com foco em produtos eletrônicos e tendências do mercado.

                                Nossa missão é ajudar você a 
                                fazer as melhores escolhas 
                                tecnológicas.</p>
                        </div>
                        <br/>
                        <NameForm />
                    </div>
                </div>
            </div>  
            <br/> 
            <Footer />         
        </main>
    );
}

export default Home;