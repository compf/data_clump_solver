package org.argouml.sequence2.diagram;
package org.argouml.sequence2.diagram;
package org.argouml.sequence2.diagram;
package org.argouml.sequence2.diagram;

import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.Fig;

public class ActivationParams {
    private Object owner;
    private int x;
    private int y;
    private int width;
    private int height;
    private DiagramSettings settings;
    private Fig messageFig;

    // Constructor and getters/setters
}
import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.Fig;

public class ActivationParams {
    private Object owner;
    private int x;
    private int y;
    private int width;
    private int height;
    private DiagramSettings settings;
    private Fig messageFig;

    public ActivationParams(Object owner, int x, int y, int width, int height, DiagramSettings settings, Fig messageFig) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.settings = settings;
        this.messageFig = messageFig;
    }
package org.argouml.sequence2.diagram;
    
    import org.argouml.uml.diagram.DiagramSettings;
    import org.tigris.gef.presentation.Fig;
    
    public class ActivationParams {
    private Object owner;
    private int x;
    private int y;
    private int width;
    private int height;
    private DiagramSettings settings;
    private Fig messageFig;

    public ActivationParams(Object owner, int x, int y, int width, int height, DiagramSettings settings, Fig messageFig) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.settings = settings;
        this.messageFig = messageFig;
    }

    // Getters
    public Object getOwner() { return owner; }
    public int getX() { return x; }
    public int getY() { return y; }
    public int getWidth() { return width; }
    public int getHeight() { return height; }
    public DiagramSettings getSettings() { return settings; }
    public Fig getMessageFig() { return messageFig; }
    }
    
    public ActivationParams(Object owner, int x, int y, int width, int height, DiagramSettings settings, FigMessage messageFig) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.settings = settings;
        this.messageFig = messageFig;
    }

    // getters...
}