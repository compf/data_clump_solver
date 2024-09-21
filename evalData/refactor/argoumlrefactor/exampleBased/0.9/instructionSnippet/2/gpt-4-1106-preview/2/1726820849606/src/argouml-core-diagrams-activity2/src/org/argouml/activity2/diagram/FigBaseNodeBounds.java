package org.argouml.activity2.diagram;

import java.awt.Rectangle;

public class FigBaseNodeBounds {
    private final Rectangle bounds;

    public FigBaseNodeBounds(int x, int y, int w, int h) {
        this.bounds = new Rectangle(x, y, w, h);
    }

    public Rectangle getBounds() {
        return bounds;
    }

}