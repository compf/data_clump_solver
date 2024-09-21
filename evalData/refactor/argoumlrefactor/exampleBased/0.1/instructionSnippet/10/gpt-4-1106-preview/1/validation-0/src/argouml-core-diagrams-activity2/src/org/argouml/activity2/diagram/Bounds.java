package org.argouml.activity2.diagram;

import java.awt.Rectangle;

public class Bounds {
    private final Rectangle bounds;

    public Bounds(int x, int y, int w, int h) {
        this.bounds = new Rectangle(x, y, w, h);
    }

    public Rectangle getBounds() {
        return bounds;
    }
}