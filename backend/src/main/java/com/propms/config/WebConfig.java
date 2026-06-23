// package com.propms.config;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.*;

// @Configuration
// public class WebConfig
//         implements WebMvcConfigurer {

//     @Override
//     public void addResourceHandlers(
//             ResourceHandlerRegistry registry
//     ) {

//         registry.addResourceHandler(
//                 "/uploads/**"
//         )
//         .addResourceLocations(
//                 "file:uploads/"
//         );
//     }
// }

package com.propms.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(
            ResourceHandlerRegistry registry) {

        registry
            .addResourceHandler("/uploads/**")
            .addResourceLocations(
                "file:photo_upload/"
            );
    }
}
