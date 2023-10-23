package hiep.nguyen.loginWithEmail.controller;

import hiep.nguyen.loginWithEmail.service.TextToSpeechService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/pronounce")
public class TextToSpeechController {
    @Autowired
    private TextToSpeechService textToSpeechService;

    @PostMapping("/text-to-speech")
    public String textToSpeech(@RequestParam String text) {
        textToSpeechService.convertAndPlayTextToSpeech(text);
        return "Text converted to speech and played.";
    }
}
