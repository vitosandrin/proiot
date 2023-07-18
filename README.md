# 💻 ProIot Challenge
A fullstack Typescript device management application where the customer can register their devices, delete and change their information. Every request made (CREATE, UPDATE, DELETE) in the system is sent via HTTP and WebSocket to all connected clients.

# 📜 Utils Documents
* Insomnia JSON with all requests and payloads '/server/insomnia'

* Collection of 'devices' with records '/server/devices_collection.json'

# 🤹‍♀️ How to run?
1 - Open the terminal in the location you want to clone the repository and run the command `git clone https://github.com/vitosandrin/proiot.git` 

2 - Open a terminal in the 'server' directory and run the command `yarn dev`

3 - Open a terminal in the 'client' directory and run the command `yarn dev`

4 - Open the link http://localhost:5173/ in your browser and you will already be connected to the HTTP and WebSocket server!

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

## 💾 DataBase
- [ ] Collection (device):
   - name
   - description
   - sensorName
   - temperature
   - humidity
    
     
    
