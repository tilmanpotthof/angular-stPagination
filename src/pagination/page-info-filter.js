'use strict';

angular.module('stPagination').filter('pageInfo', function (Pagination) {

  var propertyNameToFunctionMapping = {
    totalPages: "totalPages",
    currentPage: "displayPage",
    startIndex: "displayStart",
    stopIndex: "stop",
    total: "length"
  };

  return function (inputCollection, propertyName) {
    if (Pagination.hasPagination(inputCollection) && propertyName) {
      var fnName = propertyNameToFunctionMapping[propertyName];
      if (!fnName) {
        throw new Error("No display property '" + propertyName +"' defined for the pageInfo filter");
      }
      return inputCollection.pagination[fnName]();
    } else {
      return inputCollection;
    }
  };
});
