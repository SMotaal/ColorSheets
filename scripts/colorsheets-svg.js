grasppe = eval("(function (w) {'use strict'; if (typeof w.grasppe !== 'function') w.grasppe = class grasppe{constructor(){}};}(this)); grasppe");

(function (window, grasppe, undefined) {
    'use strict';

    if (!grasppe.ColorSheetsApp) grasppe.ColorSheetsApp = {}; // Preservable ColorSheetsApp placeholder
    grasppe.require('initialize', function () {

        // !- [Directives]
        if (!grasppe.ColorSheetsApp.Directives) grasppe.ColorSheetsApp.Directives = {}; // Preservable ColorSheetsApp placeholder
        Object.assign(grasppe.ColorSheetsApp.Directives, {
            // !- [Directives] Sheet
            grasppeSvg: grasppe.Libre.Directive.define('grasppeSvg', {
                link: function grasppeSvgLink($scope, element, attributes) {
                    // for (var attribute in attributes.$attr) element.attr(attribute, attributes[attribute]);
                },
                controller: ['$scope', '$element', '$transclude', function grasppeSvgController($scope, element, transcludeFunction) {
    				transcludeFunction($scope, element.append.bind(element.find('svg')), element.find('svg'));
                }],
                template: ('<object><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"></svg></object>'), transclude: true, replace: true, // <ng-transclude></ng-transclude>\
            }),
            
            // // !- [Directives] SheetSegment
            // SheetSegment: grasppe.Libre.Directive.define('colorSheetsSheetSegment', {
            //     link: function colorSheetsSheetSegmentLink($scope, element, attributes) {
            //         if ($scope.segment.attributes) $(element).attr($scope.segment.attributes);
            //     },
            //     template: ('<div ng-repeat="section in segment.contents" {{section.attributes}} class="ng-class: section.classes;" ng-init="panel = panels[section.id]" ng-style="section.style;" color-sheets-panel="{{panel}}">{{panel}}</div>'),
            // }),
            // 
            // // !- [Directives] CopyrightsDirective
            // Copyrights: grasppe.Libre.Directive.define('copyrights', {
            //     // link: function ($scope, element, attributes) {},
            //     template: '<small>Copyrights &copy; 2015, Abdel Motaal, S., Sigg, F. and Grasppe, Inc.</small>',
            // }),
            // 
            // // !- [Directives] colorSheetsCoreStyles
            // CoreStyles: grasppe.Libre.Directive.define('colorSheetsCoreStyles', {
            //     template: '<style ng-init="\
            //         panelHeaderHeight= \'36px\';\
            //         mainHeaderHeight=\'48px\'">\
            //         @media all {\
            //         	/* !- Sheets [Styles] Body */\
            //         	:not(input):not(.selectable) {cursor:default;\
            //             	-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;\
            //             }\
            //         	input[type=number] {text-align: right}\
            //         	* {outline-style:none;outline-width:0;}\
            //         	body {display: flex;}\
            //         	\
            //         	/* !- Sheets [Styles] Panels */\
            //         	md-toolbar.color-sheets-toolbar, md-toolbar.color-sheets-toolbar > * {max-height: {{panelHeaderHeight}}; min-height: {{panelHeaderHeight}};}\
            //         	color-sheets-sheet-panel > * {flex: 1; display: flex; flex-direction: column;}\
            //         	.color-sheets-panel {flex: 1; display: flex; flex-direction: column; min-height: 40vh; /* max-height: 100vh; */}\
            //         	.color-sheets-panel-contents {flex: 1; display: flex; flex-direction: column;}\
            //         	.color-sheets-sheet-panel-contents {flex: 1; background-color: #fff; /*overflow-y: scroll;*/}\
            //         	.color-sheets-sheet-panel-header md-toolbar.color-sheets-toolbar, .color-sheets-sheet-panel-header md-toolbar.color-sheets-toolbar > *, .color-sheets-sheet-panel-header  md-menu-content > :first-Child > md-button {max-height: {{mainHeaderHeight}}; min-height: {{mainHeaderHeight}};}\
            //         	.color-sheets-panel-body {overflow: hidden; max-width: calc(100% - 1em); min-height: 25vh; margin: 0.5em;}\
            //         	.color-sheets-panel-body * {text-shadow:0 1px 2px rgba(0,0,0,0.15),0 1px 0 rgba(255,255,255,1);}\
            //         	.color-sheets-sheet-panel-header {text-shadow:0 1px 4px rgba(0,0,0,0.25);}\
            //         	/* !- Sheets [Styles] Controls */\
            //         	.color-sheets-control {margin: 0.25em 0; padding: 0.25em 0; width: 100%;}\
            //         	.color-sheets-control > * {padding: 0 0.25em;}\
            //         	.color-sheets-control > div:first-Child {margin-left: 0.5em;}\
            //         	.color-sheets-control > div:last-Child {margin-right: 0.5em;}\
            //         	\
            //         	/* !- Sheets [Styles] Tables */\
            //         	.color-sheets-table {display: table; width: calc(100%-0.25em); overflow-x: hidden; margin: 0.125em}\
            //         	.color-sheets-table-row {display: table-row; width: 100%; overflow-x: hidden}\
            //         	.color-sheets-table-cell {display: table-cell; width: 100%; padding: 0.25em;}\
            //         	.color-sheets-table-cell:first-Child {text-align: left;}\
            //         	.color-sheets-table-cell:last-Child {text-align: right;}\
            //         	.color-sheets-table-cell > * {width: 100%}\
            //         	.color-sheets-table-section {display: block; width: 100%; overflow-x: hidden}\
            //         	.color-sheets-table-section-header {display: block; width: 100%; overflow-x: hidden; text-align: center;}\
            //         }\
            //         @media screen {\
            //         	body {margin:0;padding:0;min-width:100vw;min-height:100vh;}\
            //         }\
            //         @media print {\
            //             md-slider {display: none !important;}\
            //             md-button * {opacity: 0.5 !important;}\
            //             .color-sheets-panel { width: 100%}\
            //         }\
            //     </style><color-sheets-styles></color-sheets-styles>',
            // }),

        }); // Object.assign (grasppe.ColorSheetsApp.Directives) {}
    });
}(this, this.grasppe));