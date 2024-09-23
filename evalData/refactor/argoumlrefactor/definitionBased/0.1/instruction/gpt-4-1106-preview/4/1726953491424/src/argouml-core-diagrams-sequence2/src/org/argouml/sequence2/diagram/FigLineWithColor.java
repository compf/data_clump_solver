package org.argouml.sequence2.diagram;

import org.tigris.gef.presentation.FigLine;

import java.awt.Color;

/**
 * A FigLine extension that includes color and line style settings.
 */
public class FigLineWithColor extends FigLine {

    private static final int DEFAULT_LINE_WIDTH = 1;

    public FigLineWithColor(int x1, int y1, int x2, int y2, Color lineColor) {
        super(x1, y1, x2, y2, lineColor);
    }

    public void setDashed() {
        super.setDashed(true);
    }

    public void setLineWidth() {
        super.setLineWidth(DEFAULT_LINE_WIDTH);
    }
}
