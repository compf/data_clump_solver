package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

import org.argouml.uml.diagram.DiagramSettings;

public class ActivationParams {

    private final Object owner;
    private final Rectangle bounds;
    private final DiagramSettings settings;
    private final FigMessage messageFig;

    public ActivationParams(
        final Object owner, 
        final int x, 
        final int y, 
        final int w, 
        final int h, 
        final DiagramSettings settings, 
        final FigMessage messageFig) {

        this.owner = owner;
        this.bounds = new Rectangle(x, y, w, h);
        this.settings = settings;
        this.messageFig = messageFig;
    }

    // Getters and additional methods
}
