
appp.controller('SearchCtrl', function($scope, $modal, $location, reservationFactory) {
  $scope.search = function() {
    var modalInstance = $modal.open({
      templateUrl:'display_res_model',
      controller: DisplayCtrl,
      resolve: {
        reservation: function() {
          return reservationFactory.searchRes($scope.confirmNo);
        }
      }
    });
  };
})

appp.controller("assignmentController", function( $scope, get, set){
 $scope.count=6;
 $scope.countrow=7;
 $scope.countfour=4;
 $scope.countseat=0;
 $scope.rowcount=0;
 $scope.selectedClass=0;
 $scope.noofticket=0;
 $scope.finalSubmit=true;
 $scope.listItem=[
 { name:"", 
   nofSeat:"", 
   seatpos:[
    {ticket:""},{ticket:""},{ticket:""}
  ]
 }];
 $scope.setClass=function(){
     for(var i=0; i<$scope.listItem.length;i++){
      for(var j=0;j<$scope.listItem[i].seatpos.length; j++){
      set.classSet($scope.listItem[i].seatpos[j].ticket);
    }
   }
  };
 $scope.numberOf=function(number){
    return get.getNumber(number);
  };/* no of row and seats*/
 $scope.verticleList=function(row, index){
    return get.getletter(row, index);
  };
  
  $scope.addinlist=function(){
    
    $scope.listItem.push({ 
         name:$scope.user, 
       nofSeat:$scope.noofticket,
           seatpos:[]      
     });
  $scope.addAt=parseInt($scope.listItem.length);
  $scope.addAt--;
  $("li a").each(function(index){
   if($(this).hasClass("success")){
   $scope.curTitle=$(this).attr("title");
   $scope.templist={"ticket":$scope.curTitle};
   $(this).removeClass("success").addClass("booked");
   $scope.listItem[$scope.addAt].seatpos.push($scope.templist);
   
  } 
  
 });

    $scope.user='';
  $scope.noofticket=0;
  $(document).ready(function(){
      $(".btn-success").attr('disabled','disabled');
    });
 };
/* for verticle alphabetical list*/
  $scope.indexno=function(row){
     $scope.countseat ++;
     if($scope.countseat>=17){
      $scope.countseat=1;
      $scope.rowcount++;
      if($scope.rowcount>=7){
       $scope.rowcount=null;
      }
      return $scope.countseat + $scope.verticleList(row, $scope.rowcount);
    }
    else{
         return $scope.countseat + $scope.verticleList(row, $scope.rowcount);
    }
    
    
 };
  $(document).ready(function(){
    $("input[type=text]").focus();
    $(".seats ul li a").each(function(index){
   $(this).prop('title', $(this).text());
   $(this).text('');
  });
  
   $(".seats ul li a").on("click", function(){
      
     if($(this).hasClass("booked")){
       alert("Please choose other seat this is already booked");
     }
     else if($(this).hasClass("success")){
      $(this).removeClass("success");
    $scope.selectedClass=$scope.selectedClass-1;
     }
   else{ 
         $scope.selectedClass=get._howMany($scope.selectedClass, $scope.noofticket);
       $scope.check=$scope.selectedClass;
      if(++$scope.check==$scope.noofticket){$(".btn-success").removeAttr('disabled');} 
       if($scope.selectedClass< $scope.noofticket && $scope.noofticket>0){
        $(this).toggleClass("success");
      }else{
         if($scope.noofticket==0){
          alert("please set the no of seat you wants to book");
         }else{
            alert("Do you want to book more than"+" "+$scope.noofticket+" "+" seats. please set how many seats you wants to book");
         }
        }
        
       $scope.selectedClass=0; 
         
    } 
  });
    
  });
  /*seat selection*/
  $scope.setClass();
});

appp.controller('LoginCtrl', ['UserService', '$location',
    function(UserService, $location) {
      var self = this;
      self.user = {username: 'admin', password: 'admin'};

      self.login = function() {
        UserService.login(self.user).then(function(success) {
          $location.path('/list');
        }, function(error) {
          console.error('Unable to login');
        })
      };
  }])

  /*
function LoginCtrl(UserService, $location) {
  var self = this;
      self.user = {username: 'admin', password: 'admin'};
      console.log(self.user)
      self.login = function() {
        console.log('click')
        UserService.login(self.user).then(function(success) {
          $location.path('/list');
        }, function(error) {
          console.error('Unable to login');
        })
      };
}
*/
function ProCtrl($scope) {
    $scope.name = 'Restaurant';
    $scope.location = '95 Middlesex Ave. Iselin, NJ';
    $scope.phone = '888-777-9999';
    $scope.email = 'abc@example.com';

    $scope.change = function() {
      $scope.name = $scope.cname;
      $scope.location = $scope.clocation;
      $scope.phone = $scope.cphone;
      $scope.email = $scope.cemail;

      $scope.cname = "";
      $scope.clocation = "";
      $scope.cphone = "";
      $scope.cemail = "";

    }
}
/*
function DeskCtrl($scope, $modal, reservationFactory) {
  $scope.headers = ["ConfirmNo.", ""];
  $scope.columnSort = { sortColumn: 'ConfirmNo.', reverse: false };

  reservationFactory.get_all().success(function(reservations) {
    $scope.reservations = reservations;
  });

  $scope.data = {
    singleSelect: null,
    multipleSelect: [],
    desk1 :  'Desk 1',
    desk2 :  'Desk 2',
    desk3 :  'Desk 3',
    desk4 :  'Desk 4',
    desk5 :  'Desk 5',
    desk6 :  'Desk 6',
    desk7 :  'Desk 7',
    desk8 :  'Desk 8'
   }

  $scope.distribute = function(r)  {
    var id = r._id;
    var modalInstance = $modal.open({
      templateUrl: 'distribute_desk_model',
      controller: DistributeCtrl,
      resolve: {
        reservation: function() {
          return reservationFactory.get_one(id);
        }
      }
    })
  }
}
/*
function LoginCtrl($scope, $location) {
    $scope.login = function() {
        //if($scope.username == "admin") {
            //if($scope.password == "admin") {
                $location.path('/#/owner');
                //$window.location.replace = '../html/list.html';
                //window.open('localhost:3000/#/owner')
            //}
        //}
    }
}
*/
function DataCtrl($scope, $modal, reservationFactory) {
  $scope.headers = ["ConfirmNo.", "Name", "Phone#",""];
  $scope.columnSort = { sortColumn: 'ConfirmNo.', reverse: false };

  reservationFactory.get_all().success(function(reservations) {
    $scope.reservations = reservations;
  });

  $scope.add = function() {
    var modalInstance = $modal.open({
      templateUrl:'add_res_model',
      controller: AddCtrl
    });
  };

  $scope.display = function(r) {
    var id = r._id;
    var modalInstance = $modal.open({
      templateUrl:'display_res_model',
      controller: DisplayCtrl,
      resolve: {
        reservation: function() {
          return reservationFactory.get_one(id);
        }
      }
    });
  };

  $scope.edit = function(r) {
    var id = r._id;
    var modalInstance = $modal.open({
      templateUrl:'edit_res_model',
      controller: EditCtrl,
      resolve: {
        reservation: function() {
          return reservationFactory.get_one(id);
        }
      }
    });
  };

  $scope.del = function(r) {
    var id = r._id;
    var modalInstance = $modal.open({
      templateUrl: 'del_res_model',
      controller: DelCtrl,
      resolve: {
        reservation: function() {
          return reservationFactory.get_one(id);
        }
      }
    });
  };
}

function GuestCtrl($scope, $modal, reservationFactory) {
  $scope.form = {};

  $scope.add_by_guest = function() {
    reservationFactory.addRes($scope.form.add).success(function(data) {
      //console.log(data);
      alert("Reserve successful, comfirm number is " + getresult(data.name, data.phoneNo));
    })

  }
}

var AddCtrl = function($scope, $http, $modalInstance, $window, reservationFactory) {
  $scope.form = {};

  $scope.add_res = function() {
    reservationFactory.addRes($scope.form.add).success(function(data) {
      $modalInstance.close($window.location.reload());
      //console.log($scope.form)
    });
  };

  $scope.cancel =  function() {
    $modalInstance.dismiss('cancel')
  };
};

var DisplayCtrl = function($scope, $modalInstance, reservation) {
  $scope.allheaders = ["Confirm#", "DATE", "TIME", "NAME", "PHONE#", "E-MAIL", "PARTY SIZE", "DESK#","OTHERS"];
  $scope.reservation = reservation.data.reservation;

  $scope.close = function() {
    $modalInstance.dismiss('cancel');
  };
};

var EditCtrl = function($scope, $modalInstance, $window, reservation, reservationFactory) {
  $scope.form = {};
  $scope.allheaders = ["Confirm#", "DATE", "TIME", "NAME", "PHONE#", "E-MAIL", "PARTY SIZE", "OTHERS"];
  $scope.form.edit = reservation.data.reservation;
  $scope.name = reservation.data.reservation.name;

  $scope.edit_res = function() {
    reservationFactory.editRes(reservation.data.reservation._id, $scope.form.edit).success(function() {
      console.log($scope.form.edit)
      $modalInstance.close($window.location.reload());
    });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  }
};

var DistributeCtrl = function($scope, $modalInstance,$window, reservation, reservationFactory) {
  $scope.reservation = reservation.data.reservation;

  $scope.distributedesk = function() {
    reservationFactory.distributeDesk(reservation.data.reservation._id, $scope.deskNo).success(function() {
      //console.log($scope.deskNo);
      $modalInstance.close($window.location.reload());
    });
  }


  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};

var DelCtrl = function($scope, $route, $modalInstance, $window, reservation, reservationFactory) {
  $scope.name = reservation.data.reservation.name;

  $scope.del_res = function() {
    reservationFactory.delRes(reservation.data.reservation._id).success(function() {
      $modalInstance.close($window.location.reload('#/owner'));
      reservationFactory.get_all().success(function(reservations) {
        return $scope.reservations = reservations;
      });
    });
  };

  $scope.cancel =  function() {
    $modalInstance.dismiss('cancel')
  };
};

