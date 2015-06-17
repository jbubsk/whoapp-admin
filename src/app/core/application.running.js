'use strict';

import template from './layout/navbar/navbar.html!text';

//function authenticationRouting(event, toState) {
function authenticationRouting() {
    /*jshint validthis:true */
    //var AuthService = this.$injector.get('AuthService');
    //var $state = this.$injector.get('$state');

    //if (toState.auth && !AuthService.isAuthenticated()) {
    //    event.preventDefault();
    //    $state.go('login');
    //} else if (!toState.auth && AuthService.isAuthenticated()) {
    //    event.preventDefault();
    //    $state.go('home');
    //}
}

function applicationRun(Session, $templateCache, $rootScope, $injector) {

    Session.initialize();
    $templateCache.put('app/core/layout/navbar/navbar.html', template);
    $rootScope.$on('$stateChangeStart', authenticationRouting.bind({
        $injector: $injector
    }));
}
applicationRun.$inject = ['Session', '$templateCache', '$rootScope', '$injector'];

export default applicationRun;