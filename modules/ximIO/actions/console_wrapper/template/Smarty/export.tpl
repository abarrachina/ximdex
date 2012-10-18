{**
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
 *}

<tr>
	<td>
		{include file="$_APP_ROOT/xmd/template/Smarty/helper/messages.tpl"}
		<form action="{$action}" method="post" id="console_wrapper">
			<input type="hidden" name="nodeid" value=""/>
			<input type="hidden" name="actionid" value="{$id_action}"/>
			
			<div class="info_container"> 
				<label for="nodes">{t}Introduce the first node identifier:{/t}</label>
				<input type="text" id="nodes" name="nodes" />
			</div>
			
			<div class="info_container"> 
				<label for="file">{t}Introduce the exportation name, if you keep it empty, current timestamp will be used:{/t}</label>
				<input type="text" id="file" name="file"/>
			</div>
			
			{button label="Siguiente" class='validate'}
		</form>
	</td>
</tr>
