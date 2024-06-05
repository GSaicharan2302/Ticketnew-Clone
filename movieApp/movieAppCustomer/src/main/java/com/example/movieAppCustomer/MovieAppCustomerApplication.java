package com.example.movieAppCustomer;

import com.example.movieAppCustomer.filter.JwtFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableFeignClients
public class MovieAppCustomerApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieAppCustomerApplication.class, args);
	}
	@Bean
	public FilterRegistrationBean getFilterRegistrationBean(){
		FilterRegistrationBean filterRegistrationBean=new FilterRegistrationBean();
		filterRegistrationBean.setFilter(new JwtFilter());
		filterRegistrationBean.addUrlPatterns("/customer/getCustomerByID","/customer/addOrder"
				,"/customer/addReview");
		return filterRegistrationBean;
	}
}
