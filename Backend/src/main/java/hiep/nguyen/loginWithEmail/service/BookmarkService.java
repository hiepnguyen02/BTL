package hiep.nguyen.loginWithEmail.service;

import hiep.nguyen.loginWithEmail.config.JwtService;
import hiep.nguyen.loginWithEmail.controller.PersonalWordController.PersonalWordRequest;
import hiep.nguyen.loginWithEmail.entity.*;
import hiep.nguyen.loginWithEmail.repository.BookmarkRepository;
import hiep.nguyen.loginWithEmail.repository.PersonalDictionaryRepository;
import hiep.nguyen.loginWithEmail.repository.WordRepository;
import hiep.nguyen.loginWithEmail.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookmarkService {
    private final BookmarkRepository bookmarkRepository;
    private final UserService userService;
    private final WordRepository wordRepository;


    @Autowired
    public BookmarkService(BookmarkRepository bookmarkRepository, UserService userService, WordRepository wordRepository) {
        this.bookmarkRepository = bookmarkRepository;
        this.userService = userService;
        this.wordRepository = wordRepository;
    }

    public Bookmark addBookmark(Bookmark bookmark) {
        return bookmarkRepository.save(bookmark);
    }


    public PersonalWordRequest addWordToBookMark(String token, Long id) {
        User user = userService.getUserByToken(token);
        Bookmark bookmark = bookmarkRepository.findByUser(user);
        Word word = wordRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Word not found"));
        word.getBookmarkList().add(bookmark);
        bookmark.getWordList().add(word);
        bookmarkRepository.save(bookmark);
        wordRepository.save(word);
        if (word instanceof ViWord) {
            PersonalWordRequest personalWordRequest = new PersonalWordRequest();
            personalWordRequest.setId(word.getId());
            personalWordRequest.setWord(word.getWord());
            personalWordRequest.setDefine(word.getDefine());
            personalWordRequest.setType(word.getType());
            personalWordRequest.setBookmarkList(word.getBookmarkList());
            personalWordRequest.setPersonalDictionary(word.getPersonalDictionary());
            personalWordRequest.setLang("Vietnamese");
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
            return personalWordRequest;

        }

    }

    public List<PersonalWordRequest> getBookmark(String token) {
        User user = userService.getUserByToken(token);
        Bookmark bookmark = bookmarkRepository.findByUser(user);
        List<PersonalWordRequest> result = new ArrayList<>();
        bookmark.getWordList().forEach(word -> {
            if (word instanceof ViWord) {
                PersonalWordRequest personalWordRequest = new PersonalWordRequest();
                personalWordRequest.setId(word.getId());
                personalWordRequest.setWord(word.getWord());
                personalWordRequest.setDefine(word.getDefine());
                personalWordRequest.setType(word.getType());
                personalWordRequest.setBookmarkList(word.getBookmarkList());
                personalWordRequest.setPersonalDictionary(word.getPersonalDictionary());
                personalWordRequest.setLang("Vietnamese");
                result.add(personalWordRequest);

            }
            if (word instanceof EngWord) {
                PersonalWordRequest personalWordRequest = new PersonalWordRequest();
                personalWordRequest.setSpelling(((EngWord) word).getSpelling());
                personalWordRequest.setId(word.getId());
                personalWordRequest.setWord(word.getWord());
                personalWordRequest.setDefine(word.getDefine());
                personalWordRequest.setType(word.getType());
                personalWordRequest.setBookmarkList(word.getBookmarkList());
                personalWordRequest.setPersonalDictionary(word.getPersonalDictionary());
                personalWordRequest.setLang("English");
                result.add(personalWordRequest);

            }
        });
        return result;

    }

    public PersonalWordRequest deleteWordFromBookmark(String token, Long id) {
        User user = userService.getUserByToken(token);
        Bookmark bookmark = bookmarkRepository.findByUser(user);
        Word word = wordRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Word not found"));
        word.getBookmarkList().remove(bookmark);
        bookmark.getWordList().remove(word);
        bookmarkRepository.save(bookmark);
        wordRepository.save(word);
        if (word instanceof ViWord) {
            PersonalWordRequest personalWordRequest = new PersonalWordRequest();
            personalWordRequest.setId(word.getId());
            personalWordRequest.setWord(word.getWord());
            personalWordRequest.setDefine(word.getDefine());
            personalWordRequest.setType(word.getType());
            personalWordRequest.setBookmarkList(word.getBookmarkList());
            personalWordRequest.setPersonalDictionary(word.getPersonalDictionary());
            personalWordRequest.setLang("Vietnamese");
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
            return personalWordRequest;

        }
    }

}
