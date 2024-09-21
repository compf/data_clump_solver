package org.argouml.activity2.diagram;

import java.awt.Dimension;
import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;

public class FigBaseNodeComponents {
    private FigBasePresentation displayState;
    private DiagramElement nameDiagramElement;

    public FigBaseNodeComponents(Rectangle bounds, DiagramSettings settings) {
        // Initialize components
    }

    public void setDisplayState(FigBasePresentation displayState, Object owner) {
        this.displayState = displayState;
        this.displayState.setOwner(owner);
    }

    public FigBasePresentation getDisplayState() {
        return displayState;
    }

    public void setNameDiagramElement(DiagramElement nameDiagramElement) {
        this.nameDiagramElement = nameDiagramElement;
    }

    public Dimension getMinimumSize() {
        return displayState.getMinimumSize();
    }
}