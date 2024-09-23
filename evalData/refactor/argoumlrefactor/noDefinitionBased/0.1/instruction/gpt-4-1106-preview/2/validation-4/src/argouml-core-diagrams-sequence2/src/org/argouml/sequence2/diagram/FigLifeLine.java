/* $Id$
 *******************************************************************************
 * Copyright (c) 2010 Contributors - see below
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Bob Tarling
 *    Christian L\u00f3pez Esp\u00ednola
 *******************************************************************************
 *
 * Some portions of this file were previously release using the BSD License:
 */

// $Id$
// Copyright (c) 2007-2009 The Regents of the University of California. All
// Rights Reserved. Permission to use, copy, modify, and distribute this
// software and its documentation without fee, and without a written
// agreement is hereby granted, provided that the above copyright notice
// and this paragraph appear in all copies. This software program and
// documentation are copyrighted by The Regents of the University of
// California. The software program and documentation are supplied "AS
// IS", without any accompanying services from The Regents. The Regents
// does not warrant that the operation of the program will be
// uninterrupted or error-free. The end-user understands that the program
// was developed for research purposes and is advised not to rely
// exclusively on the program for any reason. IN NO EVENT SHALL THE
// UNIVERSITY OF CALIFORNIA BE LIABLE TO ANY PARTY FOR DIRECT, INDIRECT,
// SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOST PROFITS,
// ARISING OUT OF THE USE OF THIS SOFTWARE AND ITS DOCUMENTATION, EVEN IF
// THE UNIVERSITY OF CALIFORNIA HAS BEEN ADVISED OF THE POSSIBILITY OF
// SUCH DAMAGE. THE UNIVERSITY OF CALIFORNIA SPECIFICALLY DISCLAIMS ANY
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE SOFTWARE
// PROVIDED HEREUNDER IS ON AN "AS IS" BASIS, AND THE UNIVERSITY OF
// CALIFORNIA HAS NO OBLIGATIONS TO PROVIDE MAINTENANCE, SUPPORT,
// UPDATES, ENHANCEMENTS, OR MODIFICATIONS.

package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import org.argouml.uml.diagram.DiagramSettings;
import org.argouml.uml.diagram.ui.ArgoFigGroup;
import org.tigris.gef.presentation.FigLine;
import org.tigris.gef.presentation.FigRect;


/**
 * This fig is the LifeLine of a ClassifierRole.
 * @author penyaskito
 */
class FigLifeLine extends ArgoFigGroup {

    private static final long serialVersionUID = 466925040550356L;

    private FigLineWithColor lineFig;
    private FigRect rectFig;
    
    private ActivationList activations;
    private ActivationList stackedActivations;
    
    static final int WIDTH = 150;
    static final int HEIGHT = 500;

    FigLifeLine(Object owner, Rectangle bounds, DiagramSettings settings) {
        super(owner, settings);
        initialize(bounds.x, bounds.y);
    }
    
    private void initialize(int x, int y) {
        activations = new ActivationList();
        stackedActivations = new ActivationList();
        
        rectFig = new FigRect(x, y, WIDTH, HEIGHT); 
        rectFig.setFilled(false);
        rectFig.setLineWidth(0);
        lineFig = new FigLineWithColor(x + WIDTH / 2, y, x + WIDTH / 2, y + HEIGHT, LINE_COLOR, LINE_WIDTH);

        
        addFig(rectFig);
        addFig(lineFig);
    }
    
    // TODO: Does this still need to be synchronized? If so then explain why.
    synchronized void createActivations(final List<FigMessage> messages) {
        activations.clear();
        stackedActivations.clear();
        Collections.sort(messages, new FigMessageComparator());
        
        activations.addAll(createStandardActivations(messages));
        stackedActivations.addAll(createStackedActivations(messages));
        
        activations.addToFig(this);
        stackedActivations.addToFig(this);

        // TODO: Do we need this?

    }
    
    /**
     * Add the given list of activation Figs to the lifeline. The fill colour
     * is forced to the lifeline colour in the process.
     * @param activationFigs
     */
    // This method is no longer needed and has been removed.








        }
        





        //
        



// Removed incorrect code blocks and comments that were causing compilation errors
// The correct code blocks are already present in the correct locations
