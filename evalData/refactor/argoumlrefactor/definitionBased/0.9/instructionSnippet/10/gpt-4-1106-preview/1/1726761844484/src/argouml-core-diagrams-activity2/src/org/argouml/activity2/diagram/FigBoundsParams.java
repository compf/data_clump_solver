package org.argouml.activity2.diagram;

import java.awt.Rectangle;

public class FigBoundsParams {

    private final int x;
    private final int y;
    private final int w;
    private final int h;

    public FigBoundsParams(int x, int y, int w, int h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public Rectangle asRectangle() {
        return new Rectangle(x, y, w, h);
    }
}