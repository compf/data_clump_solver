package org.argouml.sequence2.diagram;

import java.awt.Color;
import java.awt.Rectangle;
import org.tigris.gef.presentation.FigLine;
import org.tigris.gef.presentation.FigRect;

public class LineRectPair {

    private FigLine lineFig;
    private FigRect rectFig;

    public LineRectPair(Rectangle bounds, Color lineColor, int width, int height) {
        rectFig = new FigRect(bounds.x, bounds.y, width, height);
        rectFig.setFilled(false);
        rectFig.setLineWidth(0);
        lineFig = new FigLine(bounds.x + width / 2, bounds.y,
                bounds.x + width / 2, bounds.y + height, lineColor);
    }

    public void setBounds(int x, int y, int w, int h) {
        rectFig.setBounds(x, y, w, h);
        lineFig.setBounds(x + w / 2, y, w, h);
    }

    public FigLine getLineFig() {
        return lineFig;
    }

    public FigRect getRectFig() {
        return rectFig;
    }

    public Rectangle getLineRect() {
        return new Rectangle(lineFig.getX(), lineFig.getY(), lineFig.getWidth(), lineFig.getHeight());
    }
}
