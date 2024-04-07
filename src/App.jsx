import { useState } from "react";
import { db } from "./firebaseConnection";
import { doc, setDoc, collection, addDoc, getDoc, getDocs } from "firebase/firestore";

import "./app.css";

function App() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [posts, setPosts] = useState([]);

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

    await getDocs(refPosts).then((snapshot)=>{
      let lista = [];

      snapshot.forEach((post)=>{
        lista.push({
          id: post.id,
          titulo: post.data().titulo,
          autor: post.data().autor,
        })
      })

      set
    }).catch((err)=>{
      console.log("Erro encontrado" + err);
    })
  };

  return (
    <div>
      <h2>Firebase + react</h2>

      <div className="container">
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
      </div>
    </div>
  );
}

export default App;
