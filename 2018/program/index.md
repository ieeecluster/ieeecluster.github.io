---
layout: page
#
# Content
#
#subheadline: "Schedule"
#title: "Technical Program"
teaser: ""
header:
   image_fullwidth: "belfast.jpg"
   permalink: "/contact/"
---

<!--
The program is available at the following link:

[Technical program](https://ssl.linklings.net/conferences/ieeecluster/ieeecluster2018_program/views/at_a_glance.html)
-->

<!--
<script type="text/javascript">
/* free code from dyn-web.com */

function getDocHeight(doc) {
    doc = doc || document;
    // from http://stackoverflow.com/questions/1145850/get-height-of-entire-document-with-javascript
    var body = doc.body, html = doc.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
    //var height = Math.max( body.scrollHeight, body.offsetHeight );
    return height;
}

function setIframeHeight(id) {
    var ifrm = document.getElementById(id);
    var doc = ifrm.contentDocument? ifrm.contentDocument: ifrm.contentWindow.document;
    ifrm.style.visibility = 'hidden';
    ifrm.style.height = "0px"; // reset to minimal height in case going from longer to shorter doc
    //ifrm.style.height='auto';
    ifrm.style.height = getDocHeight( doc ) + "px";
    //var newHeight = $( 'html', ifrm.contentDocument).height();
    //var newHeight = ifrm.contents().height();
    //ifrm.style.height = newHeight + "px";
    ifrm.style.visibility = 'visible';
    console.log('RESIZE ' + ifrm.style.height);
}

 var iframe = document.createElement("iframe");
 iframe.setAttribute('id', "ifrm1");
 iframe.setAttribute('src', 'at_a_glance.html'); // change the URL
 iframe.setAttribute('width', '100%');
 iframe.setAttribute('height', '0');
 iframe.setAttribute('frameBorder', '0');
 iframe.setAttribute('scrolling', 'no');
 iframe.setAttribute('onload' ,"setIframeHeight(this.id)");
 document.body.appendChild(iframe);
</script>
-->
<embed src="at_a_glance.html" style="width: 100vw; height: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw;">

