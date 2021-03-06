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

import stateConfig from './namespacelist_stateconfig';
import filtersModule from 'common/filters/filters_module';
import componentsModule from 'common/components/components_module';
import {namespaceCardComponent} from './namespacecard_component';
import {namespaceCardListComponent} from './namespacecardlist_component';
import namespaceDetailModule from 'namespacedetail/namespacedetail_module';
import paginationModule from 'common/pagination/pagination_module';

/**
 * Angular module for the Namespace list view.
 *
 * The view shows Namespace running in the cluster and allows to manage them.
 */
export default angular
    .module(
        'kubernetesDashboard.namespaceList',
        [
          'ngMaterial',
          'ngResource',
          'ui.router',
          filtersModule.name,
          componentsModule.name,
          namespaceDetailModule.name,
          paginationModule.name,
        ])
    .config(stateConfig)
    .component('kdNamespaceCardList', namespaceCardListComponent)
    .component('kdNamespaceCard', namespaceCardComponent)
    .factory('kdNamespaceListResource', namespaceListResource);

/**
 * @param {!angular.$resource} $resource
 * @return {!angular.Resource}
 * @ngInject
 */
function namespaceListResource($resource) {
  return $resource('api/v1/namespace');
}
