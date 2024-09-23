package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class ActivationFigBounds {
    private int x;
    private int y;
    private int width;
    private int height;

    public ActivationFigBounds(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public Rectangle toRectangle() {
        return new Rectangle(x, y, width, height);
    }

    // Getters and setters...
}