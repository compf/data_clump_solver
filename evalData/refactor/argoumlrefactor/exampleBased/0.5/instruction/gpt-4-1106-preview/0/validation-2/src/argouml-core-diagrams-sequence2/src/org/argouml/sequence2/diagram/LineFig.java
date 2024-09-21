package org.argouml.sequence2.diagram;

import org.tigris.gef.presentation.FigLine;
import java.awt.Color;

public class LineFig extends FigLine {

    public LineFig(int x1, int y1, int x2, int y2, Color lineColor, int lineWidth, boolean dashed) {
        super(x1, y1, x2, y2, lineColor);
        setLineWidth(lineWidth);
        setDashed(dashed);
    }
}