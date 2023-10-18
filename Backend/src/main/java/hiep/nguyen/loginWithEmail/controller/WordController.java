package hiep.nguyen.loginWithEmail.controller;

import hiep.nguyen.loginWithEmail.entity.Word;
import hiep.nguyen.loginWithEmail.repository.WordRepository;
import hiep.nguyen.loginWithEmail.service.WordService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/word")
public class WordController {
    @Autowired
    private WordService wordService;

    @PostMapping("/create")
    public Word createWord(@RequestBody Word word) {
        return wordService.createWord(word);
    }

    @GetMapping("/search")
    public List<Word> search(@RequestParam String prefix) {
        return wordService.searchByNameStartingWith(prefix);

    }


}
