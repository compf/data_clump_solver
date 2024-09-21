package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class Dimensions {

    public final int x;
    public final int y;
    public final int width;
    public final int height;

    public Dimensions(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public Rectangle toRectangle() {
        return new Rectangle(x, y, width, height);
    }
}