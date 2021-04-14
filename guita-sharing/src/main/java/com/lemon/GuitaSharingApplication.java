package com.lemon;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import springfox.documentation.oas.annotations.EnableOpenApi;

@SpringBootApplication
@MapperScan("com.lemon.dao")
@EnableOpenApi
public class GuitaSharingApplication {

    public static void main(String[] args) {
        SpringApplication.run(GuitaSharingApplication.class, args);
    }

}
