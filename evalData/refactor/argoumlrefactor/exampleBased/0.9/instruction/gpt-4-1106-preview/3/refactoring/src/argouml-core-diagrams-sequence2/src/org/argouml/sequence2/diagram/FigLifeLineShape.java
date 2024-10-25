package org.argouml.sequence2.diagram;

import org.tigris.gef.presentation.FigLine;
import org.tigris.gef.presentation.FigRect;

public class FigLifeLineShape {

    private FigRect rectFig;
    private FigLine lineFig;

    public FigLifeLineShape(int x, int y, int width, int height, Color lineColor) {
        rectFig = new FigRect(x, y, width, height);
        rectFig.setFilled(false);
        rectFig.setLineWidth(0);
        lineFig = new FigLine(x + width / 2, y, x + width / 2, y + height, lineColor);
        lineFig.setDashed(true);
        lineFig.setLineWidth(LINE_WIDTH);
    }

    public FigRect getRect() {
        return rectFig;
    }

    public FigLine getLine() {
        return lineFig;
    }
}
