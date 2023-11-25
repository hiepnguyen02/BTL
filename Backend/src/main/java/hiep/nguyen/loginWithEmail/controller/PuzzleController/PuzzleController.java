package hiep.nguyen.loginWithEmail.controller.PuzzleController;

import hiep.nguyen.loginWithEmail.controller.PersonalWordController.PersonalWordRequest;
import hiep.nguyen.loginWithEmail.entity.PuzzleBoard;
import hiep.nguyen.loginWithEmail.entity.PuzzleElement;
import hiep.nguyen.loginWithEmail.service.PuzzleService;
import hiep.nguyen.loginWithEmail.user.User;
import org.springframework.web.bind.annotation.*;

import javax.lang.model.element.Element;
import java.util.List;

@RestController
@RequestMapping("/api/v1/user/puzzle")
public class PuzzleController {
    private final PuzzleService puzzleService;

    public PuzzleController(PuzzleService puzzleService) {
        this.puzzleService = puzzleService;
    }

    @GetMapping("/generate-board")
    public PuzzleBoard generateBoard(@RequestHeader("Authorization") String token) {
        return puzzleService.generateBoard(token.substring(7));
    }

    @GetMapping("/get-board")
    public PuzzleBoard getBoard(@RequestHeader("Authorization") String token) {
        return puzzleService.getPuzzleBoard(token.substring(7));
    }

    @PostMapping("/select")
    public PuzzleBoard selectElement(@RequestHeader("Authorization") String token, @RequestBody PuzzleElement element) {
        return puzzleService.selectElementService(token.substring(7), element.getRowIndex(), element.getColIndex());
    }

    @PostMapping("/check")
    public PuzzleBoard checkSubmission(@RequestHeader("Authorization") String token) {
        return puzzleService.checkSubmissionService(token.substring(7));
    }

    @GetMapping("/end-board")
    public boolean endGame() {
        return puzzleService.endPuzzleBoard();
    }
}
