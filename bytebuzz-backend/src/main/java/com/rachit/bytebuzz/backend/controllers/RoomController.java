package com.rachit.bytebuzz.backend.controllers;


import com.rachit.bytebuzz.backend.config.AppConstants;
import com.rachit.bytebuzz.backend.entities.Message;
import com.rachit.bytebuzz.backend.entities.Room;
import com.rachit.bytebuzz.backend.repositories.RoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/rooms")
@CrossOrigin(AppConstants.FRONT_END_BASE_URL)
public class RoomController
{
    private RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository)
    {
        this.roomRepository = roomRepository;
    }

    // ----  Create Room APIs ----

    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomId)
    {
        if (roomRepository.findByRoomId(roomId)!=null)
        {
            // Room is already there
            return ResponseEntity.badRequest().body("Room already exists!");
        }
            // Create new room
        Room room = new Room();
        room.setRoomId(roomId);
        Room saveRoom = roomRepository.save(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }


    // ---- Get Room : Join APIs ----
    @GetMapping("/{roomId}")
    public ResponseEntity<?> joinRoom(
            @PathVariable String roomId
    ) {

       Room room =  roomRepository.findByRoomId(roomId);
       // print optional

       if (room == null)
       {
           return ResponseEntity.badRequest()
                   .body("Room not found !");
       }
       return ResponseEntity.ok(room);
    }


    // ---- Get Message of Room APIs ----
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<List<Message>> getMessages(
            @PathVariable String roomId,
            @RequestParam(value = "page", defaultValue = "0", required = false) int page,
            @RequestParam(value = "size", defaultValue = "20", required = false) int size
    ) {

        Room room = roomRepository.findByRoomId(roomId);
        if (room == null)
        {
            return ResponseEntity.badRequest().build();
        }

        // get messages :
        // pagination
        List<Message> messages = room.getMessages();

        int start = Math.max(0, messages.size() - (page + 1) * size);
        int end = Math.min(messages.size(), start + size);
        List<Message> paginatedMessages = messages.subList(start, end);

        return ResponseEntity.ok(paginatedMessages);
    }
}
