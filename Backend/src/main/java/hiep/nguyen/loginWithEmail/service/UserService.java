package hiep.nguyen.loginWithEmail.service;

import hiep.nguyen.loginWithEmail.config.JwtService;
import hiep.nguyen.loginWithEmail.user.User;
import hiep.nguyen.loginWithEmail.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;

    public User getUserByToken(String token) {
        return userRepository.findByEmail(jwtService.extractUsername(token))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    }
}
