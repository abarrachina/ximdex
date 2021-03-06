<?php
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



require_once(dirname(__FILE__) . '/ModulesManager.class.php');

ModulesManager::file("/inc/modules/modules.const");
ModulesManager::file("/inc/modules/DefManager.class.php");


/**
 *  
 */
class ModulesConfig {

	// Object composition.
	var $defMngr;
	
	/**
     *  @public
     */   
    function ModulesConfig() {
 		
    	$this->defMngr = new DefManager(XIMDEX_ROOT_PATH.MODULES_INSTALL_PARAMS);
    	
    	$this->defMngr->setPrefix(PRE_DEFINE_MODULE);
    	$this->defMngr->setPostfix(POST_DEFINE_MODULE);
	}
	
	
    /**
     *  @public
     */   
	function enableModule($name) {
		$this->defMngr->enableItem(strtoupper($name));
	}
	
	/**
     *  @public
     */   
	function disableModule($name) {

		$this->defMngr->disableItem(strtoupper($name));
	}	
	
}

?>
