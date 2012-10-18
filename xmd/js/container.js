/**
 *  \details &copy; 2011  Open Ximdex Evolution SL [http://www.ximdex.org]
 *
 *  Ximdex a Semantic Content Management System (CMS)
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  See the Affero GNU General Public License for more details.
 *  You should have received a copy of the Affero GNU General Public License
 *  version 3 along with Ximdex (see LICENSE file).
 *
 *  If not, visit http://gnu.org/licenses/agpl-3.0.html.
 *
 *  @author Ximdex DevTeam <dev@ximdex.com>
 *  @version $Revision$
 */

function container( p, sTemp, sPath, index, xIndex )
{
	if( container.prototype.containerInitd == undefined )
	{
		this.initProto = _containerInitProto;
		this.initProto( "container" );
		container.prototype.containerInitd = true;
	}

	// call base class constructor to inits vars
	this.edxnode( p, sTemp, sPath, index );
	
	// init class vars
	this.type = "container";
	this.nodeClass = "container";
	this.bEmpty = true;
}

//
//						_containerInitProto
//
function _containerInitProto( sClass )
{
	// call base class proto
	this.initProto = _edxnodeInitProto;
	this.initProto( sClass );
	
	// install our own methods
	eval( sClass + ".prototype.container = container; " +
	      sClass + ".prototype.associate = _containerAssociate; " +
	      sClass + ".prototype.xhtml = _containerXHTML; " +
	      sClass + ".prototype.onXmlNodeChange = _containerOnXmlNodeChange; " +
	      sClass + ".prototype.canMoveUp = _containerCanMoveUp; " +
	      sClass + ".prototype.canMoveDown = _containerCanMoveDown; " +
	      sClass + ".prototype.moveUp = _containerMoveUp; " +
	      sClass + ".prototype.moveDown = _containerMoveDown; " +
	      sClass + ".prototype.insert = _containerInsert; " +
	      sClass + ".prototype.permitChildSplit = _containerPermitChildSplit; " +
	      sClass + ".prototype.canDelete = _containerCanDelete; " +
	      sClass + ".prototype.permitChildDelete = _containerPermitChildDelete; " +
	      sClass + ".prototype.deleteChild = _containerDeleteChild; " +
	      sClass + ".prototype.createNode = _containerCreateNode; " +
	      sClass + ".prototype.nodeHasSplit = _containerNodeHasSplit; " +
	      sClass + ".prototype.sanityCheck = _containerSanityCheck; " +
	      sClass + ".prototype.cleanup = _containerCleanup" );
}

//
//						_containerAssociate
//
function _containerAssociate( h )
{
//alert(h.innerHTML);
	this.edxnodeAssociate( h );
	//this.root.watchChanges( this.getXmlNode(), this );
}


