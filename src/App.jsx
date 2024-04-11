import { useState, useEffect } from "react";
import { db, auth } from "./firebaseConnection";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

import { createUserWithEmailAndPassword } from "firebase/auth";

import "./app.css";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const atualizandoPostEmTempoReal = async () => {
      const atualiza = onSnapshot(collection(db, "posts"), (snapshot) => {
        let listaPosts = [];
        snapshot.forEach((doc) => {
          listaPosts.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          });

          setPosts(listaPosts);
        });
      });
    };

    atualizandoPostEmTempoReal();
  }, []);

  const handleAdd = async () => {
    // await setDoc(doc(db, "posts", "12345"), {
    //   autor: autor,
    //   titulo: titulo,
    // })
    //   .then(() => {
    //     alert("Dados registrados no banco");
    //   })
    //   .catch((err) => {
    //     console.log("GEROU ERRO!" + err);
    //   });

    await addDoc(collection(db, "posts"), {
      autor: autor,
      titulo: titulo,
    })
      .then(() => {
        alert("Dados registrados no banco");
        setAutor("");
        setTitulo("");
      })
      .catch((err) => {
        console.log("GEROU ERRO!" + err);
      });
  };

  const handleGet = async () => {
    // const ref = doc(db, "posts", "yKMNvkKL0psxqNdhC4Mm");

    // await getDoc(ref)
    //   .then((snapshot) => {
    //     setAutor(snapshot.data().autor);
    //     setTitulo(snapshot.data().titulo);
    //   })
    //   .catch((err) => {
    //     console.log("Nenhum post achado" + err);
    //   });

    const refPosts = collection(db, "posts");

    await getDocs(refPosts)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((post) => {
          lista.push({
            id: post.id,
            titulo: post.data().titulo,
            autor: post.data().autor,
          });
        });

        setPosts(lista);
      })
      .catch((err) => {
        console.log("Erro encontrado" + err);
      });
  };

  const editarPost = async () => {
    const ref = doc(db, "posts", id);

    await updateDoc(ref, {
      titulo: titulo,
      autor: autor,
    })
      .then(() => {
        alert("Atualizado com sucesso");
        setId("");
        setTitulo("");
        setAutor("");
      })
      .catch((err) => {
        console.log("erro " + err);
      });
  };

  const excluirPost = async (id) => {
    const ref = doc(db, "posts", id);

    await deleteDoc(ref)
      .then(() => {
        alert("Removido com sucesso");
      })
      .catch((err) => {
        alert("Erro para excluir: " + err);
      });
  };

  const novoUsuario = async () => {
    await createUserWithEmailAndPassword(auth, email, senha) //serve para cadastrar email e senha, vc passa o auth e o email e senha que quer cadastrar
      .then(() => {
        console.log("Cadastro feito com sucesso");
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          alert("Email já existente");
        } else if (err.code === "auth/weak-password") {
          alert("Senha muito fraca");
        }
      });
  };
  return (
    <div className="app">
      <h2>Firebase + react</h2>
      <div className="container">
        <h2>Usuários</h2>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Digite seu email"
        />
        <label>Senha</label>
        <input
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
          }}
          placeholder="Informe sua senha"
        />
        <br />
        <button onClick={novoUsuario}>Cadastrar</button>
      </div>
      <br /> <br />
      <hr />
      <div className="container">
        <h2>Posts</h2>
        <label>Id do post:</label>
        <input
          type="text"
          placeholder="Digite o id do post"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />

        <label>Titulo:</label>
        <textarea
          type="text"
          placeholder="Digite o titulo"
          value={titulo}
          onChange={(e) => {
            setTitulo(e.target.value);
          }}
        ></textarea>

        <label>Autor:</label>
        <input
          type="text"
          placeholder="Autor do post"
          value={autor}
          onChange={(e) => {
            setAutor(e.target.value);
          }}
        />
        <button onClick={handleAdd}>Cadastrar</button>
        <button onClick={handleGet}>Buscar Post</button>
        <button onClick={editarPost}>Atualizar post</button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>ID: {post.id}</strong> <br />
            <span>Titulo: {post.titulo}</span> <br />
            <span>Autor: {post.autor}</span> <br />
            <button onClick={() => excluirPost(post.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
