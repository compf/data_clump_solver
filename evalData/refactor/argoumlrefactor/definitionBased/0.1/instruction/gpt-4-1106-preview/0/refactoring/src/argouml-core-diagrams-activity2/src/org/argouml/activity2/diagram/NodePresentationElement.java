package org.argouml.activity2.diagram;

import java.awt.Dimension;
import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;

public class NodePresentationElement {

    private FigBasePresentation displayState;
    private final DiagramSettings settings;
    private DiagramElement nameDiagramElement;
    private Rectangle bounds;

    public NodePresentationElement(Rectangle bounds, DiagramSettings settings) {
        this.bounds = bounds;
        this.settings = settings;
    }

    public void setDisplayState(FigBasePresentation displayState, Object owner) {
        this.displayState = displayState;
        displayState.setOwner(owner);
    }

    public Dimension getMinimumSize() {
        return displayState.getMinimumSize();
    }

    public void setNameDiagramElement(DiagramElement name) {
        this.nameDiagramElement = name;
    }

    public void setBounds(Rectangle bounds) {
        this.bounds = bounds;
        if (displayState != null) {
            displayState.setBounds(bounds);
        }
    }

    public void positionChildren() {
        // TODO: Implement child positioning logic
    }

    public void updateBounds(int x, int y, int width, int height) {
        final Dimension min = getMinimumSize();
        int maxw = Math.max(width, min.width);
        int maxh = Math.max(height, min.height);
        // TODO: Implement bounds update logic
    }
}
