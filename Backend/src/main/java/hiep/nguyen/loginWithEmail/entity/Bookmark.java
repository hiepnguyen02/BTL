package hiep.nguyen.loginWithEmail.entity;

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
    @JsonIgnoreProperties("bookmark")

    @OneToMany(mappedBy = "bookmark", cascade = CascadeType.ALL)
    private List<Word> bookmarkList = new ArrayList<>();
    @OneToOne(mappedBy = "bookmark")
    private User user;

    public List<Word> getBookmarkList() {
        return bookmarkList;
    }

    public void setBookmarkList(List<Word> bookmarkList) {
        this.bookmarkList = bookmarkList;
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
