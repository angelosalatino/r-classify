<!DOCTYPE html>
<html lang="en">
    <head>
        {% load static %}
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>   
        <meta name="Description" content="Classifying scholarly publications according to an ontology of research areas">
        <meta name="Keywords" content="scholarly data, ontology learning, bibliographic data, scholarly
ontologies, data mining, conference proceedings, metadata">
        <!-- Schema.org markup for Google+ -->
        <meta itemprop="name" content="Classify">
        <meta itemprop="description" content="Classify Your Paper">
        <meta itemprop="image" content="{% static "img/classify-logo-social.png"}">
        <!-- Twitter Card data -->
        <meta name="twitter:card" content="summary">
        <meta name="twitter:site" content="@kmiou">
        <meta name="twitter:title" content="Classify">
        <meta name="twitter:description" content="Classify Your Paper">
        <meta name="twitter:creator" content="@kmiou">
        <!-- Twitter Summary card images must be at least 120x120px -->
        <meta name="twitter:image" content="{% static "img/classify-logo-social.png"%}">
        <!-- Open Graph data -->
        <meta property="og:title" content="Classify" />
        <meta property="og:site_name" content="Classify"/>
        <meta property="og:url" content="https://..." />
        <meta property="og:description" content="Classify Your Paper">
        <meta property="og:type" content="article" />
        <meta property="og:image" content="{% static "img/classify-logo-social.png"%}" />
        <meta name="author" content="Damian Dadswell - KMi">    
		<link rel="shortcut icon" href="{% static "img/favicon.png"%}" type="image/png">

        <title>Classify Your Paper</title>
		
		<!-- Font Awesome -->
		<script src="https://kit.fontawesome.com/fbb5ed6dc4.js" crossorigin="anonymous"></script>
        <!-- Bootstrap core CSS -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <!-- Google fonts -->
        <link href="https://fonts.googleapis.com/css?family=Baloo+Paaji|Quicksand:400,600&display=swap&subset=latin-ext" rel="stylesheet">
    	<script src="//kit.fontawesome.com/48c46ac999.js"></script>
        <!-- Custom styles for this template -->
        <link href="{% static "css/style.css"%}" rel="stylesheet">
        <script src="//code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
        <script src="{% static "js/modernizr-2.8.3.min.js"%}"></script>
        <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
        <script src="{% static "js/ie10-viewport-bug-workaround.js"%}"></script>
        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]-->
          <script src="//oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
          <script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <!--[endif]-->
    </head>
    
    <body id="page-top" data-spy="scroll">
        
        <!-- contact modal -->
        <div class="modal fade padding-top-100" id="contact" tabindex="-1" role="dialog" aria-labelledby="contact">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel"></h4>
                    </div>
                    <div class="modal-body">
                        <h2>Contact Francesco Osborne</h2>
                        <p>Form goes here...</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- contact modal ends -->
        
        <!-- header -->
        <header>
			<div class="warn" id="browser_warn" hidden>
			<p class="browser_text">Warning: some functionalities of this web app might not work on your browser. We recommend you to use Google Chrome</p>
			</div>
            <h1>Classify <small><b>Your Paper</b></small></h1>
        </header>
        <!-- header end -->
        
        <!-- About -->
        <div class="container margin-bottom-40 margin-top-40">
            <div class="row">
                <div id="about">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="has-reveal">
                            <p>The CSO Classifier takes as input the abstract or the full text of an article and produces a set of relevant research topics drawn from the <a href="http://cso.kmi.open.ac.uk" target="_blank">Computer Science Ontology</a>. It also allows the user to inspect and improve this selection before exporting it in different formats.</p>
                            <!--<span class="reveal-span">
                                <details>                            
                                    <summary></summary>
                                    <p>Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Quis commodo odio aenean sed adipiscing diam. Risus nullam eget felis eget. Penatibus et magnis dis parturient montes nascetur ridiculus. Tristique et egestas quis ipsum suspendisse. Tempus quam pellentesque nec nam. Sed velit dignissim sodales ut. Id donec ultrices tincidunt arcu non sodales neque. Morbi blandit cursus risus at ultrices mi tempus imperdiet nulla. Tellus orci ac auctor augue mauris.</p>
                                    <p>In mollis nunc sed id semper risus in. Congue quisque egestas diam in arcu cursus. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Enim tortor at auctor urna. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet. Blandit turpis cursus in hac habitasse platea dictumst. Leo vel fringilla est ullamcorper eget. Lobortis elementum nibh tellus molestie nunc. Quis hendrerit dolor magna eget est lorem ipsum dolor. Arcu non sodales neque sodales ut. Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam.</p>
                                </details>
                            </span>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- search -->
        <div class="container margin-bottom-40">
            <div class="row">
                <div id="search">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="form">      
                            <ul class="tab-group">
                                <li class="tab active"><a href="#text">From Text</a></li>
                                <li class="tab"><a href="#pdf">From PDF</a></li>
                            </ul>

                            <div class="tab-content">
                                <!-- tab 1 -->
                                <div id="text">   
                                    <p>Paste the abstract of your paper here and click “classify”.</p>
                                    <form action = 'input/'method='post' id="text_input1">
										{% csrf_token %}
										{{form}}
										<input type="submit" value="Classify" class="submitbutton">
										<p id="text_error" class = "error"></p>
									</form>
                                </div>
                                <!-- tab 2 -->
                                <div id="pdf">   
									<p>Please load your PDF and we will process “title”, “abstract” and “keywords” (if available).</p>
                                    <form action="pdfinput/" enctype="multipart/form-data" method="post" id="pdf_form">
                                        {% csrf_token %}
                                        {{pdf_django_form}}
                                        <input type="submit" value="Load PDF" class="submitbutton">
                                        <p id = "access_error" class="Error"></p>
                                    </form>
                                    <form action="pdfinput/" method="post" id="pdftextform" style="display: none;">
                                    <p>Here is showed the text we extracted from the PDF file you loaded. Before proceeding with classifying it, please amend it if needed. </p>
                                        {% csrf_token %}
                                        {{pdf_text_form}}
                                        <br>
                                        <button id="title_button" style="display: none;" class="button">Click Here to add Title</button>
                                        <button id="abstract_button" style="display: none;" class="button">Click Here to add Abstract</button>
                                        <button id="keywords_button" style="display: none;" class="button">Click Here to add Keywords</button>
                                    <br>
                                    <br>
                                        <input type="submit" value="Classify" class="submitbutton">
                                        <p id = "access_error" class="Error"></p>
                                    </form>
                                </div>
                            </div><!-- tab-content -->
                        </div><!-- /form -->
                    </div>
                </div>
            </div>
        </div>
        <!-- search end -->

        <!-- content -->
		<div id="results" hidden>
        <div id="content">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="scrollTo">
                        <h1>Topics Extracted from your Abstract</h1>
                        <p>Click the plus button on relevant topics to add to your classification. You can add topics not listed using the textbox below the selected topics. Once you have selected all relevant topics, click the copy button to copy them to your clipboard.</p>
                        
                        <div class="results">
                        
                        </div>
                        
                        <div class="form">
                            <form action="/topics/" method="post" id="topics_form">
                                {% csrf_token %}
								<div class="topic_buttons">
                                <label class="suggested" id="scrollLabel">Suggested Topics</label>
                                <ul id="list1" class="topics droptrue">
                                </ul>
                                <div class="clearfix margin-bottom-20"></div>
                                <button class="add_all">Add all topics</button>
                                <label>Selected Topics</label>
                                <ul id="list2" class="topics-selected dropfalse">
                                    
                                </ul>
								</div>
								<div id="missing_topics">
									<input class="typeahead" type="text" id="missing" style="width:98.1%" placeholder="Add other topics...">
								</div>
                                <div class="clearfix margin-bottom-20"></div>
                                
								<ul id="gen_list" hidden></ul>
								
								<input id="added_topics" name="addedtopics" value="" hidden></input>
								
									
								<label hidden>Your chosen topics:</label>
								<input id="basedatadrag" name="alltopics" value="" onchange="basedatachange()" readonly hidden></input>
								<input id="view_topics" name="displaytopics" value="" readonly></input>
								<button type="submit" id="export_clipboard" name="export_clipboard" class="submitbutton" style = "width : 260px">Copy to Clipboard</button>
								
                                <div class="clearfix margin-bottom-20"></div>
                            </form>
							<div id="anno_doc">
								<button class="accordion"><span class="acctext">See your annotated document</span><i class="grab fa fa-plus-circle" id="annoplus"></i></button>
								<div class="panel" style="display: none;">
									<div class="annoexp">This is your document with keywords annotated. Hover over them to see which topics were generated for each word</div>
									<div id="anno_text"></div>
								</div>
							</div>
							<div class="clearfix margin-bottom-20"></div>
                        </div>
						
                    </div>
                </div>
            </div>
        </div>
        </div>
		<div class="loadingspin" id="spinner"></div>
		<div class="clearfix"></div>
        <!-- content end -->

        <!-- footer -->
        <footer id="footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="alignright">
                            <h3 class="alignright">&nbsp;</h3>  
                            <div class="clearfix"></div>
                            <a href="http://kmi.open.ac.uk/" title="Knowledge Media Institute" class="noborder" target="_blank"><img src="{% static "img/kmi-logo.png" %}" class="alignright margin-bottom-40 margin-right-20" height="65" alt="Knowledge Media Institute Logo" /></a>  <a href="http://www.open.ac.uk/" title="The Open University" class="noborder" target="_blank"><img src="{% static "img/ou-logo.png"%}" class="alignright margin-bottom-40 margin-right-20" height="65" alt="The Open University Logo" /></a> <a href="https://cso.kmi.open.ac.uk/" title="Powered by the Computer Science Ontology Portal" class="noborder" target="_blank"><img src="{% static "img/powered-by-cso-white.png"%}" class="alignright margin-bottom-40 margin-right-20" height="65" alt="Computer Science Ontology Powered by Logo" /></a> 
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <div class="clearfix"></div>
        <!-- footer end -->
                
        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="//code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
	    <script src="//stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <script src="{% static "js/jquery.easing.min.js"%}"></script>
        <script src="{% static "js/classie.js"%}"></script>
		<script src="{% static "js/selectFx.js"%}"></script>
        <script src="{% static "js/site.custom.js"%}"></script>
		<!--<script src="{% static "js/input_ajax.js"%}"></script> -->
		<!-- <script src="{% static "js/move_topics.js"%}"></script> -->
		<script src="{% static "js/typeahead.js"%}"></script>
		<script src="{% static "js/missing_textbox.js"%}"></script>

    </body>
</html>
