package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class ActivationFigBounds {
    private final int x;
    private final int y;
    private final int w;
    private final int h;

    public ActivationFigBounds(int x, int y, int w, int h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public Rectangle toRectangle() {
        return new Rectangle(x, y, w, h);
    }

    // getters
}