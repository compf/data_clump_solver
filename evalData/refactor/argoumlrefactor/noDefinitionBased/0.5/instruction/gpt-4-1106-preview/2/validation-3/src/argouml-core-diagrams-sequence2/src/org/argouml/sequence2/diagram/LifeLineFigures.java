package org.argouml.sequence2.diagram;

import org.tigris.gef.presentation.FigLine;
import org.tigris.gef.presentation.FigRect;

import java.util.LinkedList;
import java.util.List;

public class LifeLineFigures {
    private FigLine lineFig;
    private FigRect rectFig;
    private List<FigActivation> activations;
    private List<FigActivation> stackedActivations;
    public static final int WIDTH = 150;
    public static final int HEIGHT = 500;

    public LifeLineFigures() {
        activations = new LinkedList<>();
        stackedActivations = new LinkedList<>();
    }

    public void setActivations(List<FigActivation> acts) { this.activations = acts; }
    public List<FigActivation> getActivations() { return activations; }
    public void setStackedActivations(List<FigActivation> acts) { this.stackedActivations = acts; }
    public List<FigActivation> getStackedActivations() { return stackedActivations; }
    public void clearActivations() { this.activations.clear(); }
    public void clearStackedActivations() { this.stackedActivations.clear(); }

    public void setLineFig(FigLine fig) { this.lineFig = fig; }
    public FigLine getLineFig() { return lineFig; }
    public void setRectFig(FigRect fig) { this.rectFig = fig; }
    public FigRect getRectFig() { return rectFig; }
}