package hiep.nguyen.loginWithEmail.controller;

import hiep.nguyen.loginWithEmail.entity.Word;
import hiep.nguyen.loginWithEmail.service.UserService;
import hiep.nguyen.loginWithEmail.service.WordService;
import hiep.nguyen.loginWithEmail.user.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private final WordService wordService;
    private final UserService userService;

    public UserController(WordService wordService, UserService userService) {
        this.wordService = wordService;
        this.userService = userService;
    }


    @GetMapping("/get")
    public User get(@RequestHeader("Authorization") String token) {
        return userService.getUserByToken(token.substring(7));
    }

    @GetMapping("/search")
    public List<Word> search(@RequestParam String prefix, @RequestHeader("Authorization") String token) {
        return wordService.searchByNameStartingWithByUser(prefix, token.substring(7));

    }
}
