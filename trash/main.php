<!DOCTYPE html>

<html>
  <head>
    <script src="https://code.jquery.com/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
    <!--script src="http://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.5.0/fabric.min.js"></script-->
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript" src="scripts/svgcanvas.js"></script>
    <script type="text/javascript" src="scripts/googleAppScripts.js"></script>
    <script type="text/javascript" src="scripts/colorsheets-jiver.js"></script>
    <title>SuperCell Screening Calculator Demo</title>
    <script type="text/javascript">
        var app = {},
            definitions,
            parameters,
            model,
            googleAPI;
        //Load the Visualization API and the controls package.Additional packages will auto - load.
        google.load('visualization', '1.0', {
            'packages': ['table', 'corechart'] // '', 'controls', 
        });
        $(window).on('init.grasppe.GoogleAPI', function (event) {
            console.log(event.type, app);
            googleAPI = new grasppe.GoogleAPI('#authorize-div', {
                authorized: function (event, target) {
                    target.run('SuperCellScreenGetModel', [], function (request) {
                        if ('result' in request && 'response' in request.result) {
                            if (typeof app === 'object') app.model = request.result.response.result;
                            else app.model = request.result.response.result;
                            model = app.model;
                            app.parameters = model.parameters,
                            parameters = app.parameters
                            definitions = model.definitions,
                            console.log(event.type, app.model);
                        }
                    });
                }.bind(googleAPI),
                unauthorized: function (event, target) {
                    if (this.authorize) this.authorize(false);
                    console.log(event.type, app.model);
                }.bind(googleAPI)
            });
            googleAPI.authorize(true);
        });
    </script>
    <script src="https://apis.google.com/js/client.js?onload=grasppeGoogleAPI"></script>
    <!-- Le HTML5 shim, for IE6-8 support of HTML elements -->
    <!--[if lt IE 9]>
      <script src="https://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!--[if lt IE 9]>
    <script src="http://html5shiv-printshiv.googlecode.com/svn/trunk/html5shiv-printshiv.js"></script>
    <![endif]-->
    <!-- Le styles -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.11.4/themes/flick/jquery-ui.css">
    <!--link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css"-->
    <!-- This CSS package applies Google styling; it should always be included. -->
    <link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons.css">
    <link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons1.css">
    <link rel="stylesheet" href="stylesheets/bootply-google-plus-bootstrap.css">
    <link rel="stylesheet" href="stylesheets/colorsheets-default.css">

  </head>
  <body>
    <canvas id="vector-canvas" width="1200" height="1200" style="border: solid 1px #999999; position: absolute; display: none;"></canvas>
    <div id="output"></div>
    <div class="block result-display" id="results">
      <div class="hidden" id="error-message">
        Verify that you have permission to access this folder and that the specified folder ID (if any) is correct.
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class=" pull-right">
            <span class="" id="authorize-div">&nbsp;</span>
            <a class="btn btn-xs btn-info " style="margin-left: 4px;" role="button" data-toggle="modal" data-target="#paper-modal" href="#paper-modal"><i class="glyphicon glyphicon-education" style="color:#fff"></i></a>
        </div>
        <h3 class="panel-title" id="main-heading">SuperCell Screening Calculator Demo</h3>
      </div>
      <div id="page-body" class="panel-body collapse" style="padding: 0">
      <div class="container-fluid">
        <div class="row" style="margin-top: 0">
            <div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 container-fluid" id="main-stage" style="margin-top: 10px; min-height: 250px;">
              <a class="info-tag pull-right" style="border-radius: 25%; margin-left: 4px;" role="button" data-toggle="collapse" href="#app-intro-collapse" aria-expanded="false" aria-controls="app-intro-collapse"><i class="glyphicon glyphicon-info-sign"></i></a>
              <div style="/*display: flex; */ width: 100%; height: 100%">
                <div id="stage-wrapper" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 well-sm" style="display: flex;">
                  <div id="stage-canvas-wrapper" style="vertical-align: middle; flex: 1; text-align: center;">
                    <div style="  display: inline-block; width: 400px; height: 400px; text-align: center; overflow: hidden;">
                      <canvas id="stage-canvas" width="800" height="800" style="display: none;">
                      </canvas>
                    </div>
                  </div>
                </div> <!-- stage-wrapper -->
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 well-sm" id="parameters-wrapper">
                  <!--div class="panel-heading"><h3 class="panel-title">Parameters<small class="status" id="parameters-status"></small></h3></div-->
                  <div id="control-wrapper" class="">
                    <div class="collapse well-sm container-fluid" id="app-intro-collapse" style="font-size: small; line-height: 125%;">
                      <div class="row" id="app-intro" style="width:100% padding-left:0;">
                          <div class="col-sm-10" style="vertical-align: text-top;"><b>Introduction</b></div>
                          <div class="col-sm-10" style="vertical-align: text-top;">
                            There are many ways the spots can be arranged within a halftone cell, including center-clustered spots for AM halftones and randomly-placed spots 
                            for FM or Stochastic halftones. Supercells place more than one AM dot within a larger halftone cell-block. It is because of this grouping that Supercells 
                            can grow to the necessary size to flexibly produce more screen rulings and angels with greater gray levels.
                            <a class="blue-tag" data-toggle="modal" data-target="#paper-modal">More</a>
                          </div>
                      </div>
                    </div>
                  </div>
                </div> <!-- parameters-wrapper -->
              </div>
            </div> <!-- main-stage -->
            <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5" id="sidebar" style="margin-top: 10px; min-height: 250px;">
              <div class="panel panel-default">
                <div class="panel-heading well-sm col-xs-12 col-sm-12 col-lg-12">
                  <a class="btn btn-xs btn-success pull-right" style="border-radius: 25%; margin-left: 4px;" role="button" data-toggle="collapse" href="#calculations-table" aria-expanded="false" aria-controls="calculations-table"><i class="glyphicon glyphicon-list-alt" style="color:#fff"></i></a>
                  <a class="btn btn-xs btn-warning pull-right" style="border-radius: 25%; margin-left: 4px;" role="button" data-toggle="collapse" href="#results-explaination" aria-expanded="true" aria-controls="results-explaination"><i class="glyphicon glyphicon-align-left" style="color:#fff"></i></a>
                  <h4 class="panel-title">Results<small class="status" id="results-status"></small><small class="status text-muted" id="parameters-status"></small></h4>
                </div>
                <div class="panel-body panel-sm container-fluid" style="padding: 0;">
                  <div id="results-wrapper" class="col-xs-12 col-sm-4 col-sm-push-8 col-md-12 col-md-push-0 col-lg-12" style="padding: 0; min-height: 100px; transition: height 1s;"></div>
                  <div class="col-xs-12 col-sm-8 col-sm-pull-4 col-md-12 col-md-pull-0 col-lg-12"><p class="explaination collapse in" id="results-explaination" style="font-size: small; line-height: 115%;" aria-expanded="true" ></p></div>
                </div>
              </div> <!-- results-wrapper -->
            </div> <!-- sidebar -->
          </div> <!-- panel-body container-fluid row -->
        </div> <!-- panel-body container-fluid -->
      </div> <!-- panel-body -->
      <div class="panel-footer well-sm"><small class="text-muted">Copyright &copy; 2015, Franz Sigg and Saleh Abdel Motaal.</small></div>
    </div> <!-- panel panel-default -->
    
    <div class="modal fade" id="paper-modal" tabindex="-1" role="dialog" aria-labelledby="paper-modalLabel">
      <div class="modal-dialog" role="document" style= "max-width: 90%; min-height: 90vh; width: 100em;">
        <div class="modal-content" style="border-radius: 0;">
          <!--div class="modal-header"></div-->
          <div class="modal-body" style="max-width: 100%; min-width: 100%; min-height: 90vh;"> <!--data-spy="scroll" data-target="#myScrollspy" data-offset="0" -->
            <div class="container col-sm-12">
              <div class="row">
                <button type="button" class="close pull-right" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <header style="margin: 2em;">
                    <h3 class="modal-title" style="text-align: center; margin-bottom: 1em;">AM Singlecell and Supercell Screening at a Bitdepth of 1</h3>
                    <p style="text-align: center; margin-top: -1em;">Franz Sigg*</p>
                </header>
              </div>
              <div class="row">
                <script>
                    jQuery.fn.scrollTo = function(elem, speed) { 
                        $(this).animate({
                            scrollTop:  $(this).scrollTop() - $(this).offset().top + $(elem).offset().top 
                        }, speed == undefined ? 1000 : speed); 
                        return this; 
                    };
                </script>
                <div class="col-sm-3 col-lg-2 pull-right" id="myScrollspy">
                  <!--a class="dropdown-toggle" data-toggle="dropdown" href="#">Supercell Screening<span class="caret"></span></a-->
                  <ul class="nav nav-pills nav-stacked">
                    <li><a href="javascript: $('#paperScrollContainer').scrollTo('#paperSection1', 200)">Screening</a></li>
                    <li><a href="javascript: $('#paperScrollContainer').scrollTo('#paperSection2', 200)">Single-Cell</a></li>
                    <li><a href="javascript: $('#paperScrollContainer').scrollTo('#paperSection3', 200)">Super-Cell</a></li>
                    <li><a href="javascript: $('#paperScrollContainer').scrollTo('#paperSection4', 200)">Bit-Depth</a></li>
                    <li><a href="javascript: $('#paperScrollContainer').scrollTo('#paperFooter', 200)">Further Reading</a></li>
                  </ul>
                </div>
                <div class="col-sm-9 col-lg-10 container-fluid" style="max-height: 75vh; overflow-y: scroll;" id="paperScrollContainer">
                  <div class="col-xs-12 col-sm-12 col-md-6">
                    <div id="paperSection1" >    
                      <h4>Need for Screening</h4><p>For Offset or Flexo printing, it is only possible to either print full color, or no color. It is not possible to print fractional ink film thicknesses. Such a system is called a 1 bit graylevel system. For such a system to be able to print tone values other than solid or nothing, screening is required. AM screening uses halftone cells that contain halftone dots. By changing dot size relative to the halftone cell, the different tone values can be generated (dot area). To be functional, it is important that the halftone dots are so small, that they are not resolved by the eye and therefore are perceived as continuous tone rather as separate dots.</p><p>With AM screening, for a system with a bitdepth of 1, the number of tone values that can be reproduced is given by the number of spots per halftone cell. Therefore, in order to be able to reproduce sufficient tone values, high addressability systems are needed. Often systems are designed to have 256 gray levels, which means that for these systems there have to be 256 spots per halftone cell, or 16x16 spots. The reason CtP systems often use an addressability of 2400 spots per inch (spi) is because, for a screen ruling of 150 lpi, a halftone cell has 16x16 spots. The general equation that can be used to calculate the number of gray levels is:</p><p>Number of gray levels =  (Addressability / screen ruling)2 +1    or     (spi / lpi)2 +1<br/>One level is added because no spots at all (white paper) is also a gray level.</p>
                    </div><div id="paperSection2" >
                      <h4>Singlecell Sreening</h4><p>Halftone cells must mesh with one another seamlessly. The only way this is possible is by making the 4 corners of a halftone cell go exactly to the intersections of the addressability grid. Therefore, when we request a certain screen ruling and screen angle, the Raster Image Processor (RIP) of the output device may not produce exactly the requested values, instead, it must round the halftone cell size so that it’s corners fall exactly on the addressability grid intersections. The increments by which screen rulings or screen angles are possible depend on the halftone cell size. The larger the halftone cell the more accurate the screening parameters and the more gray levels, but also the coarser the screening.</p><p>If there are not enough gray levels available, gradients in images (sky, skin tone) may be shown with steps. There are ways to reduce the visibility of stepping or posterizing: 1.) use a larger graylevel-cell and  2.)  add a small amount of tonal noise to the picture. (The graylevel-cell does not necessarily have to be the same size as a halftone cell.)</p><p>With single cell screening, the errors in screen angles and screen ruling are so large that for color work, moirés between the 4 colors are likely to occur. Therefore something else is needed in practice.</p>
                    </div>
                  </div><div class="col-xs-12 col-sm-12 col-md-6">
                    <div id="paperSection3" >    
                      <h4>Supercell Screening</h4><p>There are many ways the spots can be arranged within a halftone cell. Center clustered spots produce single cell AM halftones, randomly placed spots produce FM or Stochastic halftones, however it is also possible to place more than one AM dot in a halftone cell, and this results in a Supercell. The advantage of a supercell is that, because it is larger than a single cell, it can produce more accurate screen rulings and screen angels, and, if the gray level cell is also larger, more gray levels can be produced.</p><p>The cells for the separate dots within a supercell no longer have to have the four corners aligned with the addressability grid, only the supercell is aligned. This means that the separate dots within the supercell are not necessarily identical to one another, but on average over the supercell, they cover an area that produces the correct tone value.</p><p>Super cell technology is a very elegant solution to the problems of AM halftoning of 1 bit systems.</p>
                    </div><div id="paperSection4" >         
                        <h4>Systems with a bit depth of more than 1</h4><p>Systems that are unable to achieve high addressability, such as electrostatic printing, need another method to generate tone values. Fortunately, they are able to image each spot at more than one gray level and therefore also achieve high quality printing. Such systems are said to have a bitdepth of more than one. Bitdepth is measured as the number of possible gray levels of each spot, expressed as the power of 2 (256 gray levels = 28 levels = a bit depth of 8)</p>
                    </div>
                  <!--/article-->
                  <footer id="paperFooter" >
                    <h6>Suggested reading</h6><p>Chapters 6 and 7  of: Peter Fink, Adobe Screening: Adobe Accurate Screens, Adobe Press, © 1992</p><div>___________</div><p><small>*Rochester Institute of Technology, SPM, Jan. 30, 08</small></p>
                  </footer>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--div class="modal-footer">
            <a type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Back</a>
          </div-->
        </div>
      </div>
    </div>
    <script type="text/javascript">
        $(function () {
        })
    </script>
    <script type="text/javascript" src="scripts/colorsheets-default.js"></script>
  </body>
</html>
