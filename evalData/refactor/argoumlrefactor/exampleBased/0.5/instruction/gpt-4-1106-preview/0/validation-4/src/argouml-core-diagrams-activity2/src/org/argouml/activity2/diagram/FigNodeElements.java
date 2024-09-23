package org.argouml.activity2.diagram;

import java.awt.Dimension;
import org.argouml.uml.diagram.DiagramSettings;
import org.argouml.uml.diagram.ui.FigBasePresentation;
import org.argouml.uml.diagram.DiagramElement;

public class FigNodeElements {

    private FigBasePresentation displayState;
    private final DiagramSettings settings;
    private DiagramElement nameDiagramElement;

    public FigNodeElements(DiagramSettings settings) {
        this.settings = settings;
    }

    public void setDisplayState(FigBasePresentation displayState) {
        this.displayState = displayState;
        displayState.setOwner(getOwner());
    }

    public void setNameDiagramElement(DiagramElement name) {
        this.nameDiagramElement = name;
    }

    public Dimension getMinimumSize() {
        return displayState.getMinimumSize();
    }

    // Additional functionality can be added here
}