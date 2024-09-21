package org.argouml.sequence2.diagram.settings;

public class FigBounds {

    private final int x;
    private final int y;
    private final int width;
    private final int height;

    public FigBounds(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    // Additional methods such as setters, equals, hashCode, etc., if needed
}