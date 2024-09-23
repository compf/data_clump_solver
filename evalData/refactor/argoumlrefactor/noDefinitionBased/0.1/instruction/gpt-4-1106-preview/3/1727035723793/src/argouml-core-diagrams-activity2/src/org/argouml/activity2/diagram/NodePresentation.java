package org.argouml.activity2.diagram;

import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.FigGroup;

import java.awt.Dimension;
import java.awt.Rectangle;

public class NodePresentation {

    private FigBasePresentation displayState;
    private final DiagramSettings settings;

    public NodePresentation(Object owner, Rectangle bounds, DiagramSettings settings) {
        this.settings = settings;
        setBounds(bounds);
    }

    public void setDisplayState(FigBasePresentation newDisplayState) {
        this.displayState = newDisplayState;
        displayState.setOwner(getOwner());
    }

    public FigBasePresentation getDisplayState() {
        return displayState;
    }

    public Dimension getMinimumSize() {
        return displayState.getMinimumSize();
    }

    public void positionChildren(Rectangle bounds) {
        if (displayState != null) {
            displayState.setBounds(bounds);
        }
    }

    public void calcBounds(FigGroup figGroup) {
        final Dimension min = getMinimumSize();
        int maxw = Math.max(figGroup.getWidth(), min.width);
        int maxh = Math.max(figGroup.getHeight(), min.height);
        figGroup.setBounds(figGroup.getX(), figGroup.getY(), maxw, maxh);
    }
}
