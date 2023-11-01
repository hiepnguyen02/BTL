package hiep.nguyen.loginWithEmail.entity;

import hiep.nguyen.loginWithEmail.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "personalDictionary")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PersonalDictionary {
    @Id
    @GeneratedValue()
    private Long id;

    @OneToMany(mappedBy = "personalDictionary", cascade = CascadeType.ALL)
    private List<Word> personalList = new ArrayList<>();
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public List<Word> getPersonalList() {
        return personalList;
    }

    public void setPersonalList(List<Word> personalList) {
        this.personalList = personalList;
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
