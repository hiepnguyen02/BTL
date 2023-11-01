package hiep.nguyen.loginWithEmail.auth;

import hiep.nguyen.loginWithEmail.config.JwtService;
import hiep.nguyen.loginWithEmail.entity.PersonalDictionary;
import hiep.nguyen.loginWithEmail.repository.PersonalDictionaryRepository;
import hiep.nguyen.loginWithEmail.service.PersonalDictionaryService;
import hiep.nguyen.loginWithEmail.user.Role;
import hiep.nguyen.loginWithEmail.user.User;
import hiep.nguyen.loginWithEmail.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Dictionary;
import java.util.logging.Logger;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;
    private final PersonalDictionaryRepository personalDictionaryRepository;

    public AuthenticationResponse register(RegisterRequest request) {

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        PersonalDictionary personalDictionary = new PersonalDictionary();
        personalDictionary.setUser(user);
        personalDictionaryRepository.save(personalDictionary);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
