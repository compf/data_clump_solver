package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import java.util.LinkedList;
import java.util.List;
import java.awt.Color;
import org.tigris.gef.presentation.FigLine;
import org.tigris.gef.presentation.FigRect;

public class LifeLineFigures {

    private FigLine lineFig;
    private FigRect rectFig;
    private List<FigActivation> activations;
    private List<FigActivation> stackedActivations;

    public LifeLineFigures(int x, int y, int width, int height, Color lineColor, int lineWidth) {
        activations = new LinkedList<FigActivation>();
        stackedActivations = new LinkedList<FigActivation>();

        rectFig = new FigRect(x, y, width, height);
        rectFig.setFilled(false);
        rectFig.setLineWidth(0);
        lineFig = new FigLine(x + width / 2, y, x + width / 2, y + height, lineColor);
        lineFig.setDashed(true);
        lineFig.setLineWidth(lineWidth);
    }

    // Additional methods for managing activations, setting bounds, etc.
}
