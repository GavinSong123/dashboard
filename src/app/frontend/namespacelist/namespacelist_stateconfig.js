// Copyright 2015 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {actionbarViewName, stateName as chromeStateName} from 'chrome/chrome_state';
import {breadcrumbsConfig} from 'common/components/breadcrumbs/breadcrumbs_service';
import {stateName as workloadsState} from 'workloads/workloads_state';

import {NamespaceListController} from './namespacelist_controller';
import {stateName, stateUrl} from './namespacelist_state';

/**
 * Configures states for the service view.
 *
 * @param {!ui.router.$stateProvider} $stateProvider
 * @ngInject
 */
export default function stateConfig($stateProvider) {
  $stateProvider.state(stateName, {
    url: stateUrl,
    parent: chromeStateName,
    resolve: {
      'namespaceList': resolveNamespaceList,
    },
    data: {
      [breadcrumbsConfig]: {
        'label': i18n.MSG_BREADCRUMBS_NAMESPACES_LABEL,
        'parent': workloadsState,
      },
    },
    views: {
      '': {
        controller: NamespaceListController,
        controllerAs: '$ctrl',
        templateUrl: 'namespacelist/namespacelist.html',
      },
      [actionbarViewName]: {},
    },
  });
}

/**
 * @param {!angular.$resource} $resource
 * @return {!angular.$q.Promise}
 * @ngInject
 */
export function resolveNamespaceList($resource) {
  /** @type {!angular.Resource<!backendApi.NamespaceList>} */
  let resource = $resource(`api/v1/namespace`);
  return resource.get().$promise;
}

const i18n = {
  /** @type {string} @desc Label 'Namespaces' that appears as a breadcrumbs on the action bar. */
  MSG_BREADCRUMBS_NAMESPACES_LABEL: goog.getMsg('Namespaces'),
};
