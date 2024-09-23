package org.argouml.sequence2.diagram;

import org.argouml.uml.diagram.DiagramSettings;

public class ActivationFigData {
    private final Object owner;
    private final int x;
    private final int y;
    private final int width;
    private final int height;
    private final DiagramSettings settings;
    private final FigMessage messageFig;

    public ActivationFigData(Object owner, int x, int y, int w, int h, DiagramSettings settings, FigMessage messageFig) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.settings = settings;
        this.messageFig = messageFig;
    }

    // Getters
    // ...
}