import { useHistory } from 'react-router-dom';

import illust from '../assets/images/illustration.svg';
import logoimg from '../assets/images/logo.svg';
import google from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';

export function Home() {
    const { user, signWithGoogle } = useAuth();

    const history = useHistory();

    async function handleCreteRoom() {
        if (!user) {
            await signWithGoogle();
        }
        history.push('rooms/new');
    }

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
                    <button className="create-room" onClick={handleCreteRoom}>
                        <img src={google} alt="Logo google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}