package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

import org.argouml.uml.diagram.DiagramSettings;

public class FigLifeLineDescriptor {
    private final Object owner;
    private final Rectangle bounds;
    private final DiagramSettings settings;

    public FigLifeLineDescriptor(Object owner, int x, int y, int w, int h, DiagramSettings settings) {
        this.owner = owner;
        this.bounds = new Rectangle(x, y, w, h);
        this.settings = settings;
    }

    // Getters not shown for brevity
}