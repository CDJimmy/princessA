'use strict';

/**
 * pays service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pays.pays');
