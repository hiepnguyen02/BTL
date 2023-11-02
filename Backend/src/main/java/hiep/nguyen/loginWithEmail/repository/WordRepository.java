package hiep.nguyen.loginWithEmail.repository;

import hiep.nguyen.loginWithEmail.entity.Bookmark;
import hiep.nguyen.loginWithEmail.entity.PersonalDictionary;
import hiep.nguyen.loginWithEmail.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
    List<Word> findByWordStartingWithAndPersonalDictionaryIsNullAndBookmarkIsNull(String prefix);

    List<Word> findByWordStartingWithAndBookmarkIsNullAndPersonalDictionaryIsNullOrPersonalDictionary(String prefix, PersonalDictionary personalDictionary);

    List<Word> findByPersonalDictionary(PersonalDictionary personalDictionary);

    List<Word> findByBookmark(Bookmark bookmark);
}
