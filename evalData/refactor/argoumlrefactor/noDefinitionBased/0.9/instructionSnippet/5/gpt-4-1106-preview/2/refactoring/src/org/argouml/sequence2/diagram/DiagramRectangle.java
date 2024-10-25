package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class DiagramRectangle {
    private final int x, y, width, height;

    public DiagramRectangle(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public Rectangle toRectangle() {
        return new Rectangle(x, y, width, height);
    }

    // Getters and possibly other methods...
}