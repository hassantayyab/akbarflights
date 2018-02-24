const express = require("express");
const router = express.Router();
const CommentsDB = require("../models/comments");
const AnswerDB = require("../models/answer");

// get answer
router.get("/answer/:n/:id", function(req, res, next) {
  //console.log('check',req.params.n);
  if (req.params.n == 1) {
    AnswerDB.find({ ident: req.params.id })
      .then(function(data) {
        data = data[data.length - 1];
        //console.log('ANSWER:',data);
        if (data) {
          res.send(data.data1);
        }
      })
      .catch(function(err) {
        console.log("ERROR IN API ANSWER:", err);
      });
  } else if (req.params.n == 2) {
    AnswerDB.find({ ident: req.params.id })
      .then(function(data) {
        data = data[data.length - 1];
        // console.log('ANSWER:',data);
        if (data) {
          res.send(data.data2);
        }
      })
      .catch(function(err) {
        console.log("ERROR IN API ANSWER:", err);
      });
  } else if (req.params.n == 3) {
    AnswerDB.find({ ident: req.params.id })
      .then(function(data) {
        data = data[data.length - 1];
        // console.log('ANSWER:',data);
        if (data) {
          res.send(data.data3);
        }
      })
      .catch(function(err) {
        console.log("ERROR IN API ANSWER:", err);
      });
  } else if (req.params.n == 4) {
    AnswerDB.find({ ident: req.params.id })
      .then(function(data) {
        data = data[data.length - 1];
        // console.log('ANSWER:',data);
        if (data) {
          res.send(data.data4);
        }
      })
      .catch(function(err) {
        console.log("ERROR IN API ANSWER:", err);
      });
  }
});

// get all comments list
router.get("/ninjas/:n", function(req, res, next) {
  console.log("In router.get:", req.params.n);
  if (req.params.n == "first") {
    CommentsDB.find({ comments1: { $elemMatch: { $gte: req.params.n } } })
      .then(function(data) {
        data = data[data.length - 1];
        console.log("COMMENTS:", data.comments1);
        res.send(data.comments1);
      })
      .catch(function(err) {
        console.log("ERROR IN API COMMENTS:", err);
      });
  } else if (req.params.n == "sec") {
    CommentsDB.find({ comments2: { $elemMatch: { $gte: req.params.n } } })
      .then(function(data) {
        data = data[data.length - 1];
        console.log("COMMENTS:", data.comments2);
        res.send(data.comments2);
      })
      .catch(function(err) {
        console.log("ERROR IN API COMMENTS:", err);
      });
  } else if (req.params.n == "third") {
    CommentsDB.find({ comments3: { $elemMatch: { $gte: req.params.n } } })
      .then(function(data) {
        data = data[data.length - 1];
        console.log("COMMENTS:", data.comments3);
        res.send(data.comments3);
      })
      .catch(function(err) {
        console.log("ERROR IN API COMMENTS:", err);
      });
  } else if (req.params.n == "four") {
    CommentsDB.find({ comments4: { $elemMatch: { $gte: req.params.n } } })
      .then(function(data) {
        data = data[data.length - 1];
        console.log("COMMENTS:", data.comments4);
        res.send(data.comments4);
      })
      .catch(function(err) {
        console.log("ERROR IN API COMMENTS:", err);
      });
  }
});

// add new answer
router.post("/answer", function(req, res, next) {
  var item = {
    ident: req.body.ident,
    num: req.body.num,
    numb: req.body.numb,
    answer: req.body.ans
  };
  if (item.num == 1) {
    AnswerDB.update(
      { ident: item.ident },
      { data1: { numb: item.numb, answer: item.answer } },
      { upsert: true }
    )
      .then(function(answer) {
        res.send(answer);
      })
      .catch(function(err) {
        console.log("ERROR in api POST:", err);
      });
  } else if (item.num == 2) {
    AnswerDB.update(
      { ident: item.ident },
      { data2: { numb: item.numb, answer: item.answer } },
      { upsert: true }
    )
      .then(function(answer) {
        res.send(answer);
      })
      .catch(function(err) {
        console.log("ERROR in api POST:", err);
      });
  } else if (item.num == 3) {
    AnswerDB.update(
      { ident: item.ident },
      { data3: { numb: item.numb, answer: item.answer } },
      { upsert: true }
    )
      .then(function(answer) {
        res.send(answer);
      })
      .catch(function(err) {
        console.log("ERROR in api POST:", err);
      });
  } else if (item.num == 4) {
    AnswerDB.update(
      { ident: item.ident },
      { data4: { numb: item.numb, answer: item.answer } },
      { upsert: true }
    )
      .then(function(answer) {
        res.send(answer);
      })
      .catch(function(err) {
        console.log("ERROR in api POST:", err);
      });
  }
});

// add new comment
router.post("/ninjas", function(req, res, next) {
  // console.log('in router.post:',req.body);
  var item = {
    ident: req.body.ident,
    //num:req.body.num,
    n: req.body.com[0],
    comments: req.body.com
  };
  if (item.n === "first") {
    CommentsDB.update(
      { ident: item.ident },
      {
        ident: item.ident,
        comments1: item.comments
        //num:item.num
      },
      { upsert: true }
    )
      .then(function(comment) {
        res.send(comment);
      })
      .catch(next);
  } else if (item.n === "sec") {
    CommentsDB.update(
      { ident: item.ident },
      {
        ident: item.ident,
        comments2: item.comments
        //num:item.num
      },
      { upsert: true }
    )
      .then(function(comment) {
        res.send(comment);
      })
      .catch(next);
  } else if (item.n === "third") {
    CommentsDB.update(
      { ident: item.ident },
      {
        ident: item.ident,
        comments3: item.comments
        //num:item.num
      },
      { upsert: true }
    )
      .then(function(comment) {
        res.send(comment);
      })
      .catch(next);
  } else if (item.n === "four") {
    CommentsDB.update(
      { ident: item.ident },
      {
        ident: item.ident,
        comments4: item.comments
        //num:item.num
      },
      { upsert: true }
    )
      .then(function(comment) {
        res.send(comment);
      })
      .catch(next);
  }
  // CommentsDB.create(req.body).then(function (comment) {
  //   res.send(comment);
  // }).catch(next);
});

// update comments
router.put("/ninjas/:id", function(req, res, next) {
  CommentsDB.findByIdAndUpdate({ _id: req.params.id }, req.body).then(
    function() {
      CommentsDB.findOne({ _id: req.params.id }).then(function(comment) {
        res.send(comment);
      });
    }
  );
});

// delete comment
router.delete("/ninjas/:id", function(req, res, next) {
  CommentsDB.findByIdAndRemove({ _id: req.params.id }).then(function(comment) {
    res.send(comment);
  });
});

module.exports = router;
