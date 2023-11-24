package hiep.nguyen.loginWithEmail.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import hiep.nguyen.loginWithEmail.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "bookmark")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Bookmark {
    @Id
    @GeneratedValue()
    private Long id;
    @JsonIgnore
    @ManyToMany(mappedBy = "bookmarkList")
    private List<Word> wordList = new ArrayList<>();
    @JsonIgnoreProperties("bookmark")
    @OneToOne(mappedBy = "bookmark")
    private User user;

    public List<Word> getWordList() {
        return wordList;
    }


    public void setWordList(List<Word> wordList) {
        this.wordList = wordList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
