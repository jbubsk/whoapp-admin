'use strict';

import RouterModule from '../app/router/router.module';
import LayoutModule from '../app/layout/layout.module';
import NavbarModule from '../app/components/navbar/navbar.module';
import LoginModule from '../app/components/login/login.module';
import HomeModule from '../app/components/home/home.module';
import PlacesModule from '../app/components/places/places.module';
import InterestsModule from '../app/components/interests/interests.module';

import ServicesModule from '../app/common/services/services.module';
import DirectivesModule from '../app/common/directives/directive.module';

import Interceptors from '../app/common/interceptors';

function RunApp($injector) {
    $injector.get('Session').initialize();
}
RunApp.$inject = ['$injector'];

angular.module('whoappAdmin', [
    'ngCookies',
    'ngResource',
    'mm.foundation',

    RouterModule,
    LayoutModule,
    NavbarModule,
    LoginModule,
    HomeModule,
    PlacesModule,
    InterestsModule,

    ServicesModule,
    DirectivesModule
])
    .config(Interceptors)
    .run(RunApp);