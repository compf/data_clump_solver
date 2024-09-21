package org.argouml.activity2.diagram;

public class Bounds {
    private final int x;
    private final int y;
    private final int width;
    private final int height;

    public Bounds(final int x, final int y, final int width, final int height) {
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
}