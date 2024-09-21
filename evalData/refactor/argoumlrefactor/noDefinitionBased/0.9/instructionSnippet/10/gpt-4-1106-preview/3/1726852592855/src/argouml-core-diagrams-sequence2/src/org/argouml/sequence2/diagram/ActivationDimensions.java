package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class ActivationDimensions {

    private final int x, y, w, h;

    public ActivationDimensions(int x, int y, int w, int h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public Rectangle toRectangle() {
        return new Rectangle(x, y, w, h);
    }

    // Getters and potentially other methods can be added here
}