//
//						_containerXHTML
//
function _containerXHTML( oFrag )
{
//alert('container');
	//try {
	with( this )
	{
		// find our edit node
		var editnode = getXmlNode();

//alert(serializa_me(editnode));
if (navegador == "firefox15")
	{
		for (b = 0; b < editnode.childNodes.length; b++)
			{
			if (is_ignorable(editnode.childNodes[b]))
				{
				editnode.removeChild(editnode.childNodes[b]);
				//alert('lo borre');
				//alert("-> "+ serializa_me(editnode));
				}
			}
	}
		if( editnode == null )
		{
			//err( "containerXHTML: no XML node associated" );
			return;
		}	

		// if we don't have a parent XML, create one
		if( oFrag == null )
			oFrag = stringToXmlNode( "<tmp></tmp>" );
			
		// display ourselves
		var children = editnode.childNodes;
		if( children.length == 0 )
		{
			// empty container-- see if an placeholder template is provided
			var node = createNode( "#empty", 0 );
			
			// if so, add it
			if( node != null )
			{
				oFrag.appendChild( node );
			}
			bEmpty = true;
		}
		else
		{
			var i;
			var indice = 0;
			var indice2 = 0;
			
			for( i = 0; i < children.length; i++ )
			{
				if (!is_ignorable(children[i]))
					{
					var tag = children[i].nodeName;;

					//alert('tag -> ' + tag);
					//alert('indice -> ' + indice);
					// make the new node
					var node = createNode( tag, i);

					if (editnode.tagName != undefined || editnode.tagName == "fila"){
						var my_clase = editnode.getAttribute( "clase" );
						var my_ancho = editnode.getAttribute( "ancho" );
	
						if (my_clase != null){ 
							variable_estilo = my_clase;
							//alert(variable_estilo);
							}
						}
						if (my_ancho != null){
							variable_ancho = my_ancho;
							}
						var sClass = utilGetXmlAttribute( oFrag, "class" );
						var sAncho = utilGetXmlAttribute( oFrag, "width" );

						if (variable_estilo)
						{
							if (variable_estilo != "" && sClass=="@clase"){
							oFrag.setAttribute( 'class', variable_estilo );
							}
							else if (variable_estilo == "") {
								oFrag.setAttribute( 'class', 'normal' );
								}
						}
						if (my_ancho){
							if (variable_ancho != "" && sAncho=="@ancho"){
							oFrag.setAttribute( 'width', variable_ancho );
							}
							
						}
					
					// attach this node to the parent fragment node
					oFrag.appendChild( node );
					indice = i;
					}
				
			}
			bEmpty = false;
		}
		return oFrag;
	}
	/*}
	//catch(e)
	{
		err( "exception in containerXHTML: " + e );
	}*/
}

//
//						_containerCreateNode
//
var my_Path;
function _containerCreateNode( tag, index)
{
	with( this )
	{
	
		var node = getTemplate().selectSingleNode( "edx:match[@element = '" + tag + "']" );
	
		if( node == null )
		{
			if( tag != "#empty" )
			{
				err( "Error: no ha sido encontrado el elemento " + tag + " en la plantilla " + edxtemplate );
			}
			return null;
		}
	if (navegador == "firefox15")
		{
		// eliminamos los nodos tipo "#text"
		for (n = 0; n < node.childNodes.length; n++)
			{
			if (!is_ignorable(node.childNodes[n]))
				{
				node = node.childNodes[n].cloneNode( true );
				break;
				}
			}
//alert(serializa_me(node));
		}
	else
		{
		// al explorer le da igual
		node = node.childNodes[0].cloneNode( true );
		}
		
		// and fetch xhtml for this new child
		var sTemplate = utilGetXmlAttribute( node, "edxtemplate" );
		var sOptions = utilGetXmlAttribute( node, "edxoptions" );
		var sPath = utilGetXmlAttribute( node, "edxpath" );
		
		if( sPath == null || sPath == "." )
			sPath = "";
		else
			sPath = "/" + sPath;

//node.setAttribute("edxpath", "node()[" + index + "]" + sPath);
if (navegador == "ie")
	{
	cadena = "node()[" + index + "]" + sPath;
	}
else{
	el_index = index + 1;
	cadena = "node()[position() = " + el_index + "]"  + sPath;
	}

		var obj = factory( sTemplate, cadena, sOptions, index, "F" + index + sPath );


		
		// backlink to edxnode object structure
		obj.setHtmlAttributes( node );

		// and in turn get its xhtml
		obj.xhtml( node );
//	alert(obj);		
//alert(serializa_me(node));

		return node;
	}
}

//
//						_containerOnXmlNodeChange
//
//	Simply reload ourselves from the ground up.
//
function _containerOnXmlNodeChange( sender )
{
	// ignore updates from ourself
	if( sender == this )
		return;
		
	this.load();
}

//
//						_containerCanMoveUp
//
function _containerCanMoveUp( e )
{
	with( this )
	{
		var uid = e.hobj.uniqueID;
		var i;
		var children = hobj.childNodes;
		for( i = 0; i < children.length; i++ )
		{
			if( children[i].uniqueID == uid )
			{
				return i != 0 ? true : false;
			}
		}
		err( "Error: couldn't find " + h.tagName + " in container collection." );
		return false;
	}
}

