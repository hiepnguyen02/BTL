package hiep.nguyen.loginWithEmail.repository;

import hiep.nguyen.loginWithEmail.entity.PersonalDictionary;
import hiep.nguyen.loginWithEmail.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonalDictionaryRepository extends JpaRepository<PersonalDictionary, Long> {
    PersonalDictionary findByUser(User user);

}
