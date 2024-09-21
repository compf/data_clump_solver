package org.argouml.sequence2.diagram;

import java.util.List;
import org.tigris.gef.presentation.FigLine;
import org.tigris.gef.presentation.FigRect;
import java.util.LinkedList;
public class DiagramElementLayout {
    private FigLine lineFig;
    private FigRect rectFig;
    private List<FigActivation> activations;
    private List<FigActivation> stackedActivations;

    public DiagramElementLayout(FigLine lineFig, FigRect rectFig) {
        this.lineFig = lineFig;
        this.rectFig = rectFig;
        this.activations = new LinkedList<>();
        this.stackedActivations = new LinkedList<>();
    }

    // Additional methods to manipulate activations and stackedActivations
}
