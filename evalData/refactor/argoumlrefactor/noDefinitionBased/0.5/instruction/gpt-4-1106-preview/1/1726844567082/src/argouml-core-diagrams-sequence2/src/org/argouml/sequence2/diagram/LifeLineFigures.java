package org.argouml.sequence2.diagram;

import org.tigris.gef.presentation.FigLine;
import org.tigris.gef.presentation.FigRect;

import java.awt.*;
import java.util.List;

public class LifeLineFigures {

    private FigLine lineFig;
    private FigRect rectFig;
    private List<FigActivation> activations;
    private List<FigActivation> stackedActivations;

    public LifeLineFigures(int x, int y, int width, int height, Color lineColor, int lineWidth) {
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

    // Additional methods related to activations can be added here
}
