import { createContext, useState, useEffect, ReactNode } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
    id: string;
    name: string;
    avatar: string;
}
type AuthContextTupe = {
    user: User | undefined;
    signWithGoogle: () => Promise<void>;
}

type AuthProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextTupe);

export function AuthContextProvider(props: AuthProps) {
    const [user, setUser] = useState<User>();

    async function signWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await auth.signInWithPopup(provider);

        if (result.user) {
            const { displayName, photoURL, uid } = result.user;

            if (!displayName || !photoURL) {
                throw new Error("Missing information from google account.");
            }

            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            });
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user;

                if (!displayName || !photoURL) {
                    throw new Error("Missing information from google account.");
                }

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                });
            }
        })

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, signWithGoogle }}>
            {props.children}
        </AuthContext.Provider>

    );
}