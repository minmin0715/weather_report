//'use strict';

app.factory('getWeather',['$http',
    function($http){
        var baseUrl='https://api.weathersource.com/v1/d2ef41fbe9a5f7a3a851/history_by_postal_code.json?_callback=JSON_CALLBACK&period=day&country_eq=US&fields=postal_code,country,timestamp,tempAvg,precip,windSpdAvg,relHumAvg',
            timestamp_between,
            postal_code_eq;

        return {
            getWeather:function(time,postal){
                timestamp_between=time;
                postal_code_eq=postal;
                var promise = $http({
                    method: 'JSONP',
                    url: baseUrl + '&' + 'timestamp_between='+timestamp_between + '&' + 'postal_code_eq='+postal_code_eq
                });
                return promise;
            }
        }

    }
])