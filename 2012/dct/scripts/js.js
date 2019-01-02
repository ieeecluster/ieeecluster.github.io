// JavaScript Document   <script language="javascript">
		function displaySubMenu() {
			var subMenu = document.getElementById("more");
			document.getElementById("more").style.zIndex="9";
			subMenu.style.display = "block";
			//add by dyl 为了加载clbprotal中ProtleContent.jsp页面专门做的处理iframe宽的代码
			m_TB=document.getElementById("oTB");
			m_IF=document.getElementById("oIF");
			
			childnodes=subMenu.childNodes
			for(i=0;i<childnodes.length;i++){
				if(childnodes[i].nodeName=="TABLE"){
					m_TB=childnodes[i];
				}
			}
			if(m_TB&&oIF){
				m_IF.width=m_TB.offsetWidth+"px";
				m_IF.height=m_TB.offsetHeight+"px";
			}
		}
		function hideSubMenu() {
		  var subMenu = document.getElementById("more");
		  document.getElementById("more").style.zIndex="0";
		  subMenu.style.display = "none";
		}
		