/// <reference path="headers.d.ts" />
System.register(["app/plugins/sdk"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var sdk_1, PanelCtrl;
    return {
        setters: [
            function (sdk_1_1) {
                sdk_1 = sdk_1_1;
            }
        ],
        execute: function () {/// <reference path="headers.d.ts" />
            PanelCtrl = /** @class */ (function (_super) {
                __extends(PanelCtrl, _super);
                function PanelCtrl($scope, $injector, templateSrv, $sce, $http) {
                    var _this = _super.call(this, $scope, $injector) || this;
                    _this.fallbackURL = 'https://www.youtube.com/embed/1B_7JxGsK7Y';
                    $scope.trustSrc = function (src) { return $sce.trustAsResourceUrl(src); };
                    var setUrl = function () {
                        var val = templateSrv.variables[0].current.value;
                        $scope.url = val.startsWith('http') ? val : _this.fallbackURL;
                    };
                    $scope.$root.onAppEvent('template-variable-value-updated', setUrl);
                    setUrl();
                    return _this;
                }
                PanelCtrl.prototype.link = function ($scope, elem, attrs) {
                    var frame = elem.find('iframe');
                    var panel = elem.find('div.panel-container');
                    frame[0].onload = function (event) {
                        frame.contents().bind('DOMSubtreeModified', function () {
                            var h = frame.contents().find('body').height();
                            frame.height(h + 100 + 'px');
                            panel.height(h + 150 + 'px');
                        });
                    };
                };
                PanelCtrl.template = "<iframe ng-src=\"{{ trustSrc(url) }}\"\n\t\t\t\t\t\tstyle=\"width: 100%; height: 400px; border: 0;\" />";
                return PanelCtrl;
            }(sdk_1.MetricsPanelCtrl));
            exports_1("PanelCtrl", PanelCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map