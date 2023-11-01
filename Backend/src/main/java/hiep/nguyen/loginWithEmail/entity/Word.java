package hiep.nguyen.loginWithEmail.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.Dictionary;

@Entity
@Table(name = "words")
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class Word {
    @Id
    @GeneratedValue()
    private long id;
    private String word;
    @Column(columnDefinition = "TEXT")
    private String define;


    private String type;
    @ManyToOne
    @JoinColumn(name = "dictionary_id")
    private PersonalDictionary personalDictionary;

    public PersonalDictionary getPersonalDictionary() {
        return personalDictionary;
    }

    public void setPersonalDictionary(PersonalDictionary personalDictionary) {
        this.personalDictionary = personalDictionary;
    }

    public Word(Word word) {
        this.id = word.id;
        this.word = word.word;
        this.define = word.define;
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

}
