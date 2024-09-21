package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;

public class ActivationParameters {
    private Object owner;
    private int x, y, width, height;
    private DiagramSettings settings;

    public ActivationParameters(Object owner, int x, int y, int width, int height, DiagramSettings settings) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.settings = settings;
    }

    public Object getOwner() { return owner; }
    public Rectangle getBounds() { return new Rectangle(x, y, width, height); }
    public DiagramSettings getSettings() { return settings; }
    // More utility methods could be added here
}
