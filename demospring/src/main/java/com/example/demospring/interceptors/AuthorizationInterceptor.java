package com.example.demospring.interceptors;

import com.example.demospring.annotations.AllowAnonymous;
import com.example.demospring.helpers.JwtHelper;
import com.example.demospring.models.response.Common401;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthorizationInterceptor implements HandlerInterceptor {
    private final JwtHelper jwtHelper;
    private final String AUTH_HEADER = "Authorization";
    public AuthorizationInterceptor(JwtHelper jwtHelper) {
        this.jwtHelper = jwtHelper;
    }
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        if (handler instanceof ResourceHttpRequestHandler) {
            return true;
        }
        var method = (HandlerMethod) handler;
        AllowAnonymous attr = method.getMethodAnnotation(AllowAnonymous.class);
        if (attr != null) return true;
        var token = request.getHeader(AUTH_HEADER);
        var mapper = new ObjectMapper();
        var res401 = new Common401();

        res401.message = "token validation failed";
        var msg = mapper.writeValueAsString(res401);
        if (token == null) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(msg);
            return false;
        }
        var isTokenValid = jwtHelper.validateToken(token);
        if (!isTokenValid) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(msg);
            return false;
        }
        var claims = jwtHelper.getClaimsFromToken(token);
        claims.getBody().forEach(request::setAttribute); //(k,v) -> { request.setAttribute(k, v); }

        return true;
    }
}
