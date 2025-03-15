import { WebSocketServer ,WebSocket} from "ws";
const wss =new WebSocketServer({port :8080});

let usercount=0;
//let allsockets:WebSocket[]=[];//
interface user{
    socket:WebSocket;
    room:String;
}
let allsockets:user[]=[];


wss.on("connection",(socket)=>{
   
    socket.on("message",(message)=>{
        const parsemessage=JSON.parse(message as unknown as string);
        if(parsemessage.type=="join")
        {
            allsockets.push({socket,room:parsemessage.payload.roomId});
        }

        if(parsemessage.type=="chat")
        {
            const currentUserRoom=allsockets.find(x=>x.socket==socket)?.room;
            for(let i=0;i<allsockets.length;i++)
            {
                if(allsockets[i].room == currentUserRoom){
                    allsockets[i].socket.send(parsemessage.payload.message);
                }
            }
        }
    })

    

})