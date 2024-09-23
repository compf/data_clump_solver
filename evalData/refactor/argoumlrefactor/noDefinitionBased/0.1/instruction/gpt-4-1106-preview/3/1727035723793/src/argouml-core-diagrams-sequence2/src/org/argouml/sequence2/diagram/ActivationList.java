package org.argouml.sequence2.diagram;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class ActivationList {

    private List<FigActivation> activations;
    private List<FigActivation> stackedActivations;

    public ActivationList() {
        activations = new LinkedList<FigActivation>();
        stackedActivations = new LinkedList<FigActivation>();
    }

    public void clearActivations(FigLifeLine figLifeLine) {
        for (FigActivation oldActivation : activations) {
            figLifeLine.removeFig(oldActivation);
        }
        for (FigActivation oldActivation : stackedActivations) {
            figLifeLine.removeFig(oldActivation);
        }
        activations.clear();
        stackedActivations.clear();
    }

    public void setActivations(List<FigActivation> newActivations) {
        activations = newActivations;
    }

    public void setStackedActivations(List<FigActivation> newStackedActivations) {
        stackedActivations = newStackedActivations;
    }

    public void addActivations(FigLifeLine figLifeLine) {
        for (final FigActivation figAct : activations) {
            figAct.setFillColor(figLifeLine.getFillColor());
            figLifeLine.addFig(figAct);
        }
        for (final FigActivation figAct : stackedActivations) {
            figAct.setFillColor(figLifeLine.getFillColor());
            figLifeLine.addFig(figAct);
        }
    }

    public List<FigActivation> getActivations() {
        return activations;
    }

    public List<FigActivation> getStackedActivations() {
        return stackedActivations;
    }

    public List<FigActivation> getAllActivations() {
        List<FigActivation> allActivations = new LinkedList<FigActivation>(activations);
        allActivations.addAll(stackedActivations);
        return allActivations;
    }

    public void clear() {
        activations.clear();
        stackedActivations.clear();
    }

    public void removeFig(FigLifeLine figLifeLine, FigActivation act) {
        figLifeLine.removeFig(act);
    }

    public void addFig(FigLifeLine figLifeLine, FigActivation act) {
        figLifeLine.addFig(act);
    }
}
