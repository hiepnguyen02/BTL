package hiep.nguyen.loginWithEmail.service;


import hiep.nguyen.loginWithEmail.config.JwtService;
import hiep.nguyen.loginWithEmail.controller.PersonalWordController.PersonalWordRequest;
import hiep.nguyen.loginWithEmail.entity.*;
import hiep.nguyen.loginWithEmail.repository.BookmarkRepository;
import hiep.nguyen.loginWithEmail.repository.WordRepository;
import hiep.nguyen.loginWithEmail.user.User;
import hiep.nguyen.loginWithEmail.user.UserRepository;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PuzzleService {
    private final BookmarkService bookmarkService;
    private PuzzleBoard puzzleBoard;
    private final ObjectFactory<PuzzleBoard> puzzleBoardFactory;
    private Map<Integer, PuzzleBoard> userPuzzleBoards = new HashMap<>();
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final WordRepository wordRepository;
    private final BookmarkRepository bookmarkRepository;

    public PuzzleService(BookmarkService bookmarkService, PuzzleBoard puzzleBoard, ObjectFactory<PuzzleBoard> puzzleBoardFactory, UserRepository userRepository, JwtService jwtService, WordRepository wordRepository, BookmarkRepository bookmarkRepository) {
        this.bookmarkService = bookmarkService;
        this.puzzleBoard = puzzleBoard;
        this.puzzleBoardFactory = puzzleBoardFactory;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.wordRepository = wordRepository;
        this.bookmarkRepository = bookmarkRepository;
    }

    private static <T> List<T> getRandomElements(List<T> list, int numberOfElements) {
        List<T> randomElements = new ArrayList<>();
        Random random = new Random();

        for (int i = 0; i < numberOfElements; i++) {
            int randomIndex = random.nextInt(list.size());
            randomElements.add(list.get(randomIndex));
            list.remove(randomIndex);
        }

        return randomElements;
    }

    private List<PersonalWordRequest> getRandomFromDictionary(long number) throws Exception {

        List<PersonalWordRequest> result = new ArrayList<>();
        Random random = new Random();
        long randomIndex = random.nextLong(1000);
        Word word = wordRepository.findById(randomIndex).orElseThrow(() -> new Exception("Word not found"));
        while (result.size() < number) {
            System.out.println(randomIndex);

            while (!(word instanceof EngWord) && word.getWord().length() > 6 && word.getWord().length() < 3) {
                randomIndex = random.nextLong(1000);
                word = wordRepository.findById(randomIndex).orElseThrow(() -> new Exception("Word not found"));
                System.out.println(word.getWord() + " " + word.getWord().length());
            }
            if (word.getWord().length() < 6 && word.getWord().length() >= 3) {
                PersonalWordRequest personalWordRequest = new PersonalWordRequest();
                personalWordRequest.setWord(word.getWord());
                personalWordRequest.setId(word.getId());
                personalWordRequest.setWord(word.getWord());
                personalWordRequest.setDefine(word.getDefine());
                personalWordRequest.setType(word.getType());
                personalWordRequest.setBookmarkList(word.getBookmarkList());
                personalWordRequest.setPersonalDictionary(word.getPersonalDictionary());
                personalWordRequest.setLang("English");
                personalWordRequest.setSpelling(((EngWord) word).getSpelling());
                result.add(personalWordRequest);
            }
            randomIndex = random.nextLong(1000);
            word = wordRepository.findById(randomIndex).orElseThrow(() -> new Exception("Word not found"));


        }

        return result;
    }

    public PuzzleBoard generateBoardFromDictionary(String token) throws Exception {
        System.out.println("start----------");
        Integer userId = userRepository.findByEmail(jwtService.extractUsername(token))
                .orElseThrow(() -> new UsernameNotFoundException("User not found")).getId();
        puzzleBoard = puzzleBoardFactory.getObject();
        puzzleBoard.setWordList(getRandomFromDictionary(3));

        puzzleBoard.generateBoard();

        userPuzzleBoards.put(userId, puzzleBoard);

        return puzzleBoard;
    }


    public PuzzleBoard generateBoard(String token) {
        Integer userId = userRepository.findByEmail(jwtService.extractUsername(token))
                .orElseThrow(() -> new UsernameNotFoundException("User not found")).getId();
        puzzleBoard = puzzleBoardFactory.getObject();
        puzzleBoard.setWordList(getRandomElements(bookmarkService.getBookmark(token), 3));
        puzzleBoard.generateBoard();
        userPuzzleBoards.put(userId, puzzleBoard);
        return puzzleBoard;
    }

    public PuzzleBoard getPuzzleBoard(String token) {
        Integer userId = userRepository.findByEmail(jwtService.extractUsername(token))
                .orElseThrow(() -> new UsernameNotFoundException("User not found")).getId();
        return userPuzzleBoards.get(userId);
    }

    public PuzzleBoard selectElementService(String token, int rowIndex, int colIndex) {

        Integer userId = userRepository.findByEmail(jwtService.extractUsername(token))
                .orElseThrow(() -> new UsernameNotFoundException("User not found")).getId();
        return userPuzzleBoards.get(userId).selectElement(rowIndex, colIndex);
    }

    public PuzzleBoard checkSubmissionService(String token) {
        Integer userId = userRepository.findByEmail(jwtService.extractUsername(token))
                .orElseThrow(() -> new UsernameNotFoundException("User not found")).getId();
        return userPuzzleBoards.get(userId).checkSubmission();
    }

    public PuzzleBoard addToBookmarkFromPuzzle(String token, long id) {
        User user = userRepository.findByEmail(jwtService.extractUsername(token))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Bookmark bookmark = bookmarkRepository.findByUser(user);
        bookmarkService.addWordToBookMark(token, id);
        PuzzleBoard puzzleBoard1 = userPuzzleBoards.get(user.getId());
        puzzleBoard1.getWordList().stream().filter(value -> value.getId() == id)
                .forEach(value -> {
                    List<Bookmark> bookmarkList = value.getBookmarkList();
                    bookmarkList.add(bookmark);
                    value.setBookmarkList(bookmarkList);
                });
        return puzzleBoard1;
    }


    public boolean endPuzzleBoard() {
        puzzleBoard.setBoard(null);
        return true;
    }

}
