package org.argouml.sequence2.diagram;

import org.tigris.gef.presentation.FigRect;

public class RectFig extends FigRect {

    public RectFig(int x, int y, int width, int height, Color lineColor, int lineWidth) {
        super(x, y, width, height);
        setLineColor(lineColor);
        setLineWidth(lineWidth);
        setFilled(false);
    }
}