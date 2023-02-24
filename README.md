# 💻 ProIot Challenge
Uma aplicação fullstack Typescript de gerenciamento de dispositivos onde o cliente pode cadastrar seus dispositivos, excluir e alterar suas informações. Toda requisição feita (CREATE, UPDATE, DELETE) no sistema é enviada via HTTP e WebSocket para todos os clientes conectados.

# 📜 Documentos úteis
* Insomnia JSON com todas as requisições e payloads '/server/insomnia'

* Collection de 'devices' com registros '/server/devices_collection.json'

# 🤹‍♀️ Como rodar o projeto
1 - Abra o terminal no local que deseja clonar o repositório e execute o comando `git clone https://github.com/vitosandrin/proiot.git` 

2 - Abra o terminal no diretorio 'server' e execute o comando `yarn dev`

3 - Abra o terminal no diretorio 'client' e execute o comando `yarn dev`

4 - Abra em seu navegador o link http://localhost:5173/ e você já estará conectado ao servidor HTTP e WebSocket!

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

## 🕹 Rotas
- [ ] Get All Devices - `GET /device`

- [ ] Create Device - `POST /device`

- [ ] Get One Device - `GET /device/:deviceId`

- [ ] Update Device - `PATCH /device/:deviceId`

- [ ] Remove Device - `DELETE /device/:deviceId`

## 💾 Banco de dados
- [ ] Collection de dispositivo (device):
   - name
   - description
   - sensorName
   - temperature
   - humidity
    
     
    
