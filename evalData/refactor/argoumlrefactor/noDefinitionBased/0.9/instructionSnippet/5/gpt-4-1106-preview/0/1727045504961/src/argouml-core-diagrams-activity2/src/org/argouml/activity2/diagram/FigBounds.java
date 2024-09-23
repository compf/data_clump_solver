package org.argouml.activity2.diagram;

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

    // Getters and setters
    public int getX() { return x; }
    public int getY() { return y; }
    public int getWidth() { return width; }
    public int getHeight() { return height; }

    // Other methods depending on the requirements
}
