SQLite - API Com Node
1. Introdução ao SQLite e Conceitos Fundamentais
• O que é SQLite?
• SQLite é um sistema de gerenciamento de banco de dados leve e autossuficiente, ideal
para aplicações que precisam de um banco de dados embarcado e fácil de usar.
• Ele é amplamente utilizado em desenvolvimento de apps móveis, aplicações web e
protótipos devido à sua simplicidade e baixa sobrecarga.
• Vantagens do SQLite:
• Simplicidade na configuração e uso; não requer um servidor de banco de dados separado.
• Banco de dados baseado em arquivo, o que facilita o transporte e uso em dispositivos
diferentes.
• Suporte a operações transacionais e integridade dos dados.
• Desvantagens do SQLite:
• Não é recomendado para aplicações que requerem escalabilidade com grandes volumes
de dados ou alta simultaneidade.
• Focado em operações locais; não possui um sistema de cliente-servidor.
• Casos de uso comuns em desenvolvimento web:
• Protótipos e desenvolvimento de APIs locais.
• Persistência de dados em aplicativos de desktop.
• Aplicações de baixa complexidade que precisam de um banco de dados fácil de
configurar.
2. Estrutura e Integração do SQLite com uma API em TypeScript
Para demonstrar como integrar o SQLite com uma API em TypeScript, vamos utilizar uma
arquitetura modular seguindo as boas práticas que você mencionou.
Estrutura da API
Estrutura de pastas:

3. Exemplo Prático: Criação de uma API com SQLite
Vamos criar uma API simples que permite o gerenciamento de usuários (CRUD - Create,
Read, Update, Delete) em um banco de dados SQLite. Este exemplo focará no módulo
auth, que lida com usuários.
Passo 1: Configuração Inicial
Primeiro, vamos criar o projeto e instalar as dependências necessárias.

Crie o arquivo tsconfig.json para configurar o TypeScript:

Passo 2: Estrutura dos Arquivos
Arquivo principal index.ts
/src
├── index.ts # Arquivo de entrada principal da API
├── router.controller.ts # Controlador das rotas da API
├── @types # Pasta para armazenar os tipos de dados
│ └── user.d.ts # Tipos do módulo 'User'
└── modules # Módulos de serviço da API
└── auth # Módulo de autenticação
├── auth.controller.ts
├── auth.service.ts
└── auth.model.ts # Modelo do banco de dados SQLite para 'Auth'

mkdir my-api
cd my-api
npm init -y
npm install express sqlite3 typescript ts-node @types/express --save

{
"compilerOptions": {
"target": "es6",
"module": "commonjs",
"strict": true,
"esModuleInterop": true,
"outDir": "./dist"
},
"include": ["src/**/*"]
}

Roteador principal router.controller.ts

Módulo auth
Definição de Tipos @types/user.d.ts

Arquivo de Modelo auth.model.ts
Aqui vamos definir a conexão com o SQLite e os métodos de manipulação de dados:
import express from 'express';
import { router } from './router.controller';
const app = express();
app.use(express.json());
app.use('/api', router);
app.listen(3000, () => {
console.log('API is running on http://localhost:3000');
});

import { Router } from 'express';
import { authRouter } from './modules/auth/auth.controller';
export const router = Router();
router.use('/auth', authRouter);

export interface User {
id: number;
username: string;
password: string;
}

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { User } from '../../@types/user';
const dbPromise = open({
filename: './database.db',
driver: sqlite3.Database
});
export const authModel = {
async initialize() {
const db = await dbPromise;
await db.exec(`

Serviço auth.service.ts
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
username TEXT,
password TEXT
)
`);
},
async createUser(user: User) {
const db = await dbPromise;
const result = await db.run('INSERT INTO users (username, password)
VALUES (?, ?)', [user.username, user.password]);
return { id: result.lastID, ...user };
},
async getUser(id: number) {
const db = await dbPromise;
return db.get<User>('SELECT * FROM users WHERE id = ?', [id]);
},
async getAllUsers() {
const db = await dbPromise;
return db.all<User[]>('SELECT * FROM users');
},
async deleteUser(id: number) {
const db = await dbPromise;
return db.run('DELETE FROM users WHERE id = ?', [id]);
}
};

import { authModel } from './auth.model';
import { User } from '../../@types/user';

export const authService = {
async register(user: User) {
return authModel.createUser(user);
},
async findUser(id: number) {
return authModel.getUser(id);
},
async listUsers() {
return authModel.getAllUsers();
},
async removeUser(id: number) {
return authModel.deleteUser(id);

Controlador auth.controller.ts
}
};

import { Router, Request, Response } from 'express';
import { authService } from './auth.service';
export const authRouter = Router();
authRouter.post('/register', async (req: Request, res: Response) => {
const user = await authService.register(req.body);
res.json(user);
});
authRouter.get('/:id', async (req: Request, res: Response) => {
const user = await authService.findUser(Number(req.params.id));
user ? res.json(user) : res.status(404).send('User not found');
});
authRouter.get('/', async (_req: Request, res: Response) => {
const users = await authService.listUsers();
res.json(users);
});
authRouter.delete('/:id', async (req: Request, res: Response) => {
await authService.removeUser(Number(req.params.id));
res.status(204).send();



