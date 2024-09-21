package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import javax.swing.plaf.ColorUIResource;
import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.FigLine;

/**
 * Manages activations for a lifeline.
 */
public class ActivationManager {

    private List<FigActivation> activations;
    private List<FigActivation> stackedActivations;

    public ActivationManager() {
        activations = new LinkedList<FigActivation>();
        stackedActivations = new LinkedList<FigActivation>();
    }

    public void clear() {
        activations.clear();
        stackedActivations.clear();
    }

    public void createActivations(FigLine lineFig, List<FigMessage> messages, Object owner, DiagramSettings settings, ColorUIResource fillColor) {
        // Implementation for creating activations and stacked activations
        // Original logic from FigLifeLine#createStandardActivations and FigLifeLine#createStackedActivations
        // This method also handles adding activations to the lifeline
    }

    // Other methods extracted from FigLifeLine
}
