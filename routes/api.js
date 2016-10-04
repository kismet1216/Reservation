var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//    dbconfig = require('./database');
var DES = require('./des');

var reservationSchema = new Schema ({
    confirmNo: { type: String },
    date: { type: String },
    time: { type: String },
    name: { type: String, require: true},
    phoneNo: { type: String },
    email: { type: String },
    peopleNo: { type: Number },
    additional: { type: String},
    deskNo: { type: String }
  },{ versionKey: false });

var reservationModel = mongoose.model('reservations', reservationSchema);
//mongoose.connect(dbconfig.url);

exports.reservations = function(req, res) {
  return reservationModel.find(function(err, reservations) {
    if(!err) {
      res.json(reservations);
    } else  {
      console.log(err);
    }
  });
};

exports.reservation = function(req, res) {
  var id = req.params.id;
  if(id) {
    reservationModel.findById(id, function(err, reservation) {
      if(!err) {
        if(reservation) {
          res.json({ reservation: reservation, status:true });
        } else  {
          res.json({ status: false });
        }
      } else {
        console.log(err);
      }
    });
  }
};

exports.add = function(req, res) {
  var reservation = req.body;

  reservation = new reservationModel({
    date: req.body.date,
    time: req.body.time,
    name: req.body.name,
    phoneNo: req.body.phoneNo,
    email: req.body.email,
    peopleNo: req.body.peopleNo,
    additional:  req.body.additional,
    confirmNo: DES.getresult(req.body.name, req.body.phoneNo)
  });
  reservation.save(function(err, reservation) {
    if(!err) {
      res.json(true);
    } else {
      console.log(err);
      res.json(false);
    }
  });
  return res.json(reservation);
};

exports.edit = function(req, res) {
  var  id = req.params.id;
  if(id) {
    reservationModel.findById(id, function(err, reservation) {
      reservation.date = req.body.date,
      reservation.time = req.body.time,
      reservation.name = req.body.name,
      reservation.phoneNo = req.body.phoneNo,
      reservation.email = req.body.email,
      reservation.peopleNo = req.body.peopleNo,
      reservation.additional = req.body.additional,
      reservation.deskNo = req.body.deskNo,
      reservation.save(function(err) {
        if(!err) {
          res.json(true);
        } else {
          res.json(false);
          console.log(err);
        }
      });
    });
  };
};

exports.searchcn = function(req, res) {
  var confirmNo = req.params.confirmNo;
  if(confirmNo) {
    reservationModel.findOne({ confirmNo : confirmNo }, function(err, reservation) {
      if(!err) {
        if(reservation) {
          res.json({ reservation: reservation, status:true });
        } else  {
          res.json({ status: false });
        }
      } else {
        console.log(err);
      }
    });
  }
};
/*
exports.disdesk = function(req, res) {
  var id = req.params.id;
  console.log(req.body)
  if(id){
    reservationModel.findById(id, function(err, reservation) {
      reservation.deskNo = req.body.deskNo,
      console.log(id);
      console.log(req.body.deskNo)
     reservation.save(function(err) {
        if(!err) {
          res.json(true);
        } else {
          res.json(false);
          console.log(err);
        }
      });
    })
  }
}
*/
exports.delete = function(req, res) {
  var id = req.params.id;
  if(id) {
    reservationModel.findById(id, function(err, reservation) {
      reservation.remove(function (err) {
        if(!err) {
          res.json(true);
        } else  {
          res.json(false);
          console.log(err);
        }
      });
    });
  }
};

