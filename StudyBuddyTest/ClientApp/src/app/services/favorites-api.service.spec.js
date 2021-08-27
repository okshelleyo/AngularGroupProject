"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var favorites_api_service_1 = require("./favorites-api.service");
describe('FavoritesApiService', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = testing_1.TestBed.get(favorites_api_service_1.FavoritesApiService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=favorites-api.service.spec.js.map