//
//						_containerCanMoveDown
//
function _containerCanMoveDown( e )
{
	with( this )
	{
		var uid = e.hobj.uniqueID;
		var i;
		var children = hobj.childNodes;
		for( i = 0; i < children.length; i++ )
		{
			if( children[i].uniqueID == uid )
			{
				return i != (children.length - 1) ? true : false;
			}
		}
		err( "Error: couldn't find " + h.tagName + " in container collection." );
		return false;
	}
}

//
//						_containerMoveUp
//
function _containerMoveUp( e )
{
	with( this )
	{

		var uid = e.hobj.uniqueID;
		var i;
		var children = hobj.childNodes;
		for( i = 0; i < children.length; i++ )
		{
			if( children[i].uniqueID == uid )
			{
				if( i == 0 )
				{
					//err( "Error: moveUp called on first node" );
					return;
				}
				
				// swap HTML first
				if (navegador=="ie")
					{
					var tmp = children[i-1].swapNode( children[i] );
					}
				else
					{
					var tmp = children[i-1].swapNodeUp( children[i] );
					}
				
				// do XML nodes
				var oXml = getXmlNode();
				var xmlmgr = root.getXmlManager();
				xmlmgr.openTransaction( oXml );
				xmlmgr.process( "moveChildUp", oXml, i );
				xmlmgr.closeTransaction();
				
				// finally swap edxnodes
				removeChild( e );
				insertChild( e, i - 1 );
				
				// broadcast to anyone else interested
				root.alertChange( oXml, this );
				return;
			}
		}

		err( "Error: no se pudo mover hacia arriba la etiqueta " + h.tagName + " dentro del contenedor." );
		return false;
	}
}

//
//						_containerMoveDown
//
function _containerMoveDown( e )
{
	with( this )
	{
		var uid = e.hobj.uniqueID;
		var i;
		
		var children = hobj.childNodes;
		for( i = 0; i < children.length; i++ )
		{
			if( children[i].uniqueID == uid )
			{
				if( i == children.length - 1 )
				{
					err( "Error: moveDown called on last node" );
				}
				// intercambiamos las posiciones del HTML primero

				var tmp = children[i+1].swapNode( children[i] );
				
				// next swap XML
				var oXml = getXmlNode();
				var xmlmgr = root.getXmlManager();
				xmlmgr.openTransaction( oXml );
				xmlmgr.process( "moveChildDown", oXml, i );
				xmlmgr.closeTransaction();
				
				// finally do edxnodes
				removeChild( e );
				insertChild( e, i + 1 );
				
				// let other interested parties know
				root.alertChange( oXml, this );
				return;
			}
		}

		err( "Error: no se pudo mover hacia abajo la etiqueta " + h.tagName + " dentro del contenedor." );
		return false;
	}
}

//
//						_containerInsert
//
/*
/////
		
*/

