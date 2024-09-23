package org.argouml.sequence2.diagram;

import org.argouml.uml.diagram.DiagramSettings;

public class ActivationFigParams {

    private final Object owner;
    private final int x;
    private final int y;
    private final int w;
    private final int h;
    private final DiagramSettings settings;

    public ActivationFigParams(Object owner, int x, int y, int w, int h, DiagramSettings settings) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.settings = settings;
    }

    // Add getters here
}
