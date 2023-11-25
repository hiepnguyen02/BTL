package hiep.nguyen.loginWithEmail.entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class PuzzleElement {
    private char value;
    private boolean isCorrected;
    private int rowIndex;
    private int colIndex;
    private boolean isSelected;

    public boolean isSelected() {
        return isSelected;
    }

    public void setSelected(boolean selected) {
        isSelected = selected;
    }

    public int getRowIndex() {
        return rowIndex;
    }

    public void setRowIndex(int rowIndex) {
        this.rowIndex = rowIndex;
    }

    public int getColIndex() {
        return colIndex;
    }

    public void setColIndex(int colIndex) {
        this.colIndex = colIndex;
    }

    public PuzzleElement() {
     
    }

    public PuzzleElement(PuzzleElement other) {
        this.value = other.value;
        this.isCorrected = other.isCorrected;
        this.rowIndex = other.rowIndex;
        this.colIndex = other.colIndex;
        this.isSelected = other.isSelected;
    }

    public PuzzleElement(char value, boolean isCorrected, int rowIndex, int colIndex, boolean isSelected) {
        this.value = value;
        this.isCorrected = isCorrected;
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.isSelected = isSelected;
    }

    public char getValue() {
        return value;
    }

    public void setValue(char value) {
        this.value = value;
    }

    public boolean isCorrected() {
        return isCorrected;
    }

    public void setCorrected(boolean corrected) {
        isCorrected = corrected;
    }

    public PuzzleElement(char value, boolean isCorrected) {
        this.value = value;
        this.isCorrected = isCorrected;
    }
}
