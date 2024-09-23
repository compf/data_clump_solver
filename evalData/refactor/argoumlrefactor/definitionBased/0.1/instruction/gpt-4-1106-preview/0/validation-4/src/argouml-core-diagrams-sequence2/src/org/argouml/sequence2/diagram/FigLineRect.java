package org.argouml.sequence2.diagram;

import org.tigris.gef.presentation.FigLine;
import org.tigris.gef.presentation.FigRect;
import java.awt.Color;
public class FigLineRect {

    private FigRect rectFig;
    private FigLine lineFig;

    public FigLineRect(int x, int y, int width, int height, Color lineColor, int lineWidth) {
        rectFig = new FigRect(x, y, width, height);
        rectFig.setFilled(false);
        rectFig.setLineWidth(0);
        lineFig = new FigLine(x + width / 2, y, x + width / 2, y + height, lineColor);
        lineFig.setLineWidth(lineWidth);
    }

    public void setDashed(boolean dashed) {
        lineFig.setDashed(dashed);
    }

    public void setLineWidth(int w) {
        lineFig.setLineWidth(w);
    }

    public void setBounds(int x, int y, int w, int h) {
        rectFig.setBounds(x, y, w, h);
        lineFig.setBounds(x + w / 2, y, w, h);
    }

    public void setLineHeight(int height) {
        lineFig.setHeight(height);
    }
}
