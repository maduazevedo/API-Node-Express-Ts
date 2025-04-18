# API de Cadastro e Gestão de Atividades

#### Este projeto é uma API que permite o cadastro de usuários e a criação, inscrição e gerenciamento de atividades. Os usuários podem selecionar interesses, participar de atividades ou criá-las e acompanhar seu progresso com XP e conquistas.

## Como interagir com a API? 

1. Abra a pasta `backend` no seu terminal.
2. Execute o comando abaixo para construir e iniciar os containers no **docker**:

   ```bash
   docker-compose up --build

3. Aguarde até que os containers estejam totalmente iniciados e acesse a **documentação da API no Swagger** em: http://localhost:3000/docs

## Tipos de atividades existentes:

- Natação
- Ciclismo
- Musculação
- Yoga
- Corrida

## Achievements, level e XP:

1. Os Achievements são conquistados da seguinte forma: 

- Ao **alterar a foto de perfil** pela primeira vez
- Ao **criar atividade** pela primeira vez
- Ao fazer **check-in na atividade** pela primeira vez
2. O ganho de XPs e aumento de nível funcionam da seguinte maneira:
- Quando um usuário confirma a sua presença em uma atividade, isto é , faz **check-in**, o seu **XP aumenta em 5, o do criador da atividade aumenta em 5.**  Cada um deles aumenta o nível em + 1 unidade a cada dezena de XP conquistada (2X consquista de XP).

## Requisitos Atendidos

#### A API conseguiu atender os seguintes requisitos:

### 1. Autenticação
- ✅ Cadastro com nome, e-mail, CPF e senha.
- ✅ E-mail e CPF únicos no banco de dados.
- ✅ Senha criptografada antes de ser salva.
- ✅ Login com e-mail e senha corretos.
- ✅ Endpoints protegidos exigem token de autenticação.

### 2. Gestão de Usuários
- ✅ Usuário pode editar nome, e-mail, senha e foto de perfil.
- ✅ Foto de perfil padrão atribuída até o upload de uma imagem.
- ✅ Usuário pode definir e alterar interesses.
- ✅ Usuário pode desativar a conta (soft delete).
- ✅ Usuário ganha XP e sobe de nível.
- ✅ Usuário recebe conquistas/medalhas por ações específicas.

### 3. Atividades
- ✅ Usuário pode criar atividades (título, descrição, tipo, imagem, data, local e visibilidade).
- ✅ Usuário pode visualizar e se inscrever em atividades.
- ✅ Usuário pode cancelar inscrição em atividades.
- ✅ Filtro de atividades por tipo ou por interesses predefinidos do usuário.
- ✅ Inscrição em atividades privadas deve ser aprovada pelo criador.
- ✅ Criador pode editar, excluir (soft delete) e concluir atividades.
- ✅ Participantes podem fazer check-in com código de confirmação e ganham XP.
- ✅ Criador pode concluir a atividade, bloqueando novas inscrições.

### Observação sobre filtro de atividades:

- Quando um usuário nao indica um filtro, os endpoints que possuem filtro trazem as atvidades prioritariamente pelas preferências definidas. Dessa maneira, algumas atividades cadastradas fora da escala de tipo preferidos pelo usuário não aparecem ao menos que o seu tipo seja escolhido no filtro que o usuário passar. Caso o usuário não tenha preferências e filtros não forem passados, o endpoint retorna todas as atividades disponíveis.

## Exceções adicionais mapeadas

#### **Além das exceções E1, E2, E3... E19, foram mapeadas EXCEÇÕES ADICIONAIS**

```plaintext
- error: Você só pode permitir a participação de usuários em atividades privadas
- error: Você não se inscreveu nessa atividade
- error: Um ou mais ID's informados são inválidos.
- error: Atividade não encontrada
- error: Participante não encontrado
- error: Erro ao criar endereço
- error: Você já concluiu essa atividade
- error: Endereço inválido
```

### **Endpoints**

#### **1. Auntenticação**

### `POST /auth/register` - Cria um novo user
### `POST /auth/sign-in` - Permite o login do user

#### **1. Usuários**

### `GET /user` - Busca dados do usuário
### `GET /user/preferences` - Busca interesses do usuário
### `POST /user/preferences/define` - Define interesses do usuário
### `PUT /user/avatar` - Editar foto de perfil do usuário 
### `PUT /user/update` - Editar dados do usuário
### `DELETE /auth/deactivate` - Desativar conta do usuário

#### **1. Usuários**

### `GET /activities/types` - Listar tipos de atividades
### `GET /activities` - Listar atividades com paginação, filtro por tipo e ordenação
### `GET /activities/all` - Listar todas as atividades com filtro por tipo e ordenação
### `GET /activities/user/creator` - Buscar atividades criadas pelo usuário
### `GET /activities/user/creator/all` - Buscar todas as atividades criadas pelo usuário
### `GET /activities/user/participant` - Buscar atividades em que o usuário se inscreveu
### `GET /activities/user/participant/all` - Buscar todas as atividades em que o usuário se inscreveu
### `GET /activities/id/participants` - Buscar participantes de uma atividade
### `POST /activities/new` - Criar atividade
### `POST /activities/id/subscribe` - Inscrever-se em uma atividade
### `PUT /activities/id/update` - Editar uma atividade existente
### `PUT /activities/id/conclude` - Concluir uma atividade
### `PUT /activities/id/approve` - Aprovar ou negar inscrição de participante em uma atividade privada
### `PUT /activities/id/check-in` - Fazer check-in em uma atividade usando código de confirmação
### `DELETE /activities/id/unsubscribe` - Cancelar a inscrição do usuário em uma atividade
### `DELETE /activities/id/delete` - Excluir uma atividade existente



## 5. **Validações e Erros**

- **E1:** Informe os campos obrigatórios corretamente.
- **E2:** A imagem deve ser um arquivo PNG ou JPG.
- **E3:** O e-mail ou CPF informado já pertence a outro usuário.
- **E4:** Usuário não encontrado.
- **E5:** Senha incorreta.
- **E6:** Esta conta foi desativada e não pode ser utilizada.
- **E7:** Você já se registrou nesta atividade.
- **E8:** O criador da atividade não pode se inscrever como um participante.
- **E9:** Apenas participantes aprovados na atividade podem fazer check-in.
- **E10:** Código de confirmação incorreto.
- **E11:** Você já confirmou sua participação nesta atividade.
- **E12:** Não é possível se inscrever em uma atividade concluída.
- **E13:** Não é possível confirmar presença em uma atividade concluída.
- **E14:** Apenas o criador da atividade pode editá-la.
- **E15:** Apenas o criador da atividade pode excluí-la.
- **E16:** Apenas o criador da atividade pode aprovar ou negar participantes.
- **E17:** Apenas o criador da atividade pode concluí-la.
- **E18:** Não é possível cancelar sua inscrição, pois sua presença já foi confirmada.
- **E19:** Autenticação necessária.
