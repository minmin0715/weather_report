var app = angular.module('myApp',[]);

app.controller('weatherCtrl', ['$rootScope', '$scope','$filter', 'getWeather',
    function($rootScope, $scope, $filter, getWeather){
        var postal;
        var date = new Date();
        var date1 = date.getFullYear()+"-"+paddNum(date.getMonth()+1)+"-"+paddNum(date.getDate());
        console.log(date1);
        var t1 = getPreviousFiveDay(date1);
        console.log(t1);
        var t2= getPreviousFiveDay(t1);
        var t3= getPreviousFiveDay(t2);
        var t4= getPreviousFiveDay(t3);
        var time1= t1+","+date1;
        var time2= t2+","+t1;
        var time3= t3+","+t2;
        var time4= t4+","+t3;
        var data1,data2,data3,data4;
        
        $rootScope.getData = function() {
            var arr = [];
            postal = $scope.zipcode;
            getWeather.getWeather(time4,postal).success(function(data){
                arr = arr.concat(data);
                getWeather.getWeather(time3,postal).success(function(data){
                    arr = arr.concat(data);
                    getWeather.getWeather(time2,postal).success(function(data){
                        arr = arr.concat(data);
                        getWeather.getWeather(time1,postal).success(function(data){
                            arr = arr.concat(data);
                            $rootScope.weatherData=arr;
                        });                
                    });        
                });
                
            });
        };
        function getPreviousFiveDay(d){
            var d = new Date(d);
            d = +d- 4000*60*60*24;
            d = new Date(d);
            return d.getFullYear()+"-"+paddNum(d.getMonth()+1)+"-"+paddNum(d.getDate());
        }
        function paddNum(num){
          num += "";
          return num.replace(/^(\d)$/,"0$1");
        }

        var orderBy = $filter('orderBy');
        $rootScope.order = function(prediate, reverse) {
            $rootScope.weatherData = orderBy($rootScope.weatherData, prediate, reverse);                
        };

}]);