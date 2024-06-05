package com.example.movieAppAuth.service;

import com.example.movieAppAuth.domain.EmailData;
import com.example.movieAppAuth.domain.User;
import com.example.movieAppAuth.exception.OTPMismatchException;
import com.example.movieAppAuth.exception.UserNotFoundException;
import com.example.movieAppAuth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;
@Service
public class UserServiceImpl implements UserService{
    private int passcode;
    @Autowired
    private JwtTokenGenerator jwtTokenGenerator;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MailProxy mailProxy;
    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public int getOTP(String userID) throws UserNotFoundException {
        if(userRepository.findById(userID).isPresent()){
            User user=userRepository.findById(userID).get();
            Random random=new Random();
            Integer otp= random.nextInt(1000,9999);
            passcode=otp.intValue();
            EmailData emailData=new EmailData(user.getEmailID(),otp.toString(),
                    "OTP For TicketNew Login",null);
            ResponseEntity<String> resp=mailProxy.sendEmailDTO(emailData);
            return otp;
        }
        else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public Map<String, String> login(int otp,String userID) throws OTPMismatchException {
       if(checkOTP(otp)){
           User tempUser=userRepository.findById(userID).get();
           return jwtTokenGenerator.generateToken(tempUser);
       }
       else {
           throw new OTPMismatchException();
       }
    }

    @Override
    public boolean checkOTP(int otp) {
        if(passcode==otp){
            return true;
        }
        else {
            return false;
        }
    }
}
