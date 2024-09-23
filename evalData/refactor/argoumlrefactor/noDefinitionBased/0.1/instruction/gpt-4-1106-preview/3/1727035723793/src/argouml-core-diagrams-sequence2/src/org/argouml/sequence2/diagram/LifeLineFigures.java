package org.argouml.sequence2.diagram;

import org.tigris.gef.presentation.FigLine;
import org.tigris.gef.presentation.FigRect;

import java.awt.Color;

public class LifeLineFigures {

    private FigRect rectFig;
    private FigLine lineFig;

    public LifeLineFigures(int x, int y, int width, int height, Color lineColor, int lineWidth) {
        rectFig = new FigRect(x, y, width, height);
        rectFig.setFilled(false);
        rectFig.setLineWidth(0);
        lineFig = new FigLine(x + width / 2, y, x + width / 2, y + height, lineColor);
        lineFig.setDashed(true);
        lineFig.setLineWidth(lineWidth);
    }

    public FigRect getRectFig() {
        return rectFig;
    }

    public FigLine getLineFig() {
        return lineFig;
    }

    public void setBounds(int x, int y, int w, int h) {
        rectFig.setBounds(x, y, w, h);
        lineFig.setBounds(x + w / 2, y, w, h);
    }
}
