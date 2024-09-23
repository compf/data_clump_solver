package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class ActivationBounds {
    private final Rectangle bounds;

    public ActivationBounds(int x, int y, int w, int h) {
        this.bounds = new Rectangle(x, y, w, h);
    }

    public Rectangle getBounds() {
        return bounds;
    }

    // Additional functionality could include methods to expand, contract, or otherwise manipulate activation bounds.
}