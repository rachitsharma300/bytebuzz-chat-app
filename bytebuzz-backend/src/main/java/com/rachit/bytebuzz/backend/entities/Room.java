package com.rachit.bytebuzz.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document("rooms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Room
{
    @Id
    private String id;  // Mongo Db : Unique Identifier
    private String roomId;
    private List<Message> messages = new ArrayList<>();
}
