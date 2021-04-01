package com.example.demospring.interceptors;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.resource.ResourceHttpRequestHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;

@Component
public class CorsInterceptor implements HandlerInterceptor {
    @Value("${origins.allowed}")
    private String[] whitelistOrigins;

    @Override
    public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {

        if (handler instanceof ResourceHttpRequestHandler) {
            System.out.println("ResourceHttpRequestHandler");
        }
        String origin = request.getHeader("origin");
        if (!Arrays.asList(whitelistOrigins).contains(origin)) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write("");
            return false;
        }
        response.setHeader("Access-Control-Allow-Origin", origin);
        response.setHeader("Access-Control-Allow-Methods",
                "ACL, CANCELUPLOAD, CHECKIN, CHECKOUT, " +
                        "COPY, DELETE, GET, HEAD, LOCK, MKCALENDAR, " +
                        "MKCOL, MOVE, OPTIONS, POST, PROPFIND, PROPPATCH, " +
                        "PUT, REPORT, SEARCH, UNCHECKOUT, UNLOCK, UPDATE, VERSION-CONTROL");
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
        }
        return true;
    }
}
