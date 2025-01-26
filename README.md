# GeoEvent

**GeoEvent** é uma plataforma que cadastra eventos utilizando dados geográficos, permitindo a busca e filtragem de eventos com base na localização.

## Funcionalidades

- Cadastro de eventos com informações geográficas (latitude, longitude, etc.)
- Busca e filtragem de eventos por localização
- Acesso fácil aos eventos com base na proximidade

## Tecnologias Utilizadas

- **Frontend:** HTML, CSS, JavaScript
- **Mapas:** Leaflet
- **Backend:** Node.js, Sequelize
- **Banco de Dados:** PostgreSQL
- **Geocodificação:** Nominatim

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/tatianysouza/GeoEvent.git
   ```
   
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie o arquivo ```.env``` com as seguintes variáveis:
   ```bash
    POSTGRES_USER=
    POSTGRES_PASSWORD=
    POSTGRES_HOST=
    POSTGRES_PORT=
    POSTGRES_DB=
   ```

4. Configure o banco de dados conforme necessário.
5. Execute a aplicação:
   ```bash
   node server.js
   ``` 
## Uso
1. Abra a aplicação no seu navegador em ```http://localhost:3000/eventos```
2. Cadastre eventos com os detalhes de localização.
3. Use o mapa para encontrar eventos próximos à sua localização.

## Contribuição

Contribuições são bem-vindas! Fique à vontade para enviar sugestões ou melhorias.
