grasppe = eval("(function (w) {'use strict'; if (typeof w.grasppe !== 'function') w.grasppe = class grasppe{constructor(){}};}(this)); grasppe");

(function (window, grasppe, undefined) {
    'use strict';

    if (!grasppe.ColorSheetsApp) grasppe.ColorSheetsApp = {}; // Preservable ColorSheetsApp placeholder
    grasppe.require('initialize', function () {

        // !- [Directives]
        if (!grasppe.ColorSheetsApp.Directives) grasppe.ColorSheetsApp.Directives = {}; // Preservable ColorSheetsApp placeholder
        Object.assign(grasppe.ColorSheetsApp.Directives, {
            // !- [Directives] Sheet
            Sheet: grasppe.Libre.Directive.define('colorSheetsSheet', {
                link: function colorSheetsSheetLink($scope, element, attributes) {
                    if ($scope.layout.attributes) $(element).attr($scope.layout.attributes);
                },
                template: ('<div class="color-sheets-sheet {{layout.classes}}" {{layout.attributes}} ng-style="layout.style;">\
                    <div ng-repeat="segment in layout.contents" \
	                    {{segment.container}} class="{{segment.classes}}" ng-style="segment.style;" color-sheets-sheet-segment></div>\
                    </div><color-sheets-documentation-dialog/>'),
            }),

            // !- [Directives] SheetSegment
            SheetSegment: grasppe.Libre.Directive.define('colorSheetsSheetSegment', {
                link: function colorSheetsSheetSegmentLink($scope, element, attributes) {
                    if ($scope.segment.attributes) $(element).attr($scope.segment.attributes);
                },
                template: ('<div ng-repeat="section in segment.contents" {{section.attributes}} class="ng-class: section.classes;" ng-init="panel = panels[section.id]" ng-style="section.style;" color-sheets-panel="{{panel}}">{{panel}}</div>'),
            }),

            // !- [Directives] CopyrightsDirective
            Copyrights: grasppe.Libre.Directive.define('copyrights', {
                // link: function ($scope, element, attributes) {},
                template: '<small>Copyrights &copy; 2015, Abdel Motaal, S., Sigg, F. and Grasppe, Inc.</small>',
            }),

            // !- [Directives] colorSheetsCoreStyles
            CoreStyles: grasppe.Libre.Directive.define('colorSheetsCoreStyles', {
                template: '<style ng-init="\
                    panelHeaderHeight= \'36px\';\
                    mainHeaderHeight=\'48px\'">\
                    @media all {\
                    	/* !- Sheets [Styles] Body */\
                    	:not(input):not(.selectable) {cursor:default;\
                        	-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;\
                        }\
                    	input[type=number] {text-align: right}\
                    	* {outline-style:none;outline-width:0;}\
                    	body {display: flex;}\
                    	\
                    	/* !- Sheets [Styles] Panels */\
                    	md-toolbar.color-sheets-toolbar, md-toolbar.color-sheets-toolbar > * {max-height: {{panelHeaderHeight}}; min-height: {{panelHeaderHeight}};}\
                    	color-sheets-sheet-panel > * {flex: 1; display: flex; flex-direction: column;}\
                    	.color-sheets-panel {flex: 1; display: flex; flex-direction: column; max-height: 100vh;}\
                    	.color-sheets-sheet-panel-contents {flex: 1; background-color: #fff; overflow-y: scroll;}\
                    	.color-sheets-sheet-panel-header md-toolbar.color-sheets-toolbar, .color-sheets-sheet-panel-header md-toolbar.color-sheets-toolbar > *, .color-sheets-sheet-panel-header  md-menu-content > :first-Child > md-button {max-height: {{mainHeaderHeight}}; min-height: {{mainHeaderHeight}};}\
                    	.color-sheets-panel-body {overflow: hidden; max-width: calc(100% - 1em); max-height: calc(100% - 1em); /*border: 1px solid rgba(0,0,0,0.05);*/ min-height: 25vh; margin: 0.5em;}\
                    	\
                    	/* !- Sheets [Styles] Controls */\
                    	.color-sheets-control {margin: 0.25em 0; padding: 0.25em 0; width: 100%;}\
                    	.color-sheets-control > * {padding: 0 0.25em;}\
                    	.color-sheets-control > div:first-Child {margin-left: 0.5em;}\
                    	.color-sheets-control > div:last-Child {margin-right: 0.5em;}\
                    	\
                    	/* !- Sheets [Styles] Tables */\
                    	.color-sheets-table {display: table; width: calc(100%-0.25em); overflow-x: hidden; margin: 0.125em}\
                    	.color-sheets-table-row {display: table-row; width: 100%; overflow-x: hidden}\
                    	.color-sheets-table-cell {display: table-cell; width: 100%; padding: 0.25em;}\
                    	.color-sheets-table-cell:first-Child {text-align: left;}\
                    	.color-sheets-table-cell:last-Child {text-align: right;}\
                    	.color-sheets-table-cell > * {width: 100%}\
                    	.color-sheets-table-section {display: block; width: 100%; overflow-x: hidden}\
                    	.color-sheets-table-section-header {display: block; width: 100%; overflow-x: hidden; text-align: center;}\
                    }\
                    @media screen {\
                    	body {margin:0;padding:0;min-width:100vw;min-height:100vh;}\
                    }\
                    @media print {\
                        md-slider {display: none !important;}\
                        md-button * {opacity: 0.5 !important;}\
                    }\
                </style><color-sheets-styles></color-sheets-styles>',
            }),

        }); // Object.assign (grasppe.ColorSheetsApp.Directives) {}
        // !- [Models]
        if (!grasppe.ColorSheetsApp.Models) grasppe.ColorSheetsApp.Models = {}; // Preservable ColorSheetsApp placeholder
        Object.assign(grasppe.ColorSheetsApp.Models, {
            Sheet: {
                // !- [Models] Sheet
                toolsIconSize: '18px', toolsColor: 'white', menuColor: 'black', menuIcon: 'glyphicon-menu-hamburger', toolsIconClasses: 'tools-icon', layout: {
                    id: 'default', attributes: {
                        'layout': 'column', 'layout-gt-lg': 'row', 'layout-fill': ' ',
                    },
                    classes: 'container-fluid', style: {
                        padding: 0, margin: 0, flex: 1
                    },
                    contents: {
                        simulation: {
                            id: 'simulation', attributes: {
                                'layout': 'row', 'layout-sm': 'column', 'layout-gt-lg': 'row',
                            },
                            classes: 'row col-xs-12', style: {
                                padding: 0, margin: 0, flex: 1
                            },
                            contents: {
                                stage: {
                                    id: 'stage', classes: 'col-xs-12 col-sm-7 col-md-8 col-lg-8', style: {
                                        padding: 0, margin: 0
                                    },
                                },
                                parameters: {
                                    id: 'parameters', classes: 'col-xs-12 col-sm-5 col-md-4 col-lg-4', style: {
                                        padding: 0, margin: 0
                                    },
                                },
                            },
                        },
                        information: {
                            id: 'information', attributes: {
                                'layout-sm': 'column', 'layout-md': 'row',
                            },
                            classes: 'row col-xs-12', style: {
                                padding: 0, margin: 0, flex: 1
                            },
                            contents: {
                                results: {
                                    id: 'results', attributes: {
                                        'flex-order-sm': -1,
                                    },
                                    classes: 'col-xs-12 col-sm-5', style: {
                                        padding: 0, margin: 0
                                    },
                                },
                                overview: {
                                    id: 'overview', attributes: {
                                        'flex-order-sm': 1,
                                    },
                                    classes: 'col-xs-12 col-sm-7', style: {
                                        padding: 0, margin: 0
                                    },
                                },
                            },
                        },
                    }
                }, panels: {
                    sheet: {
                        tools: {
                            refresh: {
                                svgSrc: grasppe.load.url.images + 'refresh.svg', label: 'refresh', classes: 'md-button-flat red black-text', click: 'location.reload()',
                            },
                            documentation: {
                                svgSrc: grasppe.load.url.images + 'book.svg', label: 'documentation', classes: 'md-button-flat orange black-text', click: 'console.log($scope.$app.documentationController.dialog); $scope.$app.documentationController.show();', //'$app.',
                            },
                        },
                        prefix: 'sheet', header: 'ColorSheet', toolbarClasses: 'grey lighten-2 black-text', contents: '', footer: '', // controller: 'SheetPanelController', fontIcon: 'glyphicon-menu-hamburger',
                    },
                    stage: {
                        tools: {
                            redraw: {
                                svgSrc: grasppe.load.url.images + 'magic-wand.svg', label: 'Redraw', classes: 'md-icon-button', click: '$scope.$panel.$broadcast("selected.stage", "redraw", "stage")'
                            },
                        },
                        prefix: 'stage', header: 'Stage', svgSrc: grasppe.load.url.images + 'bar-chart.svg', toolbarClasses: 'grey darken-1', contents: '', footer: '', controller: 'StagePanelController',
                    },
                    parameters: {
                        tools: {
                            reset: {
                                svgSrc: grasppe.load.url.images + 'undo.svg', label: 'reset', classes: 'md-icon-button', click: '$scope.$panel.$broadcast("selected.parameters", "reset", "parameters")',
                            },
                        },
                        prefix: 'parameters', header: 'Parameters', svgSrc: grasppe.load.url.images + 'sliders.svg', toolbarClasses: 'green lighten-1 white-text', contents: '', footer: '', controller: 'ParametersPanelController',
                    },
                    results: {
                        prefix: 'results', header: 'Results', svgSrc: grasppe.load.url.images + 'tasks.svg', toolbarClasses: 'red lighten-1', contents: '', footer: '', tools: undefined, controller: 'ResultsPanelController',
                    },
                    overview: {
                        prefix: 'overview', header: 'Overview', svgSrc: grasppe.load.url.images + 'file-text.svg', toolbarClasses: 'light-blue lighten-1', contents: '', footer: '', tools: undefined, controller: 'OverviewPanelController',
                    },
                } // Sheet.panels
            } // Sheet
        }); // Object.assign (grasppe.ColorSheetsApp.Models) {}
    });
}(this, this.grasppe));