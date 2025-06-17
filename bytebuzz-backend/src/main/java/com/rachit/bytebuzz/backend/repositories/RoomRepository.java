package com.rachit.bytebuzz.backend.repositories;


import com.rachit.bytebuzz.backend.entities.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepository extends MongoRepository<Room,String>
{
    // Get room using room Id
    Room findByRoomId(String roomId);
}
