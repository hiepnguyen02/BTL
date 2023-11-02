package hiep.nguyen.loginWithEmail.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("ENGLISH")
public class EngWord extends Word {
    private String spelling;


    public EngWord(EngWord engWord) {
        super(engWord.getId(), engWord.getWord(), engWord.getDefine(), engWord.getType(),
                engWord.getPersonalDictionary(), engWord.getBookmark());
        this.spelling = engWord.spelling;
    }

    public String getSpelling() {
        return spelling;
    }

    public void setSpelling(String spelling) {
        this.spelling = spelling;
    }
}
