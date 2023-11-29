package hiep.nguyen.loginWithEmail.service;

import hiep.nguyen.loginWithEmail.controller.PersonalWordController.PersonalWordRequest;
import hiep.nguyen.loginWithEmail.entity.*;
import hiep.nguyen.loginWithEmail.repository.FlashcardRepository;
import hiep.nguyen.loginWithEmail.repository.PersonalDictionaryRepository;
import hiep.nguyen.loginWithEmail.repository.WordRepository;
import hiep.nguyen.loginWithEmail.user.User;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@Service
public class WordService {
    private final String ENGSOURCE = "src/main/java/hiep/nguyen/loginWithEmail/sourceFile/anhviet109K.txt";
    private final String VISOURCE = "src/main/java/hiep/nguyen/loginWithEmail/sourceFile/vietanh.txt";
    private final WordRepository wordRepository;
    private final UserService userService;
    private final PersonalDictionaryRepository personalDictionaryRepository;


    @Autowired
    public WordService(WordRepository wordRepository, UserService userService, PersonalDictionaryService dictionaryService, PersonalDictionaryRepository personalDictionaryRepository, FlashcardRepository flashcardRepository) {
        this.wordRepository = wordRepository;
        this.userService = userService;

        this.personalDictionaryRepository = personalDictionaryRepository;

    }

    public Word createWord(Word word) {
        return wordRepository.save(word);
    }

    public List<Word> searchByNameStartingWith(String prefix) {
        return wordRepository.findByWordStartingWithAndPersonalDictionaryIsNull(prefix);
    }

    public List<PersonalWordRequest> searchByNameStartingWithByUser(String prefix, String token) {
        User user = userService.getUserByToken(token);
        PersonalDictionary personalDictionary = personalDictionaryRepository.findByUser(user);
        List<Word> list = wordRepository.findByWordStartingWithAndPersonalDictionary(prefix, personalDictionary);
        list.addAll(wordRepository.findByWordStartingWithAndPersonalDictionaryIsNull(prefix));
        List<PersonalWordRequest> result = new ArrayList<>();
        for (Word word : list) {
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
        }
        return result;
    }


    //Read words from txt files, turn on if you need to get new data from txt,
    //Remember to set ddl-auto: create-drop


    public void loadEngWordFromFile() throws IOException {
        FileReader fis = new FileReader(ENGSOURCE);
        BufferedReader br = new BufferedReader(fis);
        String line;
        EngWord word = new EngWord();

        word.setDefine("");
        while ((line = br.readLine()) != null) {
            if (line.length() != 1) {
                if (line.startsWith("@")) {
                    if (word.getWord() != null) {
                        EngWord word1 = new EngWord(word);
                        wordRepository.save(word1);
                        word.setDefine("");
                    }
                    int index = line.indexOf(" /");
                    if (index != -1 && line.indexOf(" / ") == -1) {
                        word.setWord(line.substring(1, index));
                        word.setSpelling(line.substring(index, line.length()));
                    } else {
                        word.setWord(line.substring(1, line.length()));
                        word.setSpelling(null);
                    }

                }
                if (line.startsWith("*")) {
                    word.setType(line.substring(1, line.length()));
                }
                if (line.startsWith("-")) {
                    word.setDefine(word.getDefine() + line.substring(1, line.length()));
                }
                if (line.startsWith("=")) {

                    int index = line.indexOf("+");
                    if (index != -1) {
                        word.setDefine(word.getDefine() + line.substring(1, index));
                        word.setDefine(word.getDefine() + "\n" + line.substring(index + 1, line.length()));

                    } else {
                        word.setDefine(word.getDefine() + "\n " + line.substring(1, line.length()));

                    }


                }
                if (line.startsWith("!")) {

                    word.setDefine(word.getDefine() + "\n" + line.substring(1, line.length()));

                }

            }
        }
        fis.close();
        br.close();

    }


    public void loadViWordFromFile() throws IOException {
        FileReader fis = new FileReader(VISOURCE);
        BufferedReader br = new BufferedReader(fis);
        String line;
        ViWord word = new ViWord();

        word.setDefine("");
        while ((line = br.readLine()) != null) {
            if (line.length() != 1) {
                if (line.startsWith("@")) {
                    if (word.getWord() != null) {
                        ViWord word1 = new ViWord(word);
                        wordRepository.save(word1);
                        word.setDefine("");
                    }
                    word.setWord(line.substring(1, line.length()));

                }
                if (line.startsWith("*")) {
                    word.setType(line.substring(1, line.length()));
                }
                if (line.startsWith("-")) {
                    word.setDefine(word.getDefine() + line.substring(1, line.length()));
                }
                if (line.startsWith("=")) {

                    int index = line.indexOf("+");
                    if (index != -1) {
                        word.setDefine(word.getDefine() + line.substring(1, index));
                        word.setDefine(word.getDefine() + "\n" + line.substring(index + 1, line.length()));

                    } else {
                        word.setDefine(word.getDefine() + "\n" + line.substring(1, line.length()));

                    }


                }
                if (line.startsWith("!")) {

                    word.setDefine(word.getDefine() + "\n" + line.substring(1, line.length()));

                }

            }
        }
        fis.close();
        br.close();


    }

//    @PostConstruct
//    @Transactional
//    public void loadWordFromFile() throws IOException {
//        loadEngWordFromFile();
//        loadViWordFromFile();
//    }


}
