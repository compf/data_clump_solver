package org.argouml.activity2.diagram;

import java.awt.Dimension;
import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;

public class NodePresentationElements {

    private FigBasePresentation displayState;
    private DiagramSettings settings;
    private DiagramElement nameDiagramElement;

    public NodePresentationElements() {}

    public void setSettings(DiagramSettings settings) {
        this.settings = settings;
    }

    public void setDisplayState(FigBasePresentation displayState, Object owner) {
        this.displayState = displayState;
        displayState.setOwner(owner);
    }

    public Dimension getMinimumSize() {
        return displayState.getMinimumSize();
    }

    public boolean hasDisplayState() {
        return displayState != null;
    }

    public void setBounds(Rectangle bounds) {
        displayState.setBounds(bounds);
    }

    // Additional methods
}
