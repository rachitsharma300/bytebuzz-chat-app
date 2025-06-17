package com.rachit.bytebuzz.backend.controllers;


import com.rachit.bytebuzz.backend.entities.Room;
import com.rachit.bytebuzz.backend.repositories.RoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/rooms")
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



    // ---- Get Room APIs ----



    // ---- Get Message of Room APIs ----
}
