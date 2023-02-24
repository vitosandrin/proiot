# 💻 ProIot Challenge
Uma aplicação fullstack Typescript de gerenciamento de dispositivos onde o cliente pode cadastrar seus devices, excluir e alterar suas informações. Toda alteração feita (CREATE, UPDATE, DELETE) no sistema é enviada via HTTP e WebSocket para todos os clientes conectados.

# 📜 Documentos úteis
1 - Insomnia JSON com todas as requisições e payloads '/server/insomnia'

2 - Collection de 'devices' com registros '/server/devices_collection.json'

# 🤹‍♀️ Como rodar o projeto
1 - Abra o terminal no diretorio 'server' e execute o comando `yarn dev`

2 - Abra o terminal no diretorio 'client' e execute o comando `yarn dev`

## ✨ Techs
  * Back-end:
    -  [ ] NodeJS
    -  [ ] Express
    -  [ ] Socket.io
    -  [ ] Typescript
    -  [ ] MongoDB
    -  [ ] Mongoose
    -  [ ] Ramda
  * Front-end:
    -  [ ] React
    -  [ ] Typescript
    -  [ ] Vite
    -  [ ] Socket.io-client
    -  [ ] Axios
    -  [ ] Styled Components
    
<hr />

## 1 - Backend
- [ ] Get All Devices - `GET /device`

- [ ] Create Device - `POST /device`

- [ ] Get One Device - `GET /device/:deviceId`

- [ ] Update Device - `PATCH /device/:deviceId`

- [ ] Remove Device - `DELETE /device/:deviceId`

    ## 1.1 - Banco de dados
    - Collection de dispositivo (device):
        - name
        - description
        - sensorName
        - temperature
        - humidity
    
     
    
