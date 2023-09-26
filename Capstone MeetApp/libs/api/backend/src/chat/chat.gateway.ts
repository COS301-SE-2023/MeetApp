import { Logger } from '@nestjs/common';
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway()
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    private server!: Server;
  
    private clients: Map<string, { socket: Socket; eventId: string; isCreator: boolean }> = new Map();
    private chatRooms: Map<string, string> = new Map();
  
    handleConnection(client: Socket) {
        const clientId = client.handshake.query['id'];
        const eventId = client.handshake.query['eventId'];
        const isCreatorS = client.handshake.query['isCreator'];
    
        if (clientId && eventId && isCreatorS && typeof clientId === 'string' && typeof eventId === 'string' && typeof isCreatorS === 'string') {
          if (isCreatorS === 'true') {
            const isCreatorB = true;
            // User is the creator, open the chat room
            const roomId = `room-${eventId}`;
            const sockInfo = {socket : client, eventId: eventId, isCreator : isCreatorB}
            this.clients.set(clientId, sockInfo);
            this.chatRooms.set(roomId, clientId);
            client.join(roomId);
            } 
            else {
              const roomId = `room-${eventId}`;
              if (this.chatRooms.has(roomId)) {
                client.join(roomId);
                const isCreatorB= false;
                const sockInfo = {socket : client, eventId: eventId, isCreator : isCreatorB}
                this.clients.set(clientId, sockInfo);
              }
            }
        }
      }
    
      handleDisconnect(client: Socket) {
        const clientId = client.handshake.query['id'];
        const eventId = client.handshake.query['eventId'];
    
        if (clientId && eventId && typeof clientId === 'string' && typeof eventId === 'string') {
          const roomId = `room-${eventId}`;
          if (this.chatRooms.has(roomId) && this.chatRooms.get(roomId) === clientId) {
            this.chatRooms.delete(roomId);
            this.server.to(roomId).emit('chatClosed', `The chat room has been closed by the organizer.`);
          }
          this.clients.delete(clientId);
        }
      }
    
  
    // Subscribe to events related to joining a chat room.
    @SubscribeMessage('joinRoom')
    async handleJoinRoom(client: Socket, payload: { roomId: string; username: string}) {
      const { eventId, isCreator } = this.getClientInfo(client);
      Logger.log(`room-${eventId}`)
        
      // Check if the client is the creator to open the chat room.
      if (isCreator) {
        client.join(payload.roomId);
        this.server.to(payload.roomId).emit('chatRoomOpened', `${payload.username} opened the chat room.`);
      } else {
        // Non-creator users join the chat room.
        client.join(payload.roomId);
        this.server.to(payload.roomId).emit('userJoined', `${payload.username} joined the chat.`);
      }
    }
  
    
    @SubscribeMessage('sendMessage')
    async handleMessage(client: Socket, payload: { eventId: string; message: string, timestamp : string}) {
        payload.timestamp = Date.now().toString();
        this.server.to(payload.eventId).emit('newMessage', payload.message);
    }
  
    
    private getClientInfo(client: Socket) {
      for (const [, { socket, eventId, isCreator }] of this.clients.entries()) {
        if (socket === client) {
          return { eventId, isCreator };
        }
      }
      return { eventId: '', isCreator: false };
    }

    // private getServer(){
    //   return this.server
    // }
    
  }
  