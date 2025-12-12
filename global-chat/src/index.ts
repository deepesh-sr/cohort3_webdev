import {WebSocketServer, WebSocket} from 'ws';

const wss = new WebSocketServer({port: 8080});
let count = 0;

// storing all the socket that are getting connected 
let websocketArray : WebSocket[] = []
wss.on('connection',function connection(ws){
    websocketArray.push(ws);
    ws.on('error',console.error);

    ws.on('message',(data)=>{
        websocketArray.forEach((s)=>{
            s.send(data.toString()+ " Sent from the server")
        })
    })
    count = count+1 ; 
    console.log("User "+count)

    ws.on('disconnect',()=>{
      websocketArray = websocketArray.filter((x)=> x != ws)
    })
})