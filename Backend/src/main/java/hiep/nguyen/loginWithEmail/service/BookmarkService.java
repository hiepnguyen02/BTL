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


    public Word addWordToBookMark(String token, Long id) {
        User user = userService.getUserByToken(token);
        Bookmark bookmark = bookmarkRepository.findByUser(user);
        Word word = wordRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Word not found"));
        word.getBookmarkList().add(bookmark);
        bookmark.getWordList().add(word);
        bookmarkRepository.save(bookmark);
        return wordRepository.save(word);

    }

    public List<Word> getBookmark(String token) {
        User user = userService.getUserByToken(token);
        Bookmark bookmark = bookmarkRepository.findByUser(user);
        return bookmark.getWordList();

    }

    public void deleteWordFromBookmark(String token, Long id) {
        User user = userService.getUserByToken(token);
        Bookmark bookmark = bookmarkRepository.findByUser(user);
        Word word = wordRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("Word not found"));
        word.getBookmarkList().remove(bookmark);
        bookmarkRepository.save(bookmark);
    }

}
