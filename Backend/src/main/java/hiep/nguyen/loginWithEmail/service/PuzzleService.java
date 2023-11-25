package hiep.nguyen.loginWithEmail.service;


import hiep.nguyen.loginWithEmail.config.JwtService;
import hiep.nguyen.loginWithEmail.entity.PuzzleBoard;
import hiep.nguyen.loginWithEmail.user.UserRepository;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.context.annotation.Scope;
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

    public PuzzleService(BookmarkService bookmarkService, PuzzleBoard puzzleBoard, ObjectFactory<PuzzleBoard> puzzleBoardFactory, UserRepository userRepository, JwtService jwtService) {
        this.bookmarkService = bookmarkService;
        this.puzzleBoard = puzzleBoard;
        this.puzzleBoardFactory = puzzleBoardFactory;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public static <T> List<T> getRandomElements(List<T> list, int numberOfElements) {
        List<T> randomElements = new ArrayList<>();
        Random random = new Random();

        for (int i = 0; i < numberOfElements; i++) {
            int randomIndex = random.nextInt(list.size());
            randomElements.add(list.get(randomIndex));
            list.remove(randomIndex);
        }

        return randomElements;
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

    public boolean endPuzzleBoard() {
        puzzleBoard.setBoard(null);
        return true;
    }

}
