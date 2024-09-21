package org.argouml.activity2.diagram;

import org.tigris.gef.presentation.Fig;

/**
 * NodePresentationFigures groups figures representing the node presentation.
 */
public class NodePresentationFigures {

    private Fig displayState;

    public NodePresentationFigures(Fig displayState) {
        this.displayState = displayState;
    }

    public Fig getDisplayState() {
        return displayState;
    }
}
