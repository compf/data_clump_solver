package org.argouml.activity2.diagram;

public class NodeDimensions {
    private final int x;
    private final int y;
    private final int width;
    private final int height;

    public NodeDimensions(int x, int y, int width, int height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public int getX() { return x; }
    public int getY() { return y; }
    public int getWidth() { return width; }
    public int getHeight() { return height; }

    // Additional methods can be added here for functionality
}
