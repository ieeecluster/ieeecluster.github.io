<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="https://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" encoding="utf-8" />
<xsl:template match="/rss">
	<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE html &gt;</xsl:text>
	<html>
	<head>
		<xsl:text disable-output-escaping="yes"><![CDATA[
			<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>RSS Feed (Styled)</title>
	<link rel="stylesheet" type="text/css" href="https://clustercomp.org/2018/assets/css/styles_feeling_responsive.css" />
	<script src="https://clustercomp.org/2018/assets/js/modernizr.min.js"></script>

  <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js"></script>
  <script>
    WebFont.load({
      google: {
        families: [ 'Lato:400,700,400italic:latin', 'Volkhov::latin' ]
      }
    });
  </script>

  <noscript>
    <link href='http://fonts.googleapis.com/css?family=Lato:400,700,400italic|Volkhov' rel='stylesheet' type='text/css' />
  </noscript>

  
	
	<meta name="description" content="Website for IEEE Cluster 2018, September 2018, Belfast, UK" />

	

	



	
	<link rel="icon" sizes="32x32" href="https://clustercomp.org/2018/assets/img/favicon-32x32.png" />




	
	<link rel="icon" sizes="192x192" href="https://clustercomp.org/2018/assets/img/touch-icon-192x192.png" />




	
	<link rel="apple-touch-icon-precomposed" sizes="180x180" href="https://clustercomp.org/2018/assets/img/apple-touch-icon-180x180-precomposed.png" />




	
	<link rel="apple-touch-icon-precomposed" sizes="152x152" href="https://clustercomp.org/2018/assets/img/apple-touch-icon-152x152-precomposed.png" />




	
	<link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://clustercomp.org/2018/assets/img/apple-touch-icon-144x144-precomposed.png" />




	
	<link rel="apple-touch-icon-precomposed" sizes="120x120" href="https://clustercomp.org/2018/assets/img/apple-touch-icon-120x120-precomposed.png" />




	
	<link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://clustercomp.org/2018/assets/img/apple-touch-icon-114x114-precomposed.png" />




	
	<link rel="apple-touch-icon-precomposed" sizes="76x76" href="https://clustercomp.org/2018/assets/img/apple-touch-icon-76x76-precomposed.png" />




	
	<link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://clustercomp.org/2018/assets/img/apple-touch-icon-72x72-precomposed.png" />




	
	<link rel="apple-touch-icon-precomposed" href="https://clustercomp.org/2018/assets/img/apple-touch-icon-precomposed.png" />	




	
	<meta name="msapplication-TileImage" content="https://clustercomp.org/2018/assets/img/msapplication_tileimage.png" />




	
	<meta name="msapplication-TileColor" content="#fabb00" />



	<!-- Facebook Optimization -->
	<meta property="og:locale" content="en_EN" />
	
	<meta property="og:title" content="RSS Feed (Styled)" />
	<meta property="og:description" content="Website for IEEE Cluster 2018, September 2018, Belfast, UK" />
	<meta property="og:url" content="https://clustercomp.org/2018//assets/xslt/rss.xslt" />
	<meta property="og:site_name" content="IEEE Cluster 2018" />
	

	

	<!-- Search Engine Optimization -->
	

	<link type="text/plain" rel="author" href="https://clustercomp.org/2018/humansv2.txt" />

	

	

	
	<script src="https://s3-us-west-2.amazonaws.com/ieeeshutpages/gdpr/settings.js"></script>
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css"
					/>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js"></script>
	<script>
	  window.addEventListener("load", function(){
	    window.cookieconsent.initialise(json)
	  });
	</script>

		]]></xsl:text>
	</head>
	<body id="top-of-page">
		<xsl:text disable-output-escaping="yes"><![CDATA[
		
<div id="navigation" class="sticky">
  <nav class="top-bar" role="navigation" data-topbar>
    <ul class="title-area">
      <li class="name">
      <h1 class="show-for-small-only"><a href="https://clustercomp.org/2018" class="icon-tree"> IEEE Cluster 2018</a></h1>
    </li>
       <!-- Remove the class "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->
      <li class="toggle-topbar menu-icon"><a href="#"><span>Navigation</span></a></li>
    </ul>
    <section class="top-bar-section">

      <ul class="right">
        

              

          
          
        

              

          
          
        

              

          
          
        

              

          
          
        

              

          
          
        

              

          
          
        

              

          
          
        

              

          
          
        

              

          
          
        

              

          
          
        

              

          
          
        
        
      </ul>

      <ul class="left">
        

              

          
          

            
            
              <li><a href="https://clustercomp.org/2018/">Home</a></li>
              <li class="divider"></li>

            
            
          
        

              

          
          

            
            
              <li><a href="https://clustercomp.org/2018/technical">Papers</a></li>
              <li class="divider"></li>

            
            
          
        

              

          
          

            
            
              <li><a href="https://clustercomp.org/2018/authors">Authors</a></li>
              <li class="divider"></li>

            
            
          
        

              

          
          

            
            
              <li><a href="https://clustercomp.org/2018/sponsors">Sponsors</a></li>
              <li class="divider"></li>

            
            
          
        

              

          
          

            
            
              <li><a href="https://clustercomp.org/2018/workshops">Workshops</a></li>
              <li class="divider"></li>

            
            
          
        

              

          
          

            
            
              <li><a href="https://clustercomp.org/2018/posters">Posters</a></li>
              <li class="divider"></li>

            
            
          
        

              

          
          

            
            
              <li><a href="https://clustercomp.org/2018/program">Program</a></li>
              <li class="divider"></li>

            
            
          
        

              

          
          

            
            
              <li><a href="https://clustercomp.org/2018/student">Mentoring</a></li>
              <li class="divider"></li>

            
            
          
        

              

          
          

            
            
              <li><a href="https://clustercomp.org/2018/registration">Registration</a></li>
              <li class="divider"></li>

            
            
          
        

              

          
          

            
            
              <li><a href="https://clustercomp.org/2018/committees">Committees</a></li>
              <li class="divider"></li>

            
            
          
        

              

          
          

            
            
              <li><a href="https://clustercomp.org/2018/venue">Venue</a></li>
              <li class="divider"></li>

            
            
          
        
        
      </ul>
    </section>
  </nav>
</div><!-- /#navigation -->

		

<div id="masthead-no-image-header">
	<div class="row">
		<div class="small-12 columns">
			<a id="logo" href="https://clustercomp.org/2018" title="IEEE Cluster 2018 – International Conference on Cluster Computing">
				<img src="https://clustercomp.org/2018/assets/img/logo.png" alt="IEEE Cluster 2018 – International Conference on Cluster Computing">
			</a>
		</div><!-- /.small-12.columns -->
	</div><!-- /.row -->
</div><!-- /#masthead -->








		


<div class="alert-box warning radius text-center"><p>This <a href="https://en.wikipedia.org/wiki/RSS" target="_blank">RSS feed</a> is meant to be used by <a href="https://en.wikipedia.org/wiki/Template:Aggregators" target="_blank">RSS reader applications and websites</a>.</p>
</div>



		]]></xsl:text>
		<header class="t30 row">
	<p class="subheadline"><xsl:value-of select="channel/description" disable-output-escaping="yes" /></p>
	<h1>
		<xsl:element name="a">
			<xsl:attribute name="href">
				<xsl:value-of select="channel/link" />
			</xsl:attribute>
			<xsl:value-of select="channel/title" disable-output-escaping="yes" />
		</xsl:element>
	</h1>
