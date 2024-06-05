package com.example.theatre.repository;

import com.example.theatre.domain.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MovieRepository extends MongoRepository<Movie,String> {
    @Query(value="{$and:[{\"theatres.city\":{$eq:?0}},{status:{$eq:\"active\"}}]}")
    List<Movie> getMoviesByCity(String city);
    @Query(value="{$and:[{\"theatres.city\":{$eq:?0}},{status:{$eq:\"upcoming\"}}]}")
    List<Movie> getMoviesByCityAndUpcoming(String city);
}
