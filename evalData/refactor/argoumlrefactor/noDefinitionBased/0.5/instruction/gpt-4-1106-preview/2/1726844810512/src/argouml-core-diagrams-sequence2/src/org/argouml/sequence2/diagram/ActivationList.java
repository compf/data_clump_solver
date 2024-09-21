package org.argouml.sequence2.diagram;

import java.util.LinkedList;
import java.util.List;

public class ActivationList {

    private List<FigActivation> activations;
    private List<FigActivation> stackedActivations;

    public ActivationList() {
        activations = new LinkedList<FigActivation>();
        stackedActivations = new LinkedList<FigActivation>();
    }

    public List<FigActivation> getActivations() {
        return activations;
    }

    public List<FigActivation> getStackedActivations() {
        return stackedActivations;
    }

    public void clearActivations() {
        activations.clear();
        stackedActivations.clear();
    }

    public void addActivation(FigActivation activation) {
        activations.add(activation);
    }

    public void addStackedActivation(FigActivation activation) {
        stackedActivations.add(activation);
    }

    // Additional methods to manipulate activations can be added here
}