</header>
<ul class="accordion row" data-accordion="">
	<xsl:for-each select="channel/item">
		<li class="accordion-navigation">
			<xsl:variable name="slug-id">
				<xsl:call-template name="slugify">
					<xsl:with-param name="text" select="guid" />
				</xsl:call-template>
			</xsl:variable>
			<xsl:element name="a">
				<xsl:attribute name="href"><xsl:value-of select="concat('#', $slug-id)"/></xsl:attribute>
				<xsl:value-of select="title"/>
				<br/>
				<small><xsl:value-of select="pubDate"/></small>
			</xsl:element>
			<xsl:element name="div">
				<xsl:attribute name="id"><xsl:value-of select="$slug-id"/></xsl:attribute>
				<xsl:attribute name="class">content</xsl:attribute>
				<h1>
					<xsl:element name="a">
						<xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
						<xsl:value-of select="title"/>
					</xsl:element>
				</h1>
				<xsl:value-of select="description" disable-output-escaping="yes" />
			</xsl:element>
		</li>
	</xsl:for-each>
</ul>

		<xsl:text disable-output-escaping="yes"><![CDATA[
		    <div id="up-to-top" class="row">
      <div class="small-12 columns" style="text-align: right;">
        <a class="iconfont" href="#top-of-page">&#xf108;</a>
      </div><!-- /.small-12.columns -->
    </div><!-- /.row -->


    <footer id="footer-content" class="bg-grau">
      <div id="footer">
        <div class="row">
          <div class="medium-6 large-5 columns">
            <h5 class="shadow-black">About This Site</h5>

            <p class="shadow-black">
              Website for IEEE Cluster 2018, September 2018, Belfast, UK
            </p>
          </div><!-- /.large-6.columns -->


          <div class="small-6 medium-3 large-3 large-offset-1 columns">
            
              
                <h5 class="shadow-black">Services</h5>
              
            
              
            
              
            
              
            
              
            

              <ul class="no-bullet shadow-black">
              
                
                  <li >
                    <a href=""  title=""></a>
                  </li>
              
                
                  <li >
                    <a href="/contact/"  title="Contact">Contact</a>
                  </li>
              
                
                  <li >
                    <a href="/feed.xml"  title="Subscribe to RSS Feed">RSS</a>
                  </li>
              
                
                  <li >
                    <a href="/atom.xml"  title="Subscribe to Atom Feed">Atom</a>
                  </li>
              
                
                  <li >
                    <a href="/sitemap.xml"  title="Sitemap for Google Webmaster Tools">sitemap.xml</a>
                  </li>
              
              </ul>
          </div><!-- /.large-4.columns -->


          <div class="small-6 medium-3 large-3 columns">
            
              
                <h5 class="shadow-black">Related Links</h5>
              
            
              
            
              
            
              
            
              
            

            <ul class="no-bullet shadow-black">
            
              
                <li >
                  <a href=""  title=""></a>
                </li>
            
              
                <li class="network" >
                  <a href="http://www.ieee.org/" target="_blank"  title="Institute of Electrical and Electronics Engineers">IEEE Home</a>
                </li>
            
              
                <li class="network" >
                  <a href="https://cluster17.github.io" target="_blank"  title="IEEE Cluster 2017">IEEE Cluster 2017</a>
                </li>
            
              
                <li class="network" >
                  <a href="http://ieeecluster2016.org" target="_blank"  title="IEEE Cluster 2016">IEEE Cluster 2016</a>
                </li>
            
              
                <li class="network" >
                  <a href="http://www.computer.org" target="_blank"  title="The Community for Technology Leaders">IEEE Computer Society</a>
                </li>
            
            </ul>
          </div><!-- /.large-3.columns -->
        </div><!-- /.row -->

      </div><!-- /#footer -->

    </footer>

		


<script src="https://clustercomp.org/2018/assets/js/javascript.min.js"></script>









		]]></xsl:text>
	</body>
	</html>
</xsl:template>
<xsl:template name="slugify">
	<xsl:param name="text" select="''" />
	<xsl:variable name="dodgyChars" select="' ,.#_-!?*:;=+|&amp;/\\'" />
	<xsl:variable name="replacementChar" select="'-----------------'" />
	<xsl:variable name="lowercase" select="'abcdefghijklmnopqrstuvwxyz'" />
	<xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
	<xsl:variable name="lowercased"><xsl:value-of select="translate( $text, $uppercase, $lowercase )" /></xsl:variable>
	<xsl:variable name="escaped"><xsl:value-of select="translate( $lowercased, $dodgyChars, $replacementChar )" /></xsl:variable>
	<xsl:value-of select="$escaped" />
</xsl:template>
</xsl:stylesheet>
