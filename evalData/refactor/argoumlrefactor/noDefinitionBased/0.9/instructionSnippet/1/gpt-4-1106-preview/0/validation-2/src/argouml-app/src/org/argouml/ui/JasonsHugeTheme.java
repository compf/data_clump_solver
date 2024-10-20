/* $Id$
 *****************************************************************************
 * Copyright (c) 2009 Contributors - see below
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    tfmorris
 *****************************************************************************
 *
 * Some portions of this file was previously release using the BSD License:
 */

// Copyright (c) 1996-2006 The Regents of the University of California. All
// Rights Reserved. Permission to use, copy, modify, and distribute this
// software and its documentation without fee, and without a written
// agreement is hereby granted, provided that the above copyright notice
// and this paragraph appear in all copies.  This software program and
// documentation are copyrighted by The Regents of the University of
// California. The software program and documentation are supplied "AS
// IS", without any accompanying services from The Regents. The Regents
// does not warrant that the operation of the program will be
// uninterrupted or error-free. The end-user understands that the program
// was developed for research purposes and is advised not to rely
// exclusively on the program for any reason.  IN NO EVENT SHALL THE
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

package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.ColorUIResource;
import javax.swing.plaf.FontUIResource;
import javax.swing.plaf.metal.MetalTheme;

/**
 * This class defines a variation on the default Metal Theme.
 */
public class JasonsHugeTheme extends MetalTheme {

    private final ThemeColors primaryColors = new ThemeColors();
    private final ThemeColors secondaryColors = new ThemeColors();

    private final ThemeFonts themeFonts = new ThemeFonts();

    /*
     * @see javax.swing.plaf.metal.MetalTheme#getName()
     */
    public String getName() { return "Very Large Fonts"; }

    // these are blue in Metal Default Theme
    /*
     * @see javax.swing.plaf.metal.MetalTheme#getPrimary1()
     */

    /*
     * @see javax.swing.plaf.metal.MetalTheme#getPrimary2()
     */
    /*
     * @see javax.swing.plaf.metal.MetalTheme#getPrimary3()
     */

    // these are gray in Metal Default Theme
    /*
     * @see javax.swing.plaf.metal.MetalTheme#getSecondary1()
     */

    /*
     * @see javax.swing.plaf.metal.MetalTheme#getSecondary2()
     */

    /*
     * @see javax.swing.plaf.metal.MetalTheme#getSecondary3()
     */

    /*
     * @see javax.swing.plaf.metal.MetalTheme#getControlTextFont()
     */

    /*
     * @see javax.swing.plaf.metal.MetalTheme#getSystemTextFont()
     */

    /*
     * @see javax.swing.plaf.metal.MetalTheme#getUserTextFont()
     */

    /*
     * @see javax.swing.plaf.metal.MetalTheme#getMenuTextFont()
     */

    /*
     * @see javax.swing.plaf.metal.MetalTheme#getSubTextFont()
     */

    /*
     * @see javax.swing.plaf.metal.MetalTheme#getWindowTitleFont()
     */
}
