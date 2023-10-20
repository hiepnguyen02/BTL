package hiep.nguyen.loginWithEmail.controller;

import hiep.nguyen.loginWithEmail.service.UserService;
import hiep.nguyen.loginWithEmail.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/get")
    public User get(@RequestParam String token) {
        return userService.getUserByToken(token);
    }
}
