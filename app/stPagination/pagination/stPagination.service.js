angular.module('stPagination').provider('stPagination', function() {
  'use strict';

  var TEMPLATE_CONFIG = {};

  this.setDefaultLimit = function(defaultLimit) {
    Pagination.DEFAULT_LIMIT = defaultLimit;
  };

  this.setDefaultEdgeRange = function(defaultEdgeRange) {
    Pagination.DEFAULT_EDGE_RANGE = defaultEdgeRange;
  };

  this.setDefaultMidRange = function(defaultMidRange) {
    Pagination.DEFAULT_MID_RANGE = defaultMidRange;
  };

  function countConfigAttributes(templateConfig) {
    return (!!templateConfig.config + !!templateConfig.configKey);
  }

  function checkTemplateConfig(templateConfig) {
    if (!templateConfig || !angular.isObject(templateConfig)) {
      throw new Error('Template config value ' + JSON.stringify(templateConfig) + ' is not allowed');
    }
    var attributesCount = countConfigAttributes(templateConfig);
    if (attributesCount > 1) {
      throw new Error('Conflicting config attributes: Use only of of: config, configKey');
    }
    if (attributesCount === 0) {
      throw new Error('Missing config attribute for ' + JSON.stringify(templateConfig) + '. ' +
        'Expected one of: config, configKey');
    }
  }

  this.setTemplateConfig = function(templateConfig) {
    checkTemplateConfig(templateConfig);
    TEMPLATE_CONFIG = templateConfig;
  };

  this.$get = function() {
    return {
      hasPagination: function(collection) {
        return collection && collection.pagination instanceof Pagination;
      },
      Pagination: Pagination,
      range: RangeBuilder.range,
      indexRangeBuilder: function(length) {
        return new RangeBuilder(length);
      },
      templateConfig: function() {
        return TEMPLATE_CONFIG;
      }
    };
  };
});
