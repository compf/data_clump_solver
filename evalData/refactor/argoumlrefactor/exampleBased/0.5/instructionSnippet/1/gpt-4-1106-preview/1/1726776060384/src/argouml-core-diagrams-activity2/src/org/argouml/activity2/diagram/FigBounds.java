package org.argouml.activity2.diagram;

import java.awt.Rectangle;

public class FigBounds {
    private final Rectangle bounds;

    public FigBounds(int x, int y, int width, int height) {
        this.bounds = new Rectangle(x, y, width, height);
    }

    public Rectangle getBounds() {
        return bounds;
    }
}
