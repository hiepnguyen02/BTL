package hiep.nguyen.loginWithEmail.controller.PersonalWordController;

import hiep.nguyen.loginWithEmail.entity.EngWord;
import hiep.nguyen.loginWithEmail.entity.ViWord;
import hiep.nguyen.loginWithEmail.entity.Word;
import hiep.nguyen.loginWithEmail.service.PersonalDictionaryService;
import hiep.nguyen.loginWithEmail.service.UserService;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/personal")

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

    //    @PostMapping("/get-personal-dictionary")
//    public List<Word> createWord(@RequestHeader("Authorization") String token) {
//        return personalDictionaryService.getPersonalDictionary(token.substring(7));
//    }
    @GetMapping("/get-personal-dictionary")
    public List<Word> search(@RequestParam String token) {
        return personalDictionaryService.getPersonalDictionary(token);
    }
}
