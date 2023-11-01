package hiep.nguyen.loginWithEmail.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("VIETNAMESE")
@Builder
public class ViWord extends Word {

    public ViWord() {

    }

    public ViWord(ViWord word) {
        super(word);
    }


}
