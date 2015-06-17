'use strict';

import applicationConfig from './application.config';
import applicationRun from './application.running';

export default angular.module('app.core', [])
    .config(applicationConfig)
    .run(applicationRun);
