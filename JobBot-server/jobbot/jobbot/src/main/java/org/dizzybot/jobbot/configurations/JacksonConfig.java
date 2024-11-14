package org.dizzybot.jobbot.configurations;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.cfg.CoercionInputShape;
import com.fasterxml.jackson.databind.cfg.CoercionAction;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.dizzybot.jobbot.enums.VisaEnum;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.coercionConfigFor(VisaEnum.class)
                .setCoercion(CoercionInputShape.EmptyString, CoercionAction.AsNull);
        mapper.registerModule(new JavaTimeModule());
        return mapper;
    }
}
