package com.criskell.padkell;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class PadkellApplication {

	public static void main(String[] args) {
		SpringApplication.run(PadkellApplication.class, args);
	}

}
