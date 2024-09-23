package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import org.argouml.uml.diagram.DiagramSettings;

/**
 * Manages activations for a FigLifeLine.
 */
class ActivationsManager {

    private List<FigActivation> activations;
    private List<FigActivation> stackedActivations;

    ActivationsManager() {
        activations = new LinkedList<FigActivation>();
        stackedActivations = new LinkedList<FigActivation>();
    }

    void createStandardActivations(List<FigMessage> messages) {
        // Implement the method using the logic from FigLifeLine
    }

    void createStackedActivations(List<FigMessage> messages) {
        // Implement the method using the logic from FigLifeLine
    }

    List<FigActivation> getActivations() {
        return activations;
    }

    List<FigActivation> getStackedActivations() {
        return stackedActivations;
    }

    void clearActivations() {
        for (FigActivation oldActivation : activations) {
            activations.remove(oldActivation);    
        }
        for (FigActivation oldActivation : stackedActivations) {
            stackedActivations.remove(oldActivation);    
        }
        activations.clear();
        stackedActivations.clear();
    }
}
