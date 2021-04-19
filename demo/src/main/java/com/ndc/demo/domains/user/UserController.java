package com.ndc.demo.domains.user;

import com.ndc.demo.common.test_named_di.TestService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    private final TestService testService;
    private final UserRepository userRepository;

    public UserController(@Qualifier("TestServiceImplTwo") TestService testService, UserRepository userRepository) {
        this.testService = testService;
        this.userRepository = userRepository;
    }

    @GetMapping("")
    public String Get() {
        return testService.testMethod();
    }
    @GetMapping("/get-user-by-name")
    public User getUserByLoginName(@RequestParam String loginName)
    {
        return userRepository.getUserByLoginName(loginName);
    }
}
