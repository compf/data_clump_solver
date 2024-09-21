package org.argouml.activity2.diagram;

import java.awt.Dimension;
import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.FigGroup;
import org.tigris.gef.presentation.FigNode;

public abstract class FigBaseNode extends FigNode {

    // Existing contents of FigBaseNode

    // Added constructor with Rectangle
    FigBaseNode(final Object owner, final Rectangle bounds,
                final DiagramSettings settings) {
        super(owner, settings);
        setBounds(bounds);
    }

    // Other methods that might use Rectangle or Dimension
}
