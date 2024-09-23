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
        activations = new LinkedList<FigActivation>();
        stackedActivations = new LinkedList<FigActivation>();
    }

    // Accessor methods for lineFig, rectFig, activations, and stackedActivations
    // Additional methods to manipulate the activations and stackedActivations
}