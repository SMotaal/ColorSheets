grasppe = eval("(function (w) {'use strict'; if (typeof w.grasppe !== 'function') w.grasppe = class grasppe{constructor(){}};}(this)); grasppe");

(function (window, grasppe, undefined) {
	'use strict';
	
	if (!grasppe.ColorSheetsApp) grasppe.ColorSheetsApp = {}; // Preservable ColorSheetsApp placeholder
	
	grasppe.require('initialize', function () {
		
		if (!grasppe.ColorSheetsApp.Directives) grasppe.ColorSheetsApp.Directives = {}; // Preservable ColorSheetsApp placeholder
		
		if (!grasppe.ngMaterial) grasppe.ngMaterial = {}; // Preservable ColorSheetsApp placeholder
		Object.assign(grasppe.ngMaterial, {
            debounce: function debounce(func, wait, context) {
                var timer;
                // Supplies a function that will continue to operate until the time is up.
                return function debounced() {
                    var args = Array.prototype.slice.call(arguments); // context = $scope,
                    window.clearTimeout(timer);
                    timer = window.setTimeout(function () {
                        timer = undefined, func.apply(context, args);
                    }, wait || 10);
                };
            },
            
            buildDelayedSidenavToggler: function buildDelayedSidenavToggler($mdSidenav, navID, wait) {
                // Supplies handler to open/close a SideNav after a delay
                return grasppe.ngMaterial.debounce(function () {
                    $mdSidenav(navID).toggle();
                }, wait || 200);
            },

            buildSidenavToggler: function buildSidenavToggler($mdSidenav, navID) {
                // Supplies handler to open/close a SideNav
                return function () {
                    $mdSidenav(navID).toggle();
                }
            },

        });
        
        // console.log(grasppe.ngMaterial);
		
		Object.assign(grasppe.ColorSheetsApp.Directives, {

			// !- colorSheetsComponents [Directives] colorSheetsSliderControl
			SliderControl: grasppe.Libre.Directive.define('colorSheetsSliderControl', function () {
				return {
					link: function colorSheetsSliderControlLink($scope, element, attributes, controller, transcludeFunction) {
						var initial = Number(grasppe.getURLParameters()[attributes.model] || attributes.value);
						for (var attribute in attributes.$attr) element.attr(attribute, attributes[attribute]);
						$scope.control = {
							id: attributes.id, model: (attributes.model),
							label: attributes.label, description: attributes.description, suffix: attributes.suffix, minimum: Number(attributes.minimum),
							maximum: Number(attributes.maximum),
							step: Number(attributes.step),
							value: initial || Number(localStorage.getItem($scope.sheet.id + '-' + attributes.model)) || Number(attributes.value),
							initial: initial, tooltip: attributes.tooltip,
						};
						$scope.$watch('parameters.' + $scope.control.model, function(current, last, $scope) {
							if (current !== $scope.control.value && current !== undefined) {
								$scope.control.value = current;
								localStorage.setItem($scope.sheet.id + '-' + $scope.control.model, current);
							}
						});
						$scope.control.size = String($scope.control.maximum || $scope.control.value).length;
						element.find('md-slider, input').attr('ng-model', 'parameters.' + $scope.control.model);
						element.find('input').attr('size', $scope.control.size).css('min-width', ($scope.control.size) + 'em');
					},
					controller: ['$scope', '$element', function ($scope, element) {
						$scope.$watch('control.value', function (current, last, $scope) {
							if (current !== $scope.parameters[$scope.control.model] && current !== undefined) {
								$scope.parameters[$scope.control.model] = current;
								localStorage.setItem($scope.sheet.id + '-' + $scope.control.model, current);
							}
						});
						$scope.$on('selected.parameters', function (event, action, context) {
							switch (action) {
							case 'reset': if (context === "parameters" || context === $scope.control.model) $scope.control.value = $scope.control.initial, $scope.$apply();
								break;
							}
						})
					}],
					template: '\
                        <md-input-container class="color-sheets-control" layout flex="100">\
                            <div flex="25" layout layout-align="center center">\
                                <span style="text-overflow: ellipsis; overflow:hidden; min-width: 7em; max-width: 100%">{{control.label}}</span>\
                            </div>\
                            <md-slider flex min="{{control.minimum}}" max="{{control.maximum}}" aria-label="{{control.description}}" id="{{control.id}}" class ng-model="control.value"></md-slider>\
                            <div flex="35" layout layout-align="center center">\
                                <input flex type="number" min="{{control.minimum}}" max="{{control.maximum}}" step="{{control.step}}" aria-label="{{control.description}}" aria-controls="{{control.id}}" ng-model="control.value">\
                                <span class="control-suffix" style="text-overflow: ellipsis; overflow:hidden; min-width: 3em;">{{control.suffix}}</span>\
                            </div>\
                            <md-tooltip md-delay="1000" md-direction="top" ng-if="control.tooltip===\'@\'">\
                                <ng-transclude></ng-transclude></md-tooltip>\
                            <md-tooltip md-delay="1000" md-direction="top" ng-if="control.tooltip && control.tooltip!==\'@\'"><span ng-bind-html="control.tooltip"></span></md-tooltip>\
                        </md-input-container>', scope: true, transclude: true,

				};
			}),
			// !- colorSheetsComponents [Directives] colorSheetsSelectControl
			SelectControl: grasppe.Libre.Directive.define('colorSheetsSelectControl', function () {
				return {
					link: function colorSheetsSelectControlLink($scope, element, attributes, controller, transcludeFunction) {
						var initial = Number(grasppe.getURLParameters()[attributes.model] || attributes.value);
						for (var attribute in attributes.$attr) element.attr(attribute, attributes[attribute]);
						$scope.control = {
							id: attributes.id, model: (attributes.model),
							label: attributes.label, description: attributes.description, suffix: attributes.suffix, 
							value: initial || localStorage.getItem($scope.sheet.id + '-' + attributes.model),
							initial: initial, tooltip: attributes.tooltip, options: JSON.parse(attributes.options),
						};
						$scope.$watch('parameters.' + $scope.control.model, function(current, last, $scope) {
							if (current !== $scope.control.value && current !== undefined) {
								$scope.control.value = current;
								localStorage.setItem($scope.sheet.id + '-' + $scope.control.model, current);
							}
						});
						// $scope.control.size = String($scope.control.maximum || $scope.control.value).length;
						// element.find('md-select, input').attr('ng-model', 'parameters.' + $scope.control.model);
						// element.find('input').attr('size', $scope.control.size).css('min-width', ($scope.control.size) + 'em');
					},
					controller: ['$scope', '$element', '$transclude', function ($scope, element, transcludeFunction) {
    					transcludeFunction($scope, element.append.bind(element.find('md-select')), element.find('md-select'));
    					//console.log('ColorSheetsSelectControl::controller', transclude);
						$scope.$watch('control.value', function (current, last, $scope) {
							if (current !== $scope.parameters[$scope.control.model] && current !== undefined) {
								$scope.parameters[$scope.control.model] = current;
								localStorage.setItem($scope.sheet.id + '-' + $scope.control.model, current);
							}
						});
        				
						$scope.$on('selected.parameters', function (event, action, context) {
							switch (action) {
							case 'reset': if (context === "parameters" || context === $scope.control.model) $scope.control.value = $scope.control.initial, $scope.$apply();
								break;
							}
						})
					}],
					template: '\
                        <div class="color-sheets-control" layout flex="100">\
                            <div flex="25" layout layout-align="center center">\
                                <span style="text-overflow: ellipsis; overflow:hidden; min-width: 7em; max-width: 100%">{{control.label}}</span>\
                            </div>\
                            <md-select flex aria-label="{{control.description}}" id="{{control.id}}" class ng-model="control.value">\
                                <md-option ng-value="key" ng-repeat="(key, title) in control.options">{{title}}</md-option>\
                            </md-select>\
                            <div flex="15" layout layout-align="center center">\
                                <!--input flex type="number" min="{{control.minimum}}" max="{{control.maximum}}" step="{{control.step}}" aria-label="{{control.description}}" aria-controls="{{control.id}}" ng-model="control.value"-->\
                                <span class="control-suffix" style="text-overflow: ellipsis; overflow:hidden; min-width: 3em;">{{control.suffix}}</span>\
                            </div>\
                            <md-tooltip md-delay="1000" md-direction="top" ng-if="control.tooltip===\'@\'">\
                                <ng-transclude></ng-transclude></md-tooltip>\
                            <md-tooltip md-delay="1000" md-direction="top" ng-if="control.tooltip && control.tooltip!==\'@\'"><span ng-bind-html="control.tooltip"></span></md-tooltip>\
                        </div>', scope: true, transclude: true,

				};
			}),
			// !- colorSheetsComponents [Directives] colorSheetsToggleControl
			ToggleControl: grasppe.Libre.Directive.define('colorSheetsToggleControl', function () {
				return {
					link: function colorSheetsToggleControl($scope, element, attributes, controller, transcludeFunction) {
						var initial = Number(grasppe.getURLParameters()[attributes.model] || attributes.value);
						for (var attribute in attributes.$attr) element.attr(attribute, attributes[attribute]);
						$scope.control = {
							id: attributes.id, model: (attributes.model),
							label: attributes.label, description: attributes.description, suffix: attributes.suffix, 
							value: initial || Boolean(localStorage.getItem($scope.sheet.id + '-' + attributes.model)) || Boolean(attributes.value),
							size: Number(attributes.size),
							initial: initial, tooltip: attributes.tooltip,
						};
						$scope.$watch('parameters.' + $scope.control.model, function(current, last, $scope) {
							if (current !== $scope.control.value && current !== undefined) {
								$scope.control.value = current;
								localStorage.setItem($scope.sheet.id + '-' + $scope.control.model, current);
							}
						});
						$scope.control.size = String($scope.control.maximum || $scope.control.value).length;
						element.find('md-switch, input').attr('ng-model', 'parameters.' + $scope.control.model);
						element.find('input').css('min-width', ($scope.control.size) + 'em');
					},
					controller: ['$scope', '$element', function ($scope, element) {
						$scope.$watch('control.value', function (current, last, $scope) {
							if (current !== $scope.parameters[$scope.control.model] && current !== undefined) {
								$scope.parameters[$scope.control.model] = current;
								localStorage.setItem($scope.sheet.id + '-' + $scope.control.model, current);
							}
						});
						$scope.$on('selected.parameters', function (event, action, context) {
							switch (action) {
							case 'reset': if (context === "parameters" || context === $scope.control.model) $scope.control.value = $scope.control.initial, $scope.$apply();
								break;
							}
						})
					}],
					template: '\
                        <div class="color-sheets-control" layout flex="45">\
                            <div flex="55" layout layout-align="center center">\
                                <span style="text-overflow: ellipsis; overflow:hidden; min-width: 7em; max-width: 100%">{{control.label}}</span>\
                            </div>\
                            <div flex="45" layout layout-align="left center">\
                                <md-switch flex aria-label="{{control.description}}" id="{{control.id}}" class ng-model="control.value"></md-switch>\
                            </div>\
                            <md-tooltip md-delay="1000" md-direction="top" ng-if="control.tooltip===\'@\'">\
                                <ng-transclude></ng-transclude></md-tooltip>\
                            <md-tooltip md-delay="1000" md-direction="top" ng-if="control.tooltip && control.tooltip!==\'@\'">\
                                {{tooltip}}</md-tooltip>\
                        </div>', scope: true, transclude: true,

				};
			}),
			// !- colorSheetsComponents [Directives] colorSheetsImageControl
			ImageControl: grasppe.Libre.Directive.define('colorSheetsImageControl', function () {
				return {
					link: function colorSheetsImageControlLink($scope, element, attributes) {
    					for (var attribute in attributes.$attr) element.attr(attribute, attributes[attribute]);
					},
					controller: ['$scope', '$element', '$mdToast', '$mdDialog', function ($scope, element, $mdToast, $mdDialog) {
						var toast = function colorSheetsImageControlToast(message) {
								$mdToast.show($mdToast.simple().content(message))
							},
							error = function colorSheetsImageControlError(message) {
								$mdDialog.show($mdDialog.alert().openFrom(element).closeTo(element).clickOutsideToClose(true).title('Image not saved...').content(message).ariaLabel('Image not saved...').ok('OK'));
							},
							controller = this;
        				this.loadImageFromFile = function loadImageFromFile(file) {
							Object.assign(new FileReader(), {
								onload: function colorSheetsImageControlFileReaderOnload(event) {
									if (event.target.result.match(/^data:image\/(png|jpeg|gif|svg)/i)) {
										$scope.control.value = event.target.result;
										$scope.control.suffix = event.target.result.match(/^data:image\/(png|jpeg|gif|svg)/i)[1];
										$scope.$apply();
									} else error('Only png, gif, jpeg, and svg images can be used!');
								},
							}).readAsDataURL(file);
                        };
						element.find('.image-preview').bind('drop', function (event) {
							if (event.originalEvent.dataTransfer.files.length == 1) {
                                // Object.assign(new FileReader(), {
                                // 	onload: function colorSheetsImageControlFileReaderOnload(event) {
                                // 		if (event.target.result.match(/^data:image\/(png|jpeg|gif|svg)/i)) {
                                // 			$scope.control.value = event.target.result;
                                // 			$scope.control.suffix = event.target.result.match(/^data:image\/(png|jpeg|gif|svg)/i)[1];
                                // 			$scope.$apply();
                                // 		} else error('Only png, gif, jpeg, and svg images can be used!');
                                // 	},
                                // }).readAsDataURL(event.originalEvent.dataTransfer.files[0]);
                                controller.loadImageFromFile(event.originalEvent.dataTransfer.files[0]);
							} else {
								$scope.control.value = Object.assign(new Image, {
									src: event.originalEvent.dataTransfer.getData('URL'),
									crossOrigin: 'Anonymous',
								}).src;
							}
						}).bind('dragenter', function (event) {
							$(this).css('background-color', 'rgba(255, 0, 0, 0.5)');
						}).bind('dragleave drop', function (event) {
							$(this).css('background-color', 'transparent');
						});

						$scope.$watch('control.value', function (current, last, $scope) {
							if (current !== $scope.parameters[$scope.control.model] && current !== undefined) $scope.parameters[$scope.control.model] = current;
							if (current && localStorage.getItem($scope.sheet.id + '-' + $scope.control.model) !== current) try {
								localStorage.setItem($scope.sheet.id + '-' + $scope.control.model, current);
								toast('Image saved!');
							} catch (err) {
								error('The file will not be saved!');
							}
							$scope.control.text = (current !== undefined) ? '' : 'Drop Image Here!';
						});
					}],
					link: function preLink($scope, element, attributes, controller) {
						$scope.control = {
							id: attributes.id, label: attributes.label, description: attributes.description, suffix: attributes.suffix, value: $scope.parameters[attributes.model] || localStorage.getItem($scope.sheet.id + '-' + attributes.model) || '', model: attributes.model, text: '',
						}
						element.find('input').attr('ng-model', 'parameters.' + $scope.control.model);
						element.find('.image-select').bind('change', {
    						$scope: $scope, $control: $scope.control, $element: element,
        				}, function onImageSelectChange(event, data) {
            				console.log('Image-Select Change', event, data, this);
            				if (event.target.files.length) controller.loadImageFromFile(event.target.files[0]);
    						// data.$scope[data.$control.model] = this.value;
        				});
        				element.find('.control-image, .image-select-button').bind('click', { 
    						$scope: $scope, $control: $scope.control, $element: element,
                        }, function onImageSelectClick(event, data) {
            				// console.log($(this).closest('.image-select'));
                            element.find('.image-select').click();
                        });
					},
                    template: '\
                        <div class="color-sheets-control" layout flex="100">\
                            <div flex="25" layout layout-align="center center">\
                                <span style="text-overflow: ellipsis; overflow:hidden; min-width: 7em; max-width: 100%">{{control.label}}</span>\
                            </div>\
                            <div class="control-image image-preview md-button" flex style="height: 6em; background-position: center center; background-size: contain; background-repeat: no-repeat;" ng-style="{\'background-image\': \'url(\' + control.value + \')\'}", layout layout-align="center center">{{control.text}}</div>\
                            <div flex="35" layout="column" layout-align="center center">\
                                <input style="display: none;"class="image-select" type="file" accept="image/*"/>\
                                <md-button class="image-select-button">Choose</md-button>\
                                <span class="control-suffix" style="text-overflow: ellipsis; overflow:hidden; min-width: 3em;">{{control.suffix}}</span>\
                            </div>\
                            <md-tooltip md-delay="1000" md-direction="top" ng-if="control.tooltip===\'@\'">\
                                <ng-transclude></ng-transclude></md-tooltip>\
                            <md-tooltip md-delay="1000" md-direction="top" ng-if="control.tooltip && control.tooltip!==\'@\'">\
                                {{tooltip}}</md-tooltip>\
                        </div>', scope: true, transclude: true,

                    // template: '\
                    //     <div class="color-sheets-control" layout>\
                    //         <div class="control-label md-body-1" flex="30" layout layout-align="center center">{{control.label}}</div>\
                    //         <div class="control-image image-preview md-button" flex style="height: 6em; background-position: center center; background-size: contain; background-repeat: no-repeat;" ng-style="{\'background-image\': \'url(\' + control.value + \')\'}", layout layout-align="center center">{{control.text}}</div>\
                    //         <div class="control-suffix md-body-1" flex="25" layout layout-align="center center"><input type="file" accept="image/*"/>{{control.suffix}}</div>\
                    //     </div>', scope: true,
				};
			}),

		}); // Object.assign (grasppe.ColorSheetsApp.Directives) {}

	});
}(this, this.grasppe));