function _containerInsert( sTemplate, e )
{

	laplantilla = sTemplate;
	elevento = e;
	params = new Array();
	paramsH = new Array();
	paramsE = new Array();
	
	params = e;
	
//	alert(e);
	
	with( this )
	{
		paramsH = hobj;
		var v = root.getView();
		var t = v.getTemplate( sTemplate );
		
		var x = t.selectSingleNode( "edx:insert" );

		limpia_blanco(x);
		// Revisa si la etiqueta xml se trata de un modulo activado para el proyecto
		var x = revisamodulos(sTemplate, x);
		
		if (navegador == "firefox15" && sTemplate == "tabla")
			{
			
			return;
			}
		
		/*if( x == null )
		{
			err( "Error: no se pudo encontrar la plantilla: " + sTemplate );
			return;
		}*/
		
		
		
		// get position of element to insert after
		var uid = e.hobj.uniqueID;
		
		//alert(uid);
		var i;
		var children = hobj.childNodes;

		if( children.length > 0 )
		{
			for( i = 0; i < children.length; i++ )
			{
				if( children[i].uniqueID == uid )
					break;
			}
			if( i == children.length )
			{
				err( "Error: no se pudo insertar la etiqueta en el contenedor" );
				return;
			}
		}
		else
		{
			i = 0;
		}
		
//		alert(x.childNodes[0]);
		// insert the XML node
		var x = x.childNodes[0].cloneNode( true );
		
		var editnode = getXmlNode();


		
		var xmlmgr = root.getXmlManager();
		xmlmgr.openTransaction( editnode );
		
		xmlmgr.process( "insertNode", editnode, x, i );
		xmlmgr.closeTransaction();
		
	
		// insert seed node into HTML tree
		var tag = x.nodeName;
		
		var node = createNode( tag, i );

limpia_blanco(node);

		// insert the fragment
		tag = hobj.tagName;

		if( tag == "TBODY" )
		{
			utilInsertRowAt( hobj, node, i );			
		}
		else if( tag == "TR" )
		{
			utilInsertCellAt( hobj, node, i );
		}
		else
		{
			if( hobj.childNodes.length > 0 )
			{
				if (navegador == "ie")
					{
					
					
						hobj.childNodes[i].insertAdjacentHTML( "BeforeBegin", node.xml );
					
					
					// alert(hobj.childNodes[i].innerHTML);
				// hobj.childNodes[i].insertAdjacentHTML( "BeforeBegin", node.xml );
				// hobj.childNodes[i].insertAdjacentHTML( "AfterEnd", node.xml );
					}
				else
					{
					var frag = document.createElement("div");
					var s = serializa_me(node);
					frag.innerHTML = s;
					hobj.insertBefore( frag, hobj.childNodes[i] );
					}
			}
			else
			{
			
				hobj.innerHTML = serializa_me(node);
			}
		}
		// and do the association
		childNodes[i].associate( hobj.childNodes[i] );
		performAssociation( hobj.childNodes[i] );
		
		
		
		// see if we need to clean up empty container placeholder
		if( bEmpty && childNodes.length == 2 )
		{
			
			deleteChild( childNodes[1] );
		}
		bEmpty = false;
//		
		// alert about changes
		root.alertChange( editnode, this );
		
		//alert('aqui?');
		
	}
}

//
//						_containerPermitChildSplit
//
//	May do future schema checking or cardinality testing here but for now it's a green light.
//
function _containerPermitChildSplit( child )
{
	return true;
}

//
//						_containerCanDelete
//
function _containerCanDelete()
{
	with( this )
	{
		// if we have children we're not going anywhere
		if( childNodes.length != 0 )
			return false;
			 
		// see what parent thinks
		if( !parent.permitChildDelete() )
			return false;
		
		// guess we're good to go
		return true;
	}
}

//
//						_containerPermitChildDelete
//
//	May do future schema checking or cardinality testing here but for now it's a green light.
//
function _containerPermitChildDelete( child )
{
	return true;
}

//
//						_containerDeleteChild
//
//	Deletes a child of this container.
//
function _containerDeleteChild( child )
{
	with( this )
	{
		// find the child index
		var i;
		i = utilArrayIndex( childNodes, child );
		if( i == -1 )
		{
			err( "containerDelete: child not found" );
			return;
		}


		//alert('_containerDeleteChild');
		// remove the HTML node
		hobj.removeChild( hobj.childNodes[i] );
		
		// save child XML node
		var editnode = getXmlNode();
		var nChild = editnode.childNodes[i];
		
		// and now have the edxnode take itself out
		childNodes[i].cleanup();
		
		// remove the XML node (if it's not a placeholder which will have same node as parent)
		if( nChild != null && editnode != nChild )
		{
			var xmlmgr = root.getXmlManager();
			xmlmgr.openTransaction( editnode );
			xmlmgr.process( "deleteNode", editnode, i );
			xmlmgr.closeTransaction();
		}

		// see if this leaves us empty (and we don't know that already)
		if( childNodes.length == 0 )
		{
			// force a reload to pick up empty container placeholder if provided
			root.alertChange( editnode, null );
		}
		else
		{
			// alert about changes
			root.alertChange( editnode, this );
		}
	}
}


