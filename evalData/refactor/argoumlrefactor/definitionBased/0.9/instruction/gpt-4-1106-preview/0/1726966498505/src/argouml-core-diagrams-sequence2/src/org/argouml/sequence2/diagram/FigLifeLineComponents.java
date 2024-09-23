package org.argouml.sequence2.diagram;
import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.FigLine;
import org.tigris.gef.presentation.FigRect;

class FigLifeLineComponents {
    private FigLine lineFig;
    private FigRect rectFig;

    FigLifeLineComponents(Object owner, Rectangle bounds, DiagramSettings settings) {
        rectFig = new FigRect(bounds.x, bounds.y, FigLifeLine.WIDTH, FigLifeLine.HEIGHT); 
        rectFig.setFilled(false);
        rectFig.setLineWidth(0);
        lineFig = new FigLine(bounds.x + FigLifeLine.WIDTH / 2, bounds.y, 
                bounds.x + FigLifeLine.WIDTH / 2, bounds.y + FigLifeLine.HEIGHT, FigLifeLine.LINE_COLOR);
        lineFig.setDashed(true);
        lineFig.setLineWidth(FigLifeLine.LINE_WIDTH);
    }

    public FigLine getLineFig() {
        return lineFig;
    }

    public FigRect getRectFig() {
        return rectFig;
    }

    // Additional methods related to operations on lineFig and rectFig can be added here
}
