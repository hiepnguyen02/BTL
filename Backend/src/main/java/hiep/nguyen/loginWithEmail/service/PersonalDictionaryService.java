package hiep.nguyen.loginWithEmail.service;

import hiep.nguyen.loginWithEmail.config.JwtService;
import hiep.nguyen.loginWithEmail.controller.PersonalWordController.PersonalWordRequest;
import hiep.nguyen.loginWithEmail.entity.EngWord;
import hiep.nguyen.loginWithEmail.entity.PersonalDictionary;
import hiep.nguyen.loginWithEmail.entity.ViWord;
import hiep.nguyen.loginWithEmail.entity.Word;
import hiep.nguyen.loginWithEmail.repository.PersonalDictionaryRepository;
import hiep.nguyen.loginWithEmail.repository.WordRepository;
import hiep.nguyen.loginWithEmail.user.Role;
import hiep.nguyen.loginWithEmail.user.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PersonalDictionaryService {
    private final PersonalDictionaryRepository personalDictionaryRepository;
    private final UserService userService;
    private final WordRepository wordRepository;

    @Autowired
    public PersonalDictionaryService(PersonalDictionaryRepository personalDictionaryRepository, JwtService jwtService, UserService userService, WordRepository wordRepository) {
        this.personalDictionaryRepository = personalDictionaryRepository;
        this.userService = userService;
        this.wordRepository = wordRepository;
    }

    public PersonalDictionary addPersonalDictionary(PersonalDictionary personalDictionary) {
        return personalDictionaryRepository.save(personalDictionary);
    }


    public Word addWordToPersonalDictionary(String token, Word word) {
        User user = userService.getUserByToken(token);
        PersonalDictionary personalDictionary = personalDictionaryRepository.findByUser(user);
        if (word instanceof ViWord) {
            ViWord newWord = new ViWord((ViWord) word);
            newWord.setPersonalDictionary(personalDictionary);
            return wordRepository.save(newWord);
        } else {
            EngWord newWord = new EngWord((EngWord) word);
            newWord.setPersonalDictionary(personalDictionary);
            return wordRepository.save(newWord);
        }

    }

    public List<Word> getPersonalDictionary(String token) {
        User user = userService.getUserByToken(token);
        PersonalDictionary personalDictionary = personalDictionaryRepository.findByUser(user);
        return wordRepository.findByPersonalDictionary(personalDictionary);

    }

    public void deleteWordFromPersonalDictionary(Long id) {
        wordRepository.deleteById(id);
    }

    public PersonalWordRequest updateWord(PersonalWordRequest personalWordRequest) {
        Word word = wordRepository.findById(personalWordRequest.getId())
                .orElseThrow(() -> new UsernameNotFoundException("Word not found"));
        word.setWord(personalWordRequest.getWord());
        word.setDefine(personalWordRequest.getDefine());
        word.setType(personalWordRequest.getType());
        if (word instanceof EngWord) {
            ((EngWord) word).setSpelling(personalWordRequest.getSpelling());
        }
        wordRepository.save(word);
        if (word instanceof ViWord) {
            PersonalWordRequest personalWordRequest1 = new PersonalWordRequest();
            personalWordRequest1.setId(word.getId());
            personalWordRequest1.setWord(word.getWord());
            personalWordRequest1.setDefine(word.getDefine());
            personalWordRequest1.setType(word.getType());
            personalWordRequest1.setBookmarkList(word.getBookmarkList());
            personalWordRequest1.setPersonalDictionary(word.getPersonalDictionary());
            personalWordRequest1.setLang("Vietnamese");
            return personalWordRequest1;

        } else {
            PersonalWordRequest personalWordRequest1 = new PersonalWordRequest();
            personalWordRequest1.setSpelling(((EngWord) word).getSpelling());
            personalWordRequest1.setId(word.getId());
            personalWordRequest1.setWord(word.getWord());
            personalWordRequest1.setDefine(word.getDefine());
            personalWordRequest1.setType(word.getType());
            personalWordRequest1.setBookmarkList(word.getBookmarkList());
            personalWordRequest1.setPersonalDictionary(word.getPersonalDictionary());
            personalWordRequest1.setLang("English");
            return personalWordRequest1;

        }

    }

    public PersonalWordRequest getWordService(Long id) {
        Word word = wordRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Word not found"));
        if (word instanceof ViWord) {
            PersonalWordRequest personalWordRequest = new PersonalWordRequest();
            personalWordRequest.setId(word.getId());
            personalWordRequest.setWord(word.getWord());
            personalWordRequest.setDefine(word.getDefine());
            personalWordRequest.setType(word.getType());
            personalWordRequest.setBookmarkList(word.getBookmarkList());
            personalWordRequest.setPersonalDictionary(word.getPersonalDictionary());
            personalWordRequest.setLang("Vietnamese");
            System.out.println(personalWordRequest.getWord());
            return personalWordRequest;

        } else {
            PersonalWordRequest personalWordRequest = new PersonalWordRequest();
            personalWordRequest.setSpelling(((EngWord) word).getSpelling());
            personalWordRequest.setId(word.getId());
            personalWordRequest.setWord(word.getWord());
            personalWordRequest.setDefine(word.getDefine());
            personalWordRequest.setType(word.getType());
            personalWordRequest.setBookmarkList(word.getBookmarkList());
            personalWordRequest.setPersonalDictionary(word.getPersonalDictionary());
            personalWordRequest.setLang("English");
            System.out.println(personalWordRequest.getWord());
            return personalWordRequest;

        }
    }

}
