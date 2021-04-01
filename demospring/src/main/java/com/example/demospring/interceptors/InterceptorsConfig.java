package com.example.demospring.interceptors;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorsConfig implements WebMvcConfigurer {
    private final CorsInterceptor  corsInterceptor;
    public InterceptorsConfig(CorsInterceptor corsInterceptor)
    {
        this.corsInterceptor = corsInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(corsInterceptor).order(Ordered.HIGHEST_PRECEDENCE);
    }
}
