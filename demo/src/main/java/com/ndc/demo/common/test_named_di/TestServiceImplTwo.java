package com.ndc.demo.common.test_named_di;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component("TestServiceImplTwo")
public class TestServiceImplTwo implements TestService {
    @Override
    public String testMethod() {
        var mapper = new ObjectMapper();
        var response = new Object() {
            public String message;
        };
        response.message = "spring works 2";
        try {
            return mapper.writeValueAsString(response);
        } catch (JsonProcessingException e) {
            return "";
        }
    }
}
