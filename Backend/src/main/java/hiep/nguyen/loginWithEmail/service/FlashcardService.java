package hiep.nguyen.loginWithEmail.service;

import hiep.nguyen.loginWithEmail.config.JwtService;
import hiep.nguyen.loginWithEmail.entity.FlashCard;
import hiep.nguyen.loginWithEmail.entity.FlashcardBoard;
import hiep.nguyen.loginWithEmail.entity.PuzzleBoard;
import hiep.nguyen.loginWithEmail.entity.TopicCard;
import hiep.nguyen.loginWithEmail.repository.FlashcardRepository;
import hiep.nguyen.loginWithEmail.user.User;
import hiep.nguyen.loginWithEmail.user.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.*;

@Service
public class FlashcardService {
    private FlashcardBoard flashcardBoard;
    private final ObjectFactory<FlashcardBoard> flashcardBoardObjectFactory;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final FlashcardRepository flashcardRepository;
    private final String FLASHCARD = "src/main/java/hiep/nguyen/loginWithEmail/sourceFile/flashCard.txt";
    private Map<Integer, FlashcardBoard> userFlashcardBoardHashMap = new HashMap<>();

    public FlashcardService(ObjectFactory<FlashcardBoard> flashcardBoardObjectFactory, UserRepository userRepository, JwtService jwtService, FlashcardRepository flashcardRepository) {
        this.flashcardBoardObjectFactory = flashcardBoardObjectFactory;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.flashcardRepository = flashcardRepository;
    }

    public void createFlashcardBoardForUser(User user) {
        flashcardBoard = flashcardBoardObjectFactory.getObject();
        List<FlashCard> allFlashCard = flashcardRepository.findAll();
        List<TopicCard> topicCardList = new ArrayList<>();
        ArrayList<User> userList = new ArrayList<>();
        userList.add(user);
        List<FlashCard> flashCardList1 = flashcardRepository.findByUserListIn(userList);
        for (int i = 1; i <= 10; i++) {
            TopicCard topicCard = new TopicCard();
            ArrayList<FlashCard> flashCardList = new ArrayList<>();
            for (FlashCard flashCard : allFlashCard) {

                if (flashCard.getTopic().startsWith(i + ".")) {


                    if (topicCard.getName().length() == 0) topicCard.setName(flashCard.getTopic());
                    if (flashCardList1.stream().filter(value -> value.getId() == flashCard.getId()).toArray().length != 0) {
                        flashCard.setLearned(true);
                    }

                    flashCardList.add(flashCard);
                }


            }
            topicCard.setFlashCardList(flashCardList);
            topicCard.setCompletedPercent();
            topicCardList.add(topicCard);


        }
        flashcardBoard.setTopicCardList(topicCardList);
        flashcardBoard.setCompletedPercent();
        userFlashcardBoardHashMap.put(user.getId(), flashcardBoard);

    }

    public FlashcardBoard addLearnedWord(String token, Long id) throws Exception {
        User user = userRepository.findByEmail(jwtService.extractUsername(token))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        flashcardBoard = userFlashcardBoardHashMap.get(user.getId());
        FlashCard flashCard = flashcardRepository.findById(id).orElseThrow(() -> new Exception("Flashcard not found"));
        List<User> userList = flashCard.getUserList();
        userList.add(user);
        flashCard.setUserList(userList);
        flashcardRepository.save(flashCard);
        flashcardBoard.getTopicCardList().forEach(value -> {

            value.getFlashCardList().forEach(value1 -> {
                if (Objects.equals(value1.getId(), flashCard.getId())) {
                    value1.setLearned(true);
                }
            });
            value.setCompletedPercent();
        });
        flashcardBoard.setCompletedPercent();
        return flashcardBoard;
    }

    public FlashcardBoard removeLearnedWord(String token, Long id) throws Exception {
        User user = userRepository.findByEmail(jwtService.extractUsername(token))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        flashcardBoard = userFlashcardBoardHashMap.get(user.getId());
        FlashCard flashCard = flashcardRepository.findById(id).orElseThrow(() -> new Exception("Flashcard not found"));
        List<User> userList = flashCard.getUserList();
        userList.remove(user);
        flashCard.setUserList(userList);
        flashcardRepository.save(flashCard);
        flashcardBoard.getTopicCardList().forEach(value -> {

            value.getFlashCardList().forEach(value1 -> {
                if (Objects.equals(value1.getId(), flashCard.getId())) {
                    value1.setLearned(false);
                }
            });
            value.setCompletedPercent();
        });
        flashcardBoard.setCompletedPercent();
        return flashcardBoard;
    }

    public FlashcardBoard getFlashcardBoard(String token) {

        Integer userId = userRepository.findByEmail(jwtService.extractUsername(token))
                .orElseThrow(() -> new UsernameNotFoundException("User not found")).getId();
        flashcardBoard = userFlashcardBoardHashMap.get(userId);
        return flashcardBoard;
    }


//    @PostConstruct
//
//    public void loadFlashcardFromFile() throws IOException {
//        File file = new File(FLASHCARD);
//        Scanner scanner = new Scanner(file);
//        String nextLine = scanner.nextLine();
//        String topic = nextLine;
//        while (scanner.hasNextLine()) {
//
//            if (nextLine.startsWith("\t")) {
//                int index1 = nextLine.indexOf(" (");
//                int index2 = nextLine.indexOf("/");
//                int index3 = nextLine.indexOf("/ ");
//                int index4 = nextLine.indexOf(")");
//                int index5 = nextLine.indexOf("- ");
//
////                System.out.println(nextLine.substring(2, index1) + " "
////                        + nextLine.substring(index2, index3 + 1) + " "
////                        + nextLine.substring(index1 + 2, index4) + " "
////                        + nextLine.substring(index5 + 2) + " "
////                        + topic);
//                FlashCard flashCard = new FlashCard(nextLine.substring(3, index1),
//                        nextLine.substring(index2, index3 + 1),
//                        nextLine.substring(index1 + 2, index4),
//                        nextLine.substring(index5 + 2),
//                        false,
//                        topic);
//
//                flashcardRepository.save(flashCard);
//            } else {
//                topic = nextLine;
//            }
//            nextLine = scanner.nextLine();
//        }
//        List<User> userList = userRepository.findAll();
//        for (User user : userList) {
//            createFlashcardBoardForUser(user);
//        }
//
//    }

    @PostConstruct

    public void initialFlash() throws IOException {
        List<User> userList = userRepository.findAll();
        for (User user : userList) {
            createFlashcardBoardForUser(user);
        }

    }

}
