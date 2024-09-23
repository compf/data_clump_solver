/* $Id$
 *****************************************************************************
 * Copyright (c) 2010-2011 Contributors - see below
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Bob Tarling
 *****************************************************************************
 */

package org.argouml.activity2.diagram;

import java.awt.Dimension;
import java.awt.Rectangle;

import org.argouml.uml.diagram.DiagramSettings;
import org.tigris.gef.presentation.FigGroup;
import org.tigris.gef.presentation.FigNode;

/**
 * The Fig for all node diagram elements. All specialist diagram elements
 * decorate this to get specialist behaviour 
 * @author Bob Tarling
 */
class FigBaseNode extends FigNode implements DiagramNode {

    private NodePresentationElements presentationElements;
    
    /**
     * Constructor a new FigBaseNode
     * 
     * @param owner the owning UML element
     * @param bounds rectangle describing bounds
     * @param settings rendering settings
     */
    FigBaseNode(final Object owner, final Rectangle bounds,
            final DiagramSettings settings) {
        super(owner);
        presentationElements = new NodePresentationElements();
        presentationElements.setSettings(settings);
        
        setBounds(bounds);
        
    }
    
    void setDisplayState(FigBasePresentation displayState) {
        presentationElements.setDisplayState(displayState, getOwner());
        displayState.setOwner(getOwner());
        addFig(displayState);
    }
    
    @Override
    public boolean isDragConnectable() {
        return false;
    }
    
    @Override
    public Dimension getMinimumSize() {
        return presentationElements.getMinimumSize();
    }

    public void setNameDiagramElement(DiagramElement name) {
    }

    // TODO: Move an empty implementation to FigGroup in GEF
    protected void positionChildren() {
        Rectangle myBounds = getBounds();
        if (presentationElements.hasDisplayState()) {
            presentationElements.setBounds(myBounds);
        }
//      calcBounds();
        updateEdges();
    }
    
    @Override
    protected void setBoundsImpl(
            final int x,
            final int y,
            final int w,
            final int h) {

        _x = x;
        _y = y;
        _w = w;
        _h = h;
        
        positionChildren();
    }

    /**
     * This is called to rearrange the contents of the Fig when a childs
     * minimum size means it will no longer fit. If this group also has
     * a parent and it will no longer fit that parent then control is
     * delegated to that parent.
     */
    public void calcBounds() {
        if (getGroup() != null) {
            ((FigGroup) getGroup()).calcBounds();
        } else {
            final Dimension min = getMinimumSize();
            int maxw = Math.max(getWidth(), min.width);
            int maxh = Math.max(getHeight(), min.height);
            setBounds(_x, _y, maxw, maxh);
        }
    }
}
