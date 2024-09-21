package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class ActivationDimensions {
    private final int x;
    private final int y;
    private final int w;
    private final int h;

    public ActivationDimensions(int x, int y, int w, int h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public Rectangle toRectangle() {
        return new Rectangle(x, y, w, h);
    }

    public int getX() { return x; }
    public int getY() { return y; }
    public int getWidth() { return w; }
    public int getHeight() { return h; }
}