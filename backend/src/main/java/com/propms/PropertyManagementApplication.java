// package com.propms;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication
// public class PropertyManagementApplication {
//     public static void main(String[] args) {
//         SpringApplication.run(PropertyManagementApplication.class, args);
//     }
// }

package com.propms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.propms")
public class PropertyManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(PropertyManagementApplication.class, args);
    }
}
