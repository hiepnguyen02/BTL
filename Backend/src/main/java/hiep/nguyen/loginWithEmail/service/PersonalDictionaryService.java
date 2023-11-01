package hiep.nguyen.loginWithEmail.service;

import hiep.nguyen.loginWithEmail.config.JwtService;
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
            wordRepository.save(newWord);
        } else {
            EngWord newWord = new EngWord((EngWord) word);
            newWord.setPersonalDictionary(personalDictionary);
            wordRepository.save(newWord);
        }
        return word;

    }

    @Transactional
    @PreAuthorize("hasRole('USER')")
    public List<Word> getPersonalDictionary(String token) {
        User user = userService.getUserByToken(token);
        PersonalDictionary personalDictionary = personalDictionaryRepository.findByUser(user);
        List<Word> result = wordRepository.findByPersonalDictionary(personalDictionary);
        for (Word word : result) {
            System.out.println(word.getWord());
        }
        return result;

    }
}
