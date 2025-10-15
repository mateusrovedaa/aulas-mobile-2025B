from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import os

# Configuração do banco de dados
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://roveda:roveda%2025@db:5432/crud_db")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Modelo do banco de dados
class ItemDB(Base):
    __tablename__ = "items"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    price = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.now)

# Criar tabelas
Base.metadata.create_all(bind=engine)

# Modelos Pydantic
class Item(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    created_at: datetime
    
    class Config:
        from_attributes = True

class ItemCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float

class ItemUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None

# Dependência para obter a sessão do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Aplicação FastAPI
app = FastAPI(
    title="API CRUD",
    description="API REST com operações CRUD usando PostgreSQL",
    version="1.0.0"
)

@app.get("/", tags=["Raiz"])
def read_root():
    """
    Endpoint de boas-vindas com informações da API
    """
    return {
        "mensagem": "Bem-vindo à API CRUD Simples",
        "documentacao": "/docs",
        "redoc": "/redoc"
    }

@app.post("/items", response_model=Item, status_code=201, tags=["Items"])
def criar_item(item: ItemCreate, db: Session = Depends(get_db)):
    """
    Criar um novo item
    
    - **name**: Nome do item (obrigatório)
    - **description**: Descrição do item (opcional)
    - **price**: Preço do item (obrigatório)
    """
    db_item = ItemDB(
        name=item.name,
        description=item.description,
        price=item.price,
        created_at=datetime.now()
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@app.get("/items", response_model=List[Item], tags=["Items"])
def listar_items(db: Session = Depends(get_db)):
    """
    Recuperar todos os items
    
    Retorna uma lista com todos os items do banco de dados
    """
    items = db.query(ItemDB).all()
    return items

@app.get("/items/{item_id}", response_model=Item, tags=["Items"])
def obter_item(item_id: int, db: Session = Depends(get_db)):
    """
    Recuperar um item específico por ID
    
    - **item_id**: O ID do item a ser recuperado
    """
    item = db.query(ItemDB).filter(ItemDB.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail=f"Item com id {item_id} não encontrado")
    return item

@app.put("/items/{item_id}", response_model=Item, tags=["Items"])
def atualizar_item(item_id: int, item_update: ItemUpdate, db: Session = Depends(get_db)):
    """
    Atualizar um item existente
    
    - **item_id**: O ID do item a ser atualizado
    - **name**: Novo nome (opcional)
    - **description**: Nova descrição (opcional)
    - **price**: Novo preço (opcional)
    """
    item = db.query(ItemDB).filter(ItemDB.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail=f"Item com id {item_id} não encontrado")
    
    if item_update.name is not None:
        item.name = item_update.name
    if item_update.description is not None:
        item.description = item_update.description
    if item_update.price is not None:
        item.price = item_update.price
    
    db.commit()
    db.refresh(item)
    return item

@app.delete("/items/{item_id}", status_code=204, tags=["Items"])
def deletar_item(item_id: int, db: Session = Depends(get_db)):
    """
    Deletar um item por ID
    
    - **item_id**: O ID do item a ser deletado
    """
    item = db.query(ItemDB).filter(ItemDB.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail=f"Item com id {item_id} não encontrado")
    
    db.delete(item)
    db.commit()
    return

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
