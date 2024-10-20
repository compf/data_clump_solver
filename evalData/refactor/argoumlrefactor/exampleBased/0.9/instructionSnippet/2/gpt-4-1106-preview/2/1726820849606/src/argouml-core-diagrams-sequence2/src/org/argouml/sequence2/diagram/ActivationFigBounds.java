package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class ActivationFigBounds {
    private final Rectangle bounds;

    public ActivationFigBounds(int x, int y, int w, int h) {
        this.bounds = new Rectangle(x, y, w, h);
    }

    public Rectangle getBounds() {
        return bounds;
    }

}