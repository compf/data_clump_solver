package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class ActivationFigParams {
    public final int x;
    public final int y;
    public final int w;
    public final int h;

    public ActivationFigParams(int x, int y, int w, int h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public Rectangle toRectangle() {
        return new Rectangle(x, y, w, h);
    }
}