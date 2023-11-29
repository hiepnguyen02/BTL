package hiep.nguyen.loginWithEmail.controller.PuzzleController;

import hiep.nguyen.loginWithEmail.entity.PuzzleBoard;
import hiep.nguyen.loginWithEmail.entity.PuzzleElement;
import hiep.nguyen.loginWithEmail.service.PuzzleService;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/generate-board-dictionary")
    public PuzzleBoard generateBoardFromDictionary(@RequestHeader("Authorization") String token) throws Exception {
        return puzzleService.generateBoardFromDictionary(token.substring(7));
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

    @PostMapping("/add-word-to-bookmark")
    public PuzzleBoard addWordToBookMarkFromPuzzle(@RequestHeader("Authorization") String token,
                                                   @RequestBody Long wordId) throws ChangeSetPersister.NotFoundException {

        return puzzleService.addToBookmarkFromPuzzle(token.substring(7), wordId);
    }

    @GetMapping("/end-board")
    public boolean endGame() {
        return puzzleService.endPuzzleBoard();
    }
}
