package com.example.theatre.repository;

import com.example.theatre.domain.Theatre;
import com.example.theatre.domain.TheatreOrder;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Date;
import java.util.List;

public interface TheatreRepository extends MongoRepository<Theatre,String> {
    @Query("{$and:[{\"theatreAddress.city\":{$eq:?0}},{status:{$eq:\"active\"}}]}")
    List<Theatre> getTheatresByCity(String city);
    @Query("{$and:[{\"orders.date\":{$eq:?0}},{\"orders.showTime\":{$eq:?1}}" +
            ",{\"orders.screen\":{$eq:?2}},{\"_id\":{$eq:?3}}]},{\"orders\":1,\"_id\":0}")
    List<TheatreOrder> getOrdersByDateAndTimeAndScreen(Date date, String showTime, String screen,String theatreID);
}
