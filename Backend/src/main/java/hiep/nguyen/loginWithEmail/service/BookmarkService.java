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

import java.util.List;

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


    public Word addWordToBookMark(String token, Word word) {
        User user = userService.getUserByToken(token);
        Bookmark bookmark = bookmarkRepository.findByUser(user);
        if (word instanceof ViWord) {
            ViWord newWord = new ViWord((ViWord) word);
            newWord.setBookmark(bookmark);
            return wordRepository.save(newWord);
        } else {
            EngWord newWord = new EngWord((EngWord) word);
            newWord.setBookmark(bookmark);
            return wordRepository.save(newWord);
        }

    }

    public List<Word> getBookmark(String token) {
        User user = userService.getUserByToken(token);
        Bookmark bookmark = bookmarkRepository.findByUser(user);
        return wordRepository.findByBookmark(bookmark);

    }

    public void deleteWordFromBookmark(Long id) {
        wordRepository.deleteById(id);
    }

}
