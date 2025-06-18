package com.rachit.bytebuzz.backend.controllers;


import com.rachit.bytebuzz.backend.entities.Message;
import com.rachit.bytebuzz.backend.entities.Room;
import com.rachit.bytebuzz.backend.payload.MessageRequest;
import com.rachit.bytebuzz.backend.repositories.RoomRepository;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@Controller
@CrossOrigin("http://localhost:5173")
public class ChatController
{
    private RoomRepository roomRepository;

    public ChatController(RoomRepository roomRepository)
    {
        this.roomRepository = roomRepository;
    }

    // For sending and receiving messages
    @MessageMapping("/sendMessage/{roomId}") // app/sendMessage/roomId
    @SendTo("/topic/room/{roomId}") // Subscribe
    public Message sendMessage(
            @DestinationVariable String roomId,
            @RequestBody MessageRequest request
    ) {
        Room room = roomRepository.findByRoomId(request.getRoomId());

        Message message = new Message();
        message.setContent(request.getContent());
        message.setSender(request.getSender());
        message.setTimeStamp(LocalDateTime.now());
        if (room != null)
        {
            room.getMessages().add(message);
            roomRepository.save(room);
        }
        else
        {
            throw new RuntimeException("Room not found !");
        }
        return message;
    }
}
