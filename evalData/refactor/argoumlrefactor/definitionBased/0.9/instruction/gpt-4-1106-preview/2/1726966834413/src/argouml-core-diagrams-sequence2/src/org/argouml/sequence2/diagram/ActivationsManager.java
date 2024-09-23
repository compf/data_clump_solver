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

    // Add all activation management methods used by FigLifeLine here...

    // Example stub of a method:
    void createActivations(List<FigMessage> messages) {
        // Clear activations
        // Sort messages
        // Create standard and stacked activations
        // ... rest of the logic
    }
}
