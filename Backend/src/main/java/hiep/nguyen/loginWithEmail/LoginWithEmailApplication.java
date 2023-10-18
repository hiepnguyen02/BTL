package hiep.nguyen.loginWithEmail;

import hiep.nguyen.loginWithEmail.controller.WordController;
import hiep.nguyen.loginWithEmail.repository.WordRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LoginWithEmailApplication {
    private WordController wordController;


    public static void main(String[] args) {
        SpringApplication.run(LoginWithEmailApplication.class, args);
    }

}
