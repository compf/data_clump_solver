package org.argouml.sequence2.diagram;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

/**
 * ActivationsManager handles activations for a lifeline.
 */
public class ActivationsManager {

    private List<FigActivation> activations;
    private List<FigActivation> stackedActivations;

    public ActivationsManager() {
        activations = new LinkedList<FigActivation>();
        stackedActivations = new LinkedList<FigActivation>();
    }

    public void initializeActivations(List<FigMessage> messages, Object owner, DiagramSettings settings, LifeLineFigures lifeLineFigures) {
        // Implementation of activations initialization
    }

    public void addActivations(FigLifeLine figLifeLine) {
        // Implementation of adding activations to the lifeline
    }

    public void clearActivations(FigLifeLine figLifeLine) {
        // Implementation of clearing activations from the lifeline
    }
}
