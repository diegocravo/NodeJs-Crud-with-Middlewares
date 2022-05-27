const express = require("express");

// Query Params = ?node=NodeJs
// Route Params = /curso/2
// Request Body = {Nome = 'Diego', Tipo = 'Desenvolvedor'}

const server = express();

server.use(express.json());

const cursos = ["Javscript", "Node", "React", "React native"];

// Middleware Global
server.use((req, res, next) => {
  console.log(`URL Chamada: ${req.url}`);

  return next();
});

const checkCurso = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Nome do curso é obrigatório" });
  }
  return next();
};

const checkIndexCurso = (req, res, next) => {
  const curso = cursos[req.params.index];

  if (!curso) {
    return res.status(400).json({ error: "O usuário não existe" });
  }
  return next();
};

// localhost:3000/curso
server.get("/cursos", (req, res) => {
  return res.json(cursos);
});

server.get("/cursos/:index", checkIndexCurso, (req, res) => {
  const { index } = req.params;

  return res.json(cursos[index]);
});

// Criando um novo curso
server.post("/cursos", checkCurso, (req, res) => {
  const { name } = req.body;

  cursos.push(name);

  return res.json(cursos);
});

// Atualizando um curso
server.put("/cursos/:index", checkCurso, checkIndexCurso, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  cursos[index] = name;

  return res.json(cursos);
});

// Excluindo um curso
server.delete("/cursos/:index", checkIndexCurso, (req, res) => {
  const { index } = req.params;

  cursos.splice(index, 1);

  return res.json({ message: "Curso deletado com sucesso!" });
});

server.listen(3000);
