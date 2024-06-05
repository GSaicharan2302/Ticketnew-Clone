import { MovieTheatre } from "./movie-theatre";

export class Movie {
    movieID?:string;
    movieName?:string;
    synopsis?:string;
    cast?:string[];
    languages?:string[];
    genre?:string[];
    filmRating?:string;
    theatres?:MovieTheatre[];
    city?:string[];
    duration?:string;
    rating?:number;
    status?:string;
}
