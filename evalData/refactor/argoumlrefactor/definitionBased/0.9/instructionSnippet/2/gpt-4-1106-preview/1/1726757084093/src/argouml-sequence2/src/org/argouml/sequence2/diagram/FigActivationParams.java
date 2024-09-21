package org.argouml.sequence2.diagram;

import org.argouml.uml.diagram.DiagramSettings;

class FigActivationParams {
    private final Object owner;
    private final int x;
    private final int y;
    private final int w;
    private final int h;
    private final DiagramSettings settings;
    private final FigMessage messageFig;

    public FigActivationParams(Object owner, int x, int y, int w, int h, DiagramSettings settings, FigMessage messageFig) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.settings = settings;
        this.messageFig = messageFig;
    }

    // Accessor methods for the fields
    // ...
}