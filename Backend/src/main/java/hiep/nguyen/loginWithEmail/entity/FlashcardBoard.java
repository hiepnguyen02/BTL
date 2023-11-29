package hiep.nguyen.loginWithEmail.entity;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Scope("prototype")
public class FlashcardBoard {
    List<TopicCard> topicCardList = new ArrayList<>();
    private float completedPercent = 0;

    public List<TopicCard> getTopicCardList() {
        return topicCardList;
    }

    public void setTopicCardList(List<TopicCard> topicCardList) {
        this.topicCardList = topicCardList;
    }

    public float getCompletedPercent() {
        return completedPercent;
    }

    public void setCompletedPercent() {
        int completedCount = 0;
        int totalCount = 0;
        for (TopicCard topicCard : topicCardList) {
            for (FlashCard flashCard : topicCard.getFlashCardList()) {
                totalCount++;
                if (flashCard.isLearned()) {
                    completedCount++;
                }
            }
        }
        this.completedPercent = (float) completedCount / totalCount;
    }
}
