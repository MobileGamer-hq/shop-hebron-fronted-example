import {useState, useEffect} from 'react'
import './App.css'
import {auth, logOut, signIn, signUp} from "./firebase_backend_methods.js";
import { getUserById } from './api_calls.js';

function App() {
    const [signedIn, setSignedIn] = useState(false)
    const [user, setUser] = useState({});
    const [currentPage, setCurrentPage] = useState("Landing")


    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("")


    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(gotten => {
            getUserById(gotten.uid).then((data) => {
                setUser(data.user);
                console.log(data.user)
            }).catch((error) => {
                console.error(error);
            });
            if (user) {
                setSignedIn(true);
                
                
            }
        });

        return () => unsubscribe(); // Cleanup the listener when the component unmounts
    }, []);


    if (signedIn) {
        return (
            <>
                <h1>Shop Hebron</h1>
                <div>{user.name}</div>
                <div>{user.id}</div>
                <button onClick={() => logOut()}>LogOut</button>
            </>
        )
    }else{
        return (
            <>
                <h1>Shop Hebron</h1>
                {
                    currentPage === "Landing" ? (
                        <div>
                            <button onClick={() => setCurrentPage("SignUp")}>Sign Up</button>
                            <button onClick={() => setCurrentPage("SignIn")}>Sign In</button>
                        </div>

                    ) : currentPage === "SignUp" ? (
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                style={{
                                    padding: '10px',
                                    marginBottom: '10px',
                                    width: '100%',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                }}
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    padding: '10px',
                                    marginBottom: '10px',
                                    width: '100%',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                }}
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    padding: '10px',
                                    marginBottom: '10px',
                                    width: '100%',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                }}
                            />
                            <input
                                type="text"
                                placeholder="Role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                                style={{
                                    padding: '10px',
                                    marginBottom: '10px',
                                    width: '100%',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                }}
                            />
                            <button onClick={() => signUp(username, email, password, role)}>Sign Up</button>
                            <button onClick={() => setCurrentPage("SignIn")}>Go To Sign In</button>
                        </div>
                    ) : currentPage === "SignIn" ? (
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    padding: '10px',
                                    marginBottom: '10px',
                                    width: '100%',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                }}
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    padding: '10px',
                                    marginBottom: '10px',
                                    width: '100%',
                                    borderRadius: '4px',
                                    border: '1px solid #ccc',
                                }}
                            />
                            <button onClick={() => signIn(email, password)}>Sign In</button>
                            <button onClick={() => setCurrentPage("SignUp")}>Go To Sign Up</button>
                        </div>
                    ) : null
                }

            </>
        )
    }
}

export default App
