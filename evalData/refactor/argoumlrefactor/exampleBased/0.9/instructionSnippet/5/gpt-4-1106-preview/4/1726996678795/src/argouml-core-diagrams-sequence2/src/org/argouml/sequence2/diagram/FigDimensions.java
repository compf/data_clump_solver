package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class FigDimensions {

    private final int x;
    private final int y;
    private final int width;
    private final int height;

    public FigDimensions(final int x, final int y, final int width, final int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public Rectangle toRectangle() {
        return new Rectangle(x, y, width, height);
    }

    // Getters for x, y, width, height...
}