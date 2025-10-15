# API CRUD Simples com PostgreSQL

Uma API REST simples com operações CRUD completas (Criar, Ler, Atualizar, Deletar) construída com FastAPI, PostgreSQL e documentação interativa automática.

## Funcionalidades

- ✅ **Criar** novos items
- ✅ **Ler** todos os items ou um item específico por ID
- ✅ **Atualizar** items existentes
- ✅ **Deletar** items
- ✅ **Documentação automática** (Swagger UI e ReDoc)
- ✅ **Validação de dados** com Pydantic
- ✅ **Banco de dados PostgreSQL**
- ✅ **Docker e Docker Compose** para fácil execução
- ✅ **Sem autenticação necessária**

## Requisitos

- Docker
- Docker Compose

## Instalação e Execução

### Usando Docker Compose (Recomendado)

1. Clone o repositório e navegue até o diretório:

```bash
cd /home/mateus/Projects/univates/tecnico/MOBILE/api
```

2. Inicie os containers:

```bash
docker-compose up -d
```

Isso irá:
- Criar e iniciar um container PostgreSQL
- Criar e iniciar o container da API
- Criar automaticamente as tabelas no banco de dados

3. A API estará disponível em: `http://localhost:8000`

4. Para parar os containers:

```bash
docker-compose down
```

5. Para parar e remover os dados do banco:

```bash
docker-compose down -v
```

### Instalação Local (Alternativa)

Se preferir executar localmente sem Docker:

1. Instale as dependências Python:

```bash
pip install -r requirements.txt
```

2. Configure a variável de ambiente do banco de dados:

```bash
export DATABASE_URL="postgresql://user:password@localhost:5432/crud_db"
```

3. Certifique-se de ter o PostgreSQL rodando localmente

4. Execute a aplicação:

```bash
python main.py
```

## Documentação da API

Após iniciar o servidor, você pode acessar a documentação interativa:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

Essas interfaces permitem testar todos os endpoints da API diretamente do navegador!

## Endpoints da API

### Raiz
- `GET /` - Mensagem de boas-vindas com informações da API

### Items (Operações CRUD)

#### Criar
- `POST /items` - Criar um novo item
  - Body: `{"name": "string", "description": "string", "price": 0.0}`

#### Ler
- `GET /items` - Obter todos os items
- `GET /items/{item_id}` - Obter um item específico por ID

#### Atualizar
- `PUT /items/{item_id}` - Atualizar um item existente
  - Body: `{"name": "string", "description": "string", "price": 0.0}` (todos os campos opcionais)

#### Deletar
- `DELETE /items/{item_id}` - Deletar um item por ID

## Exemplos de Uso

### Usando curl

**Criar um item:**
```bash
curl -X POST "http://localhost:8000/items" \
  -H "Content-Type: application/json" \
  -d '{"name": "Notebook", "description": "Notebook gamer", "price": 4999.99}'
```

**Obter todos os items:**
```bash
curl -X GET "http://localhost:8000/items"
```

**Obter um item específico:**
```bash
curl -X GET "http://localhost:8000/items/1"
```

**Atualizar um item:**
```bash
curl -X PUT "http://localhost:8000/items/1" \
  -H "Content-Type: application/json" \
  -d '{"price": 4599.99}'
```

**Deletar um item:**
```bash
curl -X DELETE "http://localhost:8000/items/1"
```

## Modelo de Dados

Cada item possui a seguinte estrutura:

```json
{
  "id": 1,
  "name": "Nome do item",
  "description": "Descrição do item (opcional)",
  "price": 99.99,
  "created_at": "2025-10-15T19:22:00"
}
```

## Estrutura do Projeto

```
.
├── main.py              # Aplicação FastAPI principal
├── requirements.txt     # Dependências Python
├── Dockerfile          # Configuração Docker da API
├── docker-compose.yml  # Orquestração dos containers
└── README.md           # Este arquivo
```

## Tecnologias Utilizadas

- **FastAPI** - Framework web moderno e rápido
- **PostgreSQL** - Banco de dados relacional
- **SQLAlchemy** - ORM para Python
- **Pydantic** - Validação de dados
- **Docker** - Containerização
- **Uvicorn** - Servidor ASGI

## Configuração do Banco de Dados

O banco de dados PostgreSQL é configurado através do Docker Compose com as seguintes credenciais padrão:

- **Usuário**: user
- **Senha**: password
- **Banco**: crud_db
- **Porta**: 5432

Para alterar essas configurações, edite o arquivo `docker-compose.yml`.

## Logs e Debugging

Para ver os logs da aplicação:

```bash
docker-compose logs -f api
```

Para ver os logs do banco de dados:

```bash
docker-compose logs -f db
```

## Notas

- Os dados são persistidos no volume Docker `postgres_data`
- A API usa validação automática de dados via Pydantic
- Todos os endpoints retornam códigos de status HTTP apropriados
- Sem autenticação necessária para nenhum endpoint
- A API suporta hot-reload durante o desenvolvimento
