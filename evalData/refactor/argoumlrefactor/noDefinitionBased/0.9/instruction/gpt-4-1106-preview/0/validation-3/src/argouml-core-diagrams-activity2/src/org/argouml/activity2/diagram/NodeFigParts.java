package org.argouml.activity2.diagram;

import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.FigBasePresentation;
import org.argouml.uml.diagram.ui.DiagramElement;

public class NodeFigParts {

    private FigBasePresentation displayState;
    private DiagramSettings settings;
    private DiagramElement nameDiagramElement;

    public NodeFigParts(FigBasePresentation displayState, DiagramSettings settings, DiagramElement nameDiagramElement) {
        this.displayState = displayState;
        this.settings = settings;
        this.nameDiagramElement = nameDiagramElement;
    }

    // Additional methods here
}