package hiep.nguyen.loginWithEmail.service;

import org.springframework.stereotype.Service;

import javax.sound.sampled.*;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Base64;

@Service
public class TextToSpeechService {

    public void convertAndPlayTextToSpeech(String text) {
        try {
            // Create a TTS audio clip from text
            Clip clip = AudioSystem.getClip();
            AudioInputStream audioInputStream = getAudioInputStream(text);
            clip.open(audioInputStream);
            clip.start();
        } catch (LineUnavailableException | IOException | UnsupportedAudioFileException e) {
            e.printStackTrace();
        }
    }

    private AudioInputStream getAudioInputStream(String text) throws IOException, UnsupportedAudioFileException, LineUnavailableException {
        // Create an AudioInputStream from text (simplified example)
        byte[] audioData = generateAudioFromText(text);
        ByteArrayInputStream audioStream = new ByteArrayInputStream(audioData);

        AudioFormat format = new AudioFormat(22050, 16, 1, true, false);
        return new AudioInputStream(audioStream, format, audioData.length / format.getFrameSize());
    }

    private byte[] generateAudioFromText(String text) {
        // In a real implementation, you would use a TTS API or library to generate audio from text.
        // For simplicity, this example doesn't actually convert text to speech but plays silence.
        return new byte[0];
    }
}
