package hiep.nguyen.loginWithEmail.repository;

import hiep.nguyen.loginWithEmail.entity.Bookmark;
import hiep.nguyen.loginWithEmail.entity.FlashCard;
import hiep.nguyen.loginWithEmail.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface FlashcardRepository extends JpaRepository<FlashCard, Long> {
    List<FlashCard> findByUserListIn(List<User> userList);
}
