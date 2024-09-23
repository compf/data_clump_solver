package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class FigBounds {

    private int x;
    private int y;
    private int width;
    private int height;

    public FigBounds(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public Rectangle toRectangle() {
        return new Rectangle(x, y, width, height);
    }

    // Getters and setters
    public int getX() { return x; }
    public int getY() { return y; }
    public int getWidth() { return width; }
    public int getHeight() { return height; }

    // Other methods depending on the requirements
}
