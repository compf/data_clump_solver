package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class FigActivationBounds {
    private int x, y, w, h;

    public FigActivationBounds(int x, int y, int w, int h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public Rectangle toRectangle() {
        return new Rectangle(x, y, w, h);
    }

    // Getter methods for x, y, w, h...
}