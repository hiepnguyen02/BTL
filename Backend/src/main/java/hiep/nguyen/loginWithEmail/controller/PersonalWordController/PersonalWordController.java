package hiep.nguyen.loginWithEmail.controller.PersonalWordController;

import hiep.nguyen.loginWithEmail.entity.EngWord;
import hiep.nguyen.loginWithEmail.entity.ViWord;
import hiep.nguyen.loginWithEmail.entity.Word;
import hiep.nguyen.loginWithEmail.service.PersonalDictionaryService;
import hiep.nguyen.loginWithEmail.service.UserService;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user/dictionary")

public class PersonalWordController {
    private final PersonalDictionaryService personalDictionaryService;

    public PersonalWordController(PersonalDictionaryService personalDictionaryService, UserService userService) {
        this.personalDictionaryService = personalDictionaryService;
    }

    @PostMapping("/add-word")
    public Word createWord(@RequestHeader("Authorization") String token,
                           @RequestBody PersonalWordRequest personalWordRequest) throws ChangeSetPersister.NotFoundException {
        if (personalWordRequest.getLang().equals("VI")) {
            ViWord word = new ViWord();
            word.setWord(personalWordRequest.getWord());
            word.setDefine(personalWordRequest.getDefine());
            word.setType(personalWordRequest.getType());
            return personalDictionaryService.addWordToPersonalDictionary(token.substring(7), word);


        } else {
            EngWord word = new EngWord();
            word.setWord(personalWordRequest.getWord());
            word.setDefine(personalWordRequest.getDefine());
            word.setType(personalWordRequest.getType());
            word.setSpelling(personalWordRequest.getSpelling());
            return personalDictionaryService.addWordToPersonalDictionary(token.substring(7), word);

        }


    }

    @GetMapping("/get-personal-dictionary")
    public List<Word> get(@RequestParam String token) {
        return personalDictionaryService.getPersonalDictionary(token);
    }

    @PostMapping("/delete-word")
    public ResponseEntity<Boolean> deleteWord(@RequestBody Long wordId) throws ChangeSetPersister.NotFoundException {
        personalDictionaryService.deleteWordFromPersonalDictionary(wordId);
        return ResponseEntity.ok(true);
    }

    @PostMapping("/update-word")
    public Word createWord(
            @RequestBody PersonalWordRequest personalWordRequest) throws ChangeSetPersister.NotFoundException {
        return personalDictionaryService.updateWord(personalWordRequest);


    }
}
