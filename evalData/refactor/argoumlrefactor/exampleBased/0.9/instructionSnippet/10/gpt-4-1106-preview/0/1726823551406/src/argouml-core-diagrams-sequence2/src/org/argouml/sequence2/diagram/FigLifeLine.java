package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;

public class ActivationData {
    private final Object owner;
    private final Rectangle bounds;
    private final DiagramSettings settings;

    public ActivationData(Object owner, Rectangle bounds, DiagramSettings settings) {
        this.owner = owner;
        this.bounds = bounds;
        this.settings = settings;
    }

    // Additional methods and logic can be added here
}