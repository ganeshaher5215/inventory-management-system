package com.ganesh.inventory_backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

   @Bean
   public OpenAPI apiInfo() {
      return new OpenAPI()
            .info(new Info()
                  .title("Inventory Management System API")
                  .version("1.0.0")
                  .description("Employee & Inventory Management System — built by Ganesh Patil"))
            .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
            .components(new Components()
                  .addSecuritySchemes("bearerAuth",
                        new SecurityScheme()
                              .type(SecurityScheme.Type.HTTP)
                              .scheme("bearer")
                              .bearerFormat("JWT")));
   }
}