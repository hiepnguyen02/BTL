package hiep.nguyen.loginWithEmail.controller.FlashcardController;

import hiep.nguyen.loginWithEmail.entity.FlashcardBoard;
import hiep.nguyen.loginWithEmail.service.FlashcardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user/flashcard")
public class FlashcardController {
    private final FlashcardService flashcardService;

    public FlashcardController(FlashcardService flashcardService) {
        this.flashcardService = flashcardService;

    }

    @GetMapping("/get")
    public FlashcardBoard get(@RequestHeader("Authorization") String token) {
        return flashcardService.getFlashcardBoard(token.substring(7));
    }

    @PostMapping("/add")
    public FlashcardBoard add(@RequestHeader("Authorization") String token, @RequestBody Long id) throws Exception {
        System.out.println(id);
        return flashcardService.addLearnedWord(token.substring(7), id);
    }

    @PostMapping("/remove")
    public FlashcardBoard remove(@RequestHeader("Authorization") String token, @RequestBody Long id) throws Exception {
        return flashcardService.removeLearnedWord(token.substring(7), id);
    }
}
