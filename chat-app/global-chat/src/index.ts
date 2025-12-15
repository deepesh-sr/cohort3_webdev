import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
let count = 0;

// 2. We will go a bit complex , now the msg type will be an object. 
interface User {
    socket: WebSocket,
    room: string
}
// storing User type inside the array. 
let websocketArray: User[] = [];


// 1. storing all the socket that are getting connected 
// let websocketArray : WebSocket[] = []
wss.on('connection', function connection(ws) {
    // websocketArray.push(ws);
    ws.on('error', console.error);

    ws.on('message', (message) => {

        let parsedMsg = JSON.parse(message as unknown as string);

        // let say we have two type of message if the user is gonna join or chat 
        // the msg type could be 
        /*
            { 
                "type" : "join" , 
                "payload" : {
                    "room_id" : "124"
                    }
            }
            
            { 
                "type" : "chat" , 
                "payload" : {
                    "message" : "Hi There!"
                    }
            }

        based  on the type of input , we agre gonna perform the action 
        */

        if (parsedMsg.type == "join") {
            websocketArray.push({
                socket: ws,
                room: parsedMsg.payload.room_id
            })
            console.log("User joined the" + parsedMsg.payload.room_id)
        }
        if (parsedMsg.type == "chat") {

            let currentUserRoom = websocketArray.find((x) => x.socket = ws)?.room;

            for (let i = 0; i < websocketArray.length; i++) {
                if (websocketArray[i]?.room == currentUserRoom) {
                    websocketArray[i]?.socket.send(parsedMsg.payload.message)
                }
            }

        }
    })
    count = count + 1;
    console.log("User " + count)

    ws.on('disconnect', () => {
        websocketArray = websocketArray.filter((x) => x.socket != ws)
    })
})