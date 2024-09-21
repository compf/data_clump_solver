package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;

public class ActivationData {

    public static final int DEFAULT_HEIGHT = 100;

    private final Object owner;
    private final int x;
    private final int y;
    private final int width;
    private final int height;
    private final DiagramSettings settings;

    public ActivationData(Object owner, int x, int y, int width, int height, DiagramSettings settings) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.settings = settings;
    }

    public Object getOwner() {
        return owner;
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

    public DiagramSettings getSettings() {
        return settings;
    }

    public Rectangle toRectangle() {
        return new Rectangle(x, y, width, height);
    }

    // Other utility methods if needed
}