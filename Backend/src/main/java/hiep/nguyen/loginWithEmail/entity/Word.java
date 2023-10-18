package hiep.nguyen.loginWithEmail.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "words")
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Word {
    @Id
    @GeneratedValue()
    private long id;
    private String word;
    @Column(columnDefinition = "TEXT")
    private String define;
    private String spelling;

    private String type;

    public Word(Word word) {
        this.id = word.id;
        this.word = word.word;
        this.define = word.define;
        this.spelling = word.spelling;
        this.type = word.type;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getDefine() {
        return define;
    }

    public void setDefine(String define) {
        this.define = define;
    }

    public String getSpelling() {
        return spelling;
    }

    public void setSpelling(String spelling) {
        this.spelling = spelling;
    }
}