//
//						_containerNodeHasSplit
//
//	Called when an immediate child of the container has split.  This will cause
//	a reload of the spec'd node and a new node to be created immediately following
//	for the new XML node.  Returns new child edxnode so caller can establish focus.
//
function _containerNodeHasSplit( child )
{
	with( this )
	{
		var i;
		for( i = 0; i < childNodes.length; i++ )
		{
			if( child == childNodes[i] )
				break;
		}
		if( i == childNodes.length )
		{
			err( "nodeHasSplit: child not found" );
			return null;
		}
				
		// first reload the split child
		child.load();
		
		// now pick up the new node immediately after
		i++;
		var editnode = getXmlNode();
		var newNode = editnode.childNodes[i];
		var tag = newNode.nodeName;
		var node = createNode( tag, i );
		
	
		// insert the fragment
		tag = hobj.tagName;
		if( tag == "TBODY" || tag == "TR" )
		{
			utilInsertRowAt( hobj, node, i );
		}
		else
		{

		for (b = 0; b < node.childNodes.length; b++)
			{
			if (is_ignorable(node.childNodes[b]))
				{
				node.removeChild(node.childNodes[b]);
				//alert('lo borre');
				//alert("-> "+ serializa_me(editnode));
				}
			}
		
			var s = serializa_me(node);
			s = s.replace( />\s+</g, "><" );
			hobj.childNodes[i-1].insertAdjacentHTML( "afterEnd", s );
		
			
			
		}

		// and do the association
		childNodes[i].associate( hobj.childNodes[i] );
		performAssociation( hobj.childNodes[i] );

		// we're good, return the new guy
		return childNodes[i];
	}
}

//
//						containerMatch
//
//	Little object defining a match inside a container.
//
function containerMatch( sTag, sTemp, sUI, oTemp )
{
	this.tag = sTag;
	this.edxtemplate = sTemp;
	this.uiname = sUI;
	this.oTemplate = oTemp;
}

//
//						_containerCleanup
//
function _containerCleanup()
{
	with( this )
	{
		var editnode = getXmlNode();
		if( editnode != null )
		{
			root.unwatchChanges( editnode, this );
		}
		edxnodeCleanup();
	}
}

//
//						_containerSanityCheck
//
//	Do a few container-specific sanity checks in addition to the standard node ones.
//
function _containerSanityCheck( d )
{
	with( this )
	{
		var bSuccess = edxnodeSanityCheck( d );

		// first check the counts
		var editnode = getXmlNode();
		var xCnt = editnode.childNodes.length;
		var eCnt = childNodes.length;
		if( xCnt != eCnt )
		{
			err( "XML node cnt: " + xCnt + " edxnode cnt: " + eCnt );
			bSuccess = false;
		}
		else if( hobj != null )
		{
			var hCnt = hobj.childNodes.length;
			if( hCnt != eCnt )
			{
				err( "edxnode cnt: " + eCnt + " HTML node cnt: " + hCnt );
				bSuccess = false;
			}
		}
		
		// walk our list of children verifying that XML and HTML nodes all appear in sync
		var i;
		var s = "";
		for( i = 0; i < childNodes.length; i++ )
		{
			// correlate XML nodes against our own child list
			if( editnode != null )
			{
				if( editnode.childNodes[i] != childNodes[i].getXmlNode() )
				{
					s += "XML node mismatch at slot " + i + "\n";
					bSuccess = false;
				}
			}
			
			// correlate HTML nodes
			if( hobj != null )
			{
				var h = hobj.childNodes[i];
				if( h != undefined && h.eobj != childNodes[i] )
				{
					s += "HTML node eobj var doesn't match parent edxnode at slot " + i + "\n";
					bSuccess = false;
				}
			}
		}
		if( s.length != s )
		{
			err( "container correlation errors: " + s );
		}
	}
	if( !bSuccess )
	{
		err( "sanityCheck failed: " + this.edxtemplate );
	}
	return bSuccess;
}
