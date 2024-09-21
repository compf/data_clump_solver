package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.FigLine;
import org.tigris.gef.presentation.FigRect;

public class LifeLineProperties {
    private final int x;
    private final int y;
    private final int width;
    private final int height;
    // private final DiagramSettings settings; [Removed due to initialization error]
    private final java.awt.Color lineColor;
    private final int lineWidth;

    public LifeLineProperties(int x, int y, int width, int height, java.awt.Color lineColor, int lineWidth) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        // this.settings = settings; [Removed due to initialization error]
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public FigRect createFigRect() {
        FigRect rectFig = new FigRect(x, y, width, height);
        rectFig.setFilled(false);
        rectFig.setLineWidth(0);
        return rectFig;
    }

    public FigLine createFigLine() {
        FigLine lineFig = new FigLine(x + width / 2, y, x + width / 2, y + height, lineColor);
        lineFig.setDashed(true);
        lineFig.setLineWidth(lineWidth);
        return lineFig;
    }
}