//Variables
const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 3000;

app.set("port", PORT);
//Utilisation du http native de node pour créer le serveur
const server = http.createServer(app);
//Ecouter le serveur sur le PORT 3000 ou le process.env.PORT
server.listen(PORT);
console.log(`your server run at port ${PORT} ....`);
