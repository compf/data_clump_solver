package org.argouml.sequence2.diagram;

import java.util.LinkedList;
import java.util.List;

public class ActivationList {

    private List<FigActivation> activations = new LinkedList<FigActivation>();

    public void addAll(List<FigActivation> newActivations) {
        activations.addAll(newActivations);
    }

    public void addToFig(FigLifeLine figLifeLine) {
        for (FigActivation figAct : activations) {
            figAct.setFillColor(figLifeLine.getFillColor());
            figLifeLine.addFig(figAct);
        }
    }

    public void removeFromFig(FigLifeLine figLifeLine) {
        for (FigActivation oldActivation : activations) {
            figLifeLine.removeFig(oldActivation);
        }
        activations.clear();
    }
}