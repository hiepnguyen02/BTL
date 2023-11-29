package hiep.nguyen.loginWithEmail.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class TopicCard {
    private List<FlashCard> flashCardList = new ArrayList<>();
    private String name = "";
    private float completedPercent = 0;

    public float getCompletedPercent() {
        return completedPercent;
    }

    public void setCompletedPercent() {
        int compeletedCount = 0;
        for (FlashCard flashCard : flashCardList) {
            if (flashCard.isLearned()) {
                compeletedCount++;
            }
        }
        this.completedPercent = (float) compeletedCount / flashCardList.size();


    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<FlashCard> getFlashCardList() {
        return flashCardList;
    }

    public void setFlashCardList(List<FlashCard> flashCardList) {
        this.flashCardList = flashCardList;
    }


}
