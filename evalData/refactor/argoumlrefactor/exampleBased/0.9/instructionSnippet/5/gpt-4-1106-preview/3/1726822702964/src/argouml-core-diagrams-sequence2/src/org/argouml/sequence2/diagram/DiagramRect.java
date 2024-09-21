package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class DiagramRect {
    private final int x;
    private final int y;
    private final int width;
    private final int height;

    public DiagramRect(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public int getX() { return x; }
    public int getY() { return y; }
    public int getWidth() { return width; }
    public int getHeight() { return height; }
    public Rectangle toRectangle() {
        return new Rectangle(x, y, width, height);
    }
}