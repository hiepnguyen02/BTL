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
    public PersonalWordRequest createWord(@RequestHeader("Authorization") String token,
                                          @RequestBody Long wordId) throws ChangeSetPersister.NotFoundException {

        return bookmarkService.addWordToBookMark(token.substring(7), wordId);


    }

    @GetMapping("/get-bookmark")
    public List<PersonalWordRequest> getBookmark(@RequestHeader("Authorization") String token) {

        return bookmarkService.getBookmark(token.substring(7));
    }

    @PostMapping("/delete-word")
    public PersonalWordRequest deleteWord(@RequestHeader("Authorization") String token,
                                          @RequestBody Long wordId) throws ChangeSetPersister.NotFoundException {
        return bookmarkService.deleteWordFromBookmark(token.substring(7), wordId);

    }
}
