package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import java.util.LinkedList;
import java.util.List;
import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.FigLine;
import org.tigris.gef.presentation.FigRect;

public class LifeLineFigures {
    private FigLine lineFig;
    private FigRect rectFig;
    private List<FigActivation> activations;
    private List<FigActivation> stackedActivations;

    public LifeLineFigures(Object owner, DiagramSettings settings, int x, int y, int width, int height) {
        activations = new LinkedList<>();
        stackedActivations = new LinkedList<>();
        rectFig = new FigRect(x, y, width, height, settings);
        rectFig.setFilled(false);
        rectFig.setLineWidth(0);
        lineFig = new FigLine(x + width / 2, y, x + width / 2, y + height, settings);
        lineFig.setDashed(true);
        lineFig.setLineWidth(FigLifeLine.LINE_WIDTH);
    }

    public FigLine getLineFig() {return lineFig; }
    public FigRect getRectFig() {return rectFig; }
    public List<FigActivation> getActivations() {return activations; }
    public List<FigActivation> getStackedActivations() {return stackedActivations; }
}
