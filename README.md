# SocialMediaAPI

Bem-vindo ao projeto! Este projeto é uma API para uma rede social simples, permitindo a criação de usuários, posts e interações básicas entre eles.

## Funcionalidades Principais

1. **Cadastro de Usuários:**
   - Os usuários podem se cadastrar na plataforma fornecendo informações básicas.

2. **Autenticação JWT:**
   - Utilização de tokens JWT para autenticação segura dos usuários.

3. **Criação de Posts:**
   - Os usuários autenticados podem criar posts, contendo texto e, opcionalmente, imagens.

4. **Exclusão de Usuários e Posts Associados:**
   - Exclusão de usuários resulta na exclusão automática de todos os posts associados a esse usuário.
     
5. **Criação de avisos:**
   - Criação de avisos que podem ser usados na fase beta da rede social.

6. **Criação do sistema de moderação:**
   - Apagar posts que possam ferir pessoas/leis
   - Criação de avisos   
7. **Central de notificações para usuários:**
   - Criação de schema que controla o tipo de notificação ['follow', 'like', 'comment']
   - Mudança de status da leitura de notificações pelo usuário   

## Estrutura do Projeto

- **controllers:** Lógica de controle da aplicação.
- **middlewares:** Funções intermediárias para processar solicitações HTTP.
- **models:** Modelos de dados para interação com o banco de dados MongoDB.
- **routes:** Definição de rotas da API.
- **services:** Lógica de negócios e interação com o banco de dados.

## Configuração

1. **Instalação de Dependências:**
   ```bash
   npm install

## End Points
- **/user**
- **/auth**
- **/post**
- **/mod**
- **/warning**
- **/notification**
   
