package org.argouml.sequence2.diagram;

import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.FigLine;
import org.tigris.gef.presentation.FigRect;

public class LifeLineFigures {

    private static final int WIDTH = 150;
    private static final int HEIGHT = 500;

    private final FigLine lineFig;
    private final FigRect rectFig;

    public LifeLineFigures(int x, int y, DiagramSettings settings) {
        rectFig = new FigRect(x, y, WIDTH, HEIGHT);
        rectFig.setFilled(false);
        rectFig.setLineWidth(0);
        lineFig = new FigLine(x + WIDTH / 2, y, x + WIDTH / 2, y + HEIGHT, settings.getLineColor());
        lineFig.setDashed(true);
        lineFig.setLineWidth(settings.getLineWidth());
    }

    public FigLine getLine() {
        return lineFig;
    }

    public FigRect getRect() {
        return rectFig;
    }
}