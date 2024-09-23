package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;

public class ActivationParams {
    private final Object owner;
    private final Rectangle bounds;
    private final DiagramSettings settings;

    public ActivationParams(Object owner, int x, int y, int w, int h, DiagramSettings settings) {
        this.owner = owner;
        this.bounds = new Rectangle(x, y, w, h);
        this.settings = settings;
    }

    public Object getOwner() {
        return owner;
    }

    public Rectangle getBounds() {
        return bounds;
    }

    public DiagramSettings getSettings() {
        return settings;
    }
}