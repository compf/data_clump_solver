package org.argouml.sequence2.diagram;

import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.FigLine;
import org.tigris.gef.presentation.FigRect;

import java.awt.*;
import java.util.LinkedList;
import java.util.List;

public class LifeLineElements {

    private FigLine lineFig;
    private FigRect rectFig;

    private List<FigActivation> activations;
    private List<FigActivation> stackedActivations;

    public LifeLineElements(int x, int y, int width, int height, Color lineColor, int lineWidth) {
        activations = new LinkedList<>();
        stackedActivations = new LinkedList<>();

        rectFig = new FigRect(x, y, width, height);
        rectFig.setFilled(false);
        rectFig.setLineWidth(0);
        lineFig = new FigLine(x + width / 2, y, x + width / 2, y + height, lineColor);
        lineFig.setDashed(true);
        lineFig.setLineWidth(lineWidth);
    }

    public FigLine getLineFig() {
        return lineFig;
    }

    public FigRect getRectFig() {
        return rectFig;
    }

    // Other methods related to activations and stackedActivations would be here
}
