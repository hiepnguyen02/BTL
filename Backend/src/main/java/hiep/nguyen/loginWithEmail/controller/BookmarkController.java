package hiep.nguyen.loginWithEmail.controller;

import hiep.nguyen.loginWithEmail.controller.PersonalWordController.PersonalWordRequest;
import hiep.nguyen.loginWithEmail.entity.EngWord;
import hiep.nguyen.loginWithEmail.entity.ViWord;
import hiep.nguyen.loginWithEmail.entity.Word;
import hiep.nguyen.loginWithEmail.service.BookmarkService;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user/bookmark")
public class BookmarkController {
    private final BookmarkService bookmarkService;

    public BookmarkController(BookmarkService bookmarkService) {
        this.bookmarkService = bookmarkService;
    }


    @PostMapping("/add-word")
    public Word createWord(@RequestHeader("Authorization") String token,
                           @RequestBody PersonalWordRequest personalWordRequest) throws ChangeSetPersister.NotFoundException {
        if (personalWordRequest.getLang().equals("VI")) {
            ViWord word = new ViWord();
            word.setWord(personalWordRequest.getWord());
            word.setDefine(personalWordRequest.getDefine());
            word.setType(personalWordRequest.getType());
            return bookmarkService.addWordToBookMark(token.substring(7), word);


        } else {
            EngWord word = new EngWord();
            word.setWord(personalWordRequest.getWord());
            word.setDefine(personalWordRequest.getDefine());
            word.setType(personalWordRequest.getType());
            word.setSpelling(personalWordRequest.getSpelling());
            return bookmarkService.addWordToBookMark(token.substring(7), word);

        }


    }

    @GetMapping("/get-bookmark")
    public List<Word> search(@RequestParam String token) {
        return bookmarkService.getBookmark(token);
    }

    @PostMapping("/delete-word")
    public ResponseEntity<Boolean> deleteWord(@RequestBody Long wordId) throws ChangeSetPersister.NotFoundException {
        bookmarkService.deleteWordFromBookmark(wordId);
        return ResponseEntity.ok(true);
    }
}
