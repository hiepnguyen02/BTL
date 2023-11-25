package hiep.nguyen.loginWithEmail.entity;

import hiep.nguyen.loginWithEmail.controller.PersonalWordController.PersonalWordRequest;
import hiep.nguyen.loginWithEmail.service.BookmarkService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@Scope("prototype")
public class PuzzleBoard {
    private List<List<PuzzleElement>> board = new ArrayList<>();
    private List<PersonalWordRequest> wordList = new ArrayList<>();
    private Map<PersonalWordRequest, List<PuzzleElement>> resultIndexes = new HashMap<>();
    private int score;
    private int totalScore;


    public List<PersonalWordRequest> getWordList() {
        return wordList;
    }

    public void setWordList(List<PersonalWordRequest> wordList) {
        this.wordList = wordList;
    }

    public PuzzleBoard(List<List<PuzzleElement>> board, BookmarkService bookmarkService, int score, int totalScore) {
        this.board = board;
        this.score = score;
        this.totalScore = totalScore;
    }

    public Map<PersonalWordRequest, List<PuzzleElement>> getResultIndexes() {
        return resultIndexes;
    }

    public void setResultIndexes(Map<PersonalWordRequest, List<PuzzleElement>> resultIndexes) {
        this.resultIndexes = resultIndexes;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public int getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(int totalScore) {
        this.totalScore = totalScore;
    }

    public PuzzleBoard() {

    }

    public List<List<PuzzleElement>> getBoard() {
        return board;
    }

    public void setBoard(List<List<PuzzleElement>> board) {
        this.board = board;
    }


    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }


    private boolean checkRowUsedPositions(int rowIndex, int colIndex, PersonalWordRequest word) {
        if (colIndex + word.getWord().length() >= 8) {
            return true;
        }
        for (int k = 0; k < word.getWord().length(); k++) {
            if (board.get(rowIndex).get(colIndex + k).getValue() != '.') {
                return true;
            }
        }
        return false;
    }

    private boolean checkColUsedPositions(int rowIndex, int colIndex, PersonalWordRequest word) {
        if (rowIndex + word.getWord().length() >= 8) {
            return true;
        }
        for (int k = 0; k < word.getWord().length(); k++) {
            if (board.get(rowIndex + k).get(colIndex).getValue() != '.') {
                return true;
            }
        }
        return false;
    }


    public List<List<PuzzleElement>> generateBoard() {
        for (int i = 0; i < 8; i++) {
            List<PuzzleElement> row = new ArrayList<>();
            for (int j = 0; j < 8; j++) {
                row.add(new PuzzleElement('.', false, i, j, false));
            }
            board.add(row);
        }
        Random random = new Random();
        for (PersonalWordRequest word : wordList) {
            int orientation = random.nextInt(2);
            int rowIndex = random.nextInt(8);
            int colIndex = random.nextInt(8);

            if (orientation == 0) {
                if (word.getWord().length() <= 8) {
                    while (checkRowUsedPositions(rowIndex, colIndex, word)) {
                        colIndex = random.nextInt(8);
                        rowIndex = random.nextInt(8);
                    }
                    List<PuzzleElement> puzzleElementList = new ArrayList<>();
                    for (int k = 0; k < word.getWord().length(); k++) {
                        (board.get(rowIndex).get(colIndex + k)).setValue(word.getWord().charAt(k));
                        puzzleElementList.add(board.get(rowIndex).get(colIndex + k));
                    }
                    totalScore++;
                    resultIndexes.put(word, puzzleElementList);

                }

            } else {
                if (word.getWord().length() <= 8) {
                    while (checkColUsedPositions(rowIndex, colIndex, word)) {
                        rowIndex = random.nextInt(8);
                        colIndex = random.nextInt(8);
                    }
                    List<PuzzleElement> puzzleElementList = new ArrayList<>();
                    for (int k = 0; k < word.getWord().length(); k++) {
                        (board.get(rowIndex + k).get(colIndex)).setValue(word.getWord().charAt(k));
                        puzzleElementList.add(board.get(rowIndex + k).get(colIndex));
                    }
                    totalScore++;
                    resultIndexes.put(word, puzzleElementList);
                }
            }
        }
        for (int i = 0; i < 8; i++) {
            List<PuzzleElement> row = new ArrayList<>();
            for (int j = 0; j < 8; j++) {
                char randomLetter = generateRandomLetter();
                if (board.get(i).get(j).getValue() == '.') {
                    board.get(i).get(j).setValue(randomLetter);
                }
            }
            board.add(row);
        }

        return board;
    }

    public PuzzleBoard checkSubmission() {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j < 8; j++) {
                if (board.get(i).get(j).isSelected()) {
                    if (!board.get(i).get(j).isCorrected()) {
                        stringBuilder.append(board.get(i).get(j).getValue());
                    }
                }
            }

        }

        for (PersonalWordRequest personalWordRequest : wordList) {
            if (personalWordRequest.getWord().equals(stringBuilder.toString())) {
                List<PuzzleElement> puzzleElementList = resultIndexes.get(personalWordRequest);
                puzzleElementList.forEach(value -> board.get(value.getRowIndex()).get(value.getColIndex()).setCorrected(true));
                score++;
            }

        }
        return this;
    }

    public PuzzleBoard selectElement(int rowIndex, int colIndex) {
        board.get(rowIndex).get(colIndex).setSelected(!board.get(rowIndex).get(colIndex).isSelected());
        return this;
    }

    private char generateRandomLetter() {
        Random random = new Random();
        return (char) (random.nextInt(26) + 'A');
    }
}
