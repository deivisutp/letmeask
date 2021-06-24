import { Link } from 'react-router-dom';

import illust from '../assets/images/illustration.svg';
import logoimg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function NewRoom() {
    const { user } = useContext(AuthContext);

    return (
        <div id="page-auth">
            <aside>
                <img src={illust} alt="Ilustração perguntas e respostas" />
                <strong>Crie salas de Q&amo;A ao vivo</strong>
                <p>Tire as dúvidas de sua audiência em tempo real</p>
            </aside>
            <main className="main-content">
                <div>
                    <img src={logoimg} alt="letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}