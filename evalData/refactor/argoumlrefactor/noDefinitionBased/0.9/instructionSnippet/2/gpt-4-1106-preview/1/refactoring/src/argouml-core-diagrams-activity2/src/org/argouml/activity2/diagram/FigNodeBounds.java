package org.argouml.activity2.diagram;

import java.awt.Rectangle;

public class FigNodeBounds {
    private final Rectangle bounds;

    public FigNodeBounds(int x, int y, int w, int h) {
        this.bounds = new Rectangle(x, y, w, h);
    }

    public Rectangle getBounds() {
        return bounds;
    }

    // Additional functionality such as resizing or movement could be included in this class.
}