
angular.module('reservations')

    .factory('UserService', ['$http', function($http) {
        var service = {
            isLoggedIn: false,

            session: function() {
                return $http.get('/api/session').then(function(response) {
                    service.isLoggedIn = true;
                    return response;
                    
                });
            },

            login: function(user) {
                return $http.post('/api/login', user)
                    .then(function(response) {
                        service.isLoggedIn = true;
                        return response;
                    });
            }
        };
        return service;
    }]);



appp.service("set", function(){
   this.classSet=function(className){
     $(document).ready(function(){
         $("li a").each(function(index) {
            if($(this).attr('title')==className){
            $(this).addClass("booked");
           } 
         });
     });
   };
   
 });

appp.factory("get", function(){
  var fact={};
  fact.getNumber=function(number){
  return  new Array(number); 
  };/*return array for ng-repeat*/
  fact.getletter=function(row, index){
    var val=row.charCodeAt(0);
    val=val-index;
    val=String.fromCharCode(val);
  return val; 
  };/* dynamic char for ng-repeat*/
  fact._howMany=function(selectedClass, noofticket){
    
    $(".seats ul li a").each(function(index) {
             if($(this).hasClass("success")){
                if(selectedClass<noofticket)
                selectedClass++;
                    }
            });
        return selectedClass;   
  }
  return fact;
});