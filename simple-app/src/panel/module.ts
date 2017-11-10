/// <reference path="headers.d.ts" />

import { MetricsPanelCtrl } from 'app/plugins/sdk';

export class PanelCtrl extends MetricsPanelCtrl {

	static template = `<iframe ng-src="{{ trustSrc(url) }}"
						style="width: 100%; height: 400px; border: 0;" />`;

	fallbackURL = 'https://www.youtube.com/embed/1B_7JxGsK7Y';

	constructor($scope, $injector, templateSrv, $sce, $http) {
		super($scope, $injector);
		$scope.trustSrc = (src) => $sce.trustAsResourceUrl(src);

		const setUrl = () => { // translates Grafana's variables into iframe's URL;
			const val = templateSrv.variables[0].current.value;
			$scope.url = val.startsWith('http') ? val : this.fallbackURL;
		};
		$scope.$root.onAppEvent('template-variable-value-updated', setUrl);
		setUrl();
	}

	link($scope, elem, attrs) {
		const frame = elem.find('iframe');
		const panel = elem.find('div.panel-container');
		frame[0].onload = (event) => {
			frame.contents().bind('DOMSubtreeModified', () => {
				const h = frame.contents().find('body').height();
				frame.height(h + 100 + 'px');
				panel.height(h + 150 + 'px');
			});
		}
	}
}
