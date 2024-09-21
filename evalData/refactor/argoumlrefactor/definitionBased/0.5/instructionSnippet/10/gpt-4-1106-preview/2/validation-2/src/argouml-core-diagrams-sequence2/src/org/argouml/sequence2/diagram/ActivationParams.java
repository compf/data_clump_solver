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
import org.tigris.gef.presentation.FigMessage;

public class ActivationParams {
    private final Object owner;
    private final int x;
    private final int y;
    private final int width;
    private final int height;
    private final DiagramSettings settings;
    private final FigMessage messageFig;

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