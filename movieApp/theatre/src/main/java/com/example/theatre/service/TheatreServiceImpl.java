package com.example.theatre.service;

import com.example.theatre.domain.Seat;
import com.example.theatre.domain.Theatre;
import com.example.theatre.domain.TheatreDTO;
import com.example.theatre.domain.TheatreOrder;
import com.example.theatre.exception.SeatNotFoundException;
import com.example.theatre.exception.TheatreAlreadyExistsException;
import com.example.theatre.exception.TheatreNotFoundException;
import com.example.theatre.repository.TheatreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TheatreServiceImpl implements TheatreService{
    @Autowired
    private TheatreRepository theatreRepository;
    @Autowired
    private TheatreProxy theatreProxy;
    @Override
    public Theatre addTheatre(Theatre theatre) throws TheatreAlreadyExistsException {
        try{
            Random random=new Random();
            int tmp=random.nextInt(1000,9999999);
            String temp="#"+tmp;
            theatre.setTheatreID(temp);
            System.out.println(theatre.getTheatreID());
            TheatreDTO theatreDTO=new TheatreDTO();
            theatreDTO.setEmailID(theatre.getTheatreID());
            theatreDTO.setRole("Theatre");
            theatreDTO.setStatus("Active");
            System.out.println("Email ID is : "+theatreDTO.getEmailID());
            ResponseEntity responseEntity=theatreProxy.sendTheatreDTO(theatreDTO);
            return theatreRepository.insert(theatre);
        }
        catch(DuplicateKeyException duplicateKeyException){
            throw new TheatreAlreadyExistsException();
        }
    }

    @Override
    public List<Theatre> getTheatresByCity(String city) {
        return theatreRepository.getTheatresByCity(city);
    }

    @Override
    public Theatre getTheatresByID(String theatreID) throws TheatreNotFoundException {
        if(theatreRepository.findById(theatreID).isPresent()){
            return theatreRepository.findById(theatreID).get();
        }
        else {
            throw new TheatreNotFoundException();
        }
    }

    @Override
    public Theatre addOrder(TheatreOrder order, String theatreID) throws TheatreNotFoundException {
        try{
            Theatre theatre=getTheatresByID(theatreID);
            Random random=new Random();
            int temp= random.nextInt(1000,100000);
            String tempString="#"+temp;
            order.setOrderID(tempString);
            order.setTheatreID(theatreID);
            List<TheatreOrder> orders=theatre.getOrders();
            orders.add(order);
            theatre.setOrders(orders);
            return theatreRepository.save(theatre);
        }
        catch (TheatreNotFoundException theatreNotFoundException){
            throw new TheatreNotFoundException();
        }
    }


    @Override
    public List<TheatreOrder> getOrdersByTheatreID(String theatreID) throws TheatreNotFoundException {
        try{
            Theatre theatre=getTheatresByID(theatreID);
            return theatre.getOrders();
        }
        catch(TheatreNotFoundException theatreNotFoundException){
            throw new TheatreNotFoundException();
        }
    }

    @Override
    public List<String> getOrdersByDateAndTimeAndScreen(Date date, String showTime, String screen,String theatreID) throws TheatreNotFoundException {
//        List<TheatreOrder> orders=theatreRepository.getOrdersByDateAndTimeAndScreen(date, showTime, screen,theatreID);
//        Iterator<TheatreOrder> orderIterator= orders.iterator();
//        System.out.println(orders);
//        List<String> list=new ArrayList<>();
//        while(orderIterator.hasNext()){
//            TheatreOrder theatreOrder=orderIterator.next();
//            Iterator<String> seatIterator=theatreOrder.getSeats().iterator();
//            while(seatIterator.hasNext()){
//                String tempString=seatIterator.next();
//                if(!list.contains(tempString))
//                list.add(tempString);
//            }
//        }
//        return list;
        List<TheatreOrder> orderList=getOrdersByTheatreID(theatreID);
        Iterator<TheatreOrder> orderIterator= orderList.iterator();
        List<String> seatList=new ArrayList<>();
        while(orderIterator.hasNext()){
            TheatreOrder theatreOrder=orderIterator.next();
            System.out.println(theatreOrder.getDate());
            System.out.println(date);
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);

            int year = calendar.get(Calendar.YEAR);
            int month = calendar.get(Calendar.MONTH) + 1; // Month starts from 0
            int day = calendar.get(Calendar.DAY_OF_MONTH);

            calendar.setTime(theatreOrder.getDate());

            int orderyear = calendar.get(Calendar.YEAR);
            int ordermonth = calendar.get(Calendar.MONTH) + 1; // Month starts from 0
            int orderday = calendar.get(Calendar.DAY_OF_MONTH);
            if(year==orderyear && month==ordermonth && day==orderday && theatreOrder.getScreen().equals(screen) && theatreOrder
                    .getShowTime().equals(showTime)){
                Iterator<String> seatIterator=theatreOrder.getSeats().iterator();
                while(seatIterator.hasNext()){
                    String tempSeat=seatIterator.next();
                    if(!seatList.contains(tempSeat)){
                        seatList.add(tempSeat);
                    }
                }
            }
        }
        return seatList;
    }


}
