# 🏢 Projeto Via CEP – SPTech

Bem-vindo ao repositório do projeto **Via CEP**, desenvolvido para entrega do Projeto Individual da **São Paulo Tech School**.
Este projeto tem como objetivo implementar uma interfaces de cadastro, visualização e remoção de endereços utilizando a API do ViaCEP.

---

## 💻 Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **Java 21**
- **MySQL**

---

## 🛠️ Ferramentas Utilizadas

- **Git & GitHub**
- **Visual Studio Code**
- **IntelliJ IDEA**
- **MySQL Workbench**

---

## 📦 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/KKadooca-SPTECH/projetoViaCEP.git
```

### 2. Acesse o diretório do projeto

```bash
cd projetoViaCEP
```

### 3. Configure o banco de dados

Abra o MySQL e crie o banco de dados e a tabela utilizando o script SQL disponível no projeto.

```sql
CREATE DATABASE viacep;

USE viacep;

CREATE TABLE endereco (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cep VARCHAR(9) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    rua VARCHAR(150) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    pais VARCHAR(50) NOT NULL,
    data DATE NOT NULL,
    tipo_endereco VARCHAR(20) NOT NULL,
    tem_complemento BOOLEAN NOT NULL,
    tipo_complemento VARCHAR(50),
    complemento VARCHAR(100)
);
```

### 4. Configure a conexão com o banco

No arquivo `application.properties` do backend, configure as informações do seu MySQL:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/viacep
spring.datasource.username=root
spring.datasource.password=SUA_SENHA
```

Substitua `SUA_SENHA` pela senha configurada no seu MySQL.

### 5. Execute o backend

Abra o projeto Java/Spring Boot e execute a aplicação.

O backend deverá estar disponível em:

```text
http://localhost:8080
```

### 6. Execute o frontend

Acesse a pasta do frontend:

```bash
cd "Projeto Individual/public"
```

Abra o arquivo `index.html` utilizando o **Live Server** do VS Code.

O frontend será responsável por realizar as requisições para a API Spring Boot e pela consulta de CEP utilizando a API ViaCEP.

### 7. Acesse o sistema

Com o backend e o frontend em execução, utilize a tela de endereços para:

* Consultar os endereços cadastrados;
* Cadastrar novos endereços;
* Consultar o CEP pela API ViaCEP;
* Remover endereços cadastrados.


---

## 👨‍💻 Autor
  
### Kauan Kadooca
**📘 SPTech School**  
**🔗 GitHub:** https://github.com/KKadooca-SPTECH

---
