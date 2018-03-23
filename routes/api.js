const express = require('express');
const router = express.Router();
const CommentsDB = require('../models/comments');
const AnswerDB = require('../models/answer');

// get all comments list
router.get('/ninjas/:n', (req, res, next) => {
  // console.log('In router.get:', req.params.n);
  CommentsDB.find({ id: 1 }, { data: { '$elemMatch': { num: req.params.n } } })
    .then((data) => {
      data = data[data.length - 1].data[0];
      // console.log('COMMENTS:', data);
      res.send(data.comments);
    })
    .catch((err) => {
      console.log('ERROR IN API COMMENTS:', err);
    });
});

// add new comment
router.post('/ninjas', (req, res, next) => {
  // console.log('in router.post:',req.body);
  var item = {
    id: 1,
    num: req.body.id,
    size: req.body.com.length,
    comments: req.body.com
  };

  if (item.size > 1) {
    // console.log('In comment update');
    CommentsDB.update(
      { 'data.num': item.num },
      { '$set': { 'data.$.comments': item.comments, 'data.$.num': item.num } }
    )
      .then((comments) => {
        res.send(comments);
      })
      .catch((err) => {
        console.log('ERROR in api comment POST:', err);
      });
  } else {
    console.log('In comment create');
    CommentsDB.update(
      { id: 1 },
      { $addToSet: { 'data': item } },
      { safe: true, upsert: true }
    )
      .then((comments) => {
        res.send(comments);
      })
      .catch((err) => {
        console.log('ERROR in comment api POST:', err);
      });
  }
});

// update comments
router.put('/ninjas', (req, res, next) => {
  CommentsDB.update({ _id: req.params.id }, req.body).then(
    () => {
      CommentsDB.findOne({ _id: req.params.id }).then((comment) => {
        res.send(comment);
      });
    }
  );
});

// get answer
router.get('/answer/:n/:id', (req, res, next) => {
  //console.log('check',req.params.n);
  AnswerDB.find({ id: 1 }, { data: { '$elemMatch': { num: req.params.n } } })
    .then((data) => {
      data = data[data.length - 1].data[0];
      // console.log('ANSWER:', data);
      if (data) {
        res.send(data);
      }
    })
    .catch((err) => {
      console.log('ERROR IN API ANSWER:', err);
    });
});

// add new answer
router.post('/answer', (req, res, next) => {
  var item = {
    num: req.body.id,
    count: req.body.hiLiCount,
    answer: req.body.answer
  };
  // var data = { num: item.num, hiLiCount: item.hiLiCount, answer: item.answer };
  // Person.update({ 'items.id': 2 }, {
  //   '$set': {
  //     'items.$.name': 'updated item2',
  //     'items.$.value': 'two updated'
  //   }
  // }, function (err) { ...

  if (item.count != 2) {
    // console.log('In update');
    AnswerDB.update(
      // { 'data.num': { '$ne': item.num } },
      // { '$addToSet': { 'data': item } },
      // {upsert:true}

      { 'data.num': item.num },
      { '$set': { 'data.$.answer': item.answer, 'data.$.count': item.count } }

      // {data: item}
      // {},
      // { '$set': {'data.$[elem]': [item]} },
      // { 'arrayFilters': [{ "elem.num": item.num }], upsert: true}
    )
      .then((answer) => {
        res.send(answer);
      })
      .catch((err) => {
        console.log('ERROR in api POST:', err);
      });
  } else {
    // console.log('In create');
    AnswerDB.update(
      // { },
      // {$push: {data: item}},
      // {safe: true , upsert: true}

      { id: 1 },
      { $addToSet: { 'data': item } },
      // { '$push': { 'data.$.num': item.num,'data.$.hiLiCount':item.hiLiCount,'data.$.answer':item.answer } },
      { safe: true, upsert: true }

      //     // {"data.num":item.num},
      //     // { $set: { "data.$[elem]": item } },
      //     // { arrayFilters: [{ "elem.num": item.num }] }
      //     // { "data.num": item.num },
      //     // { data: [item] }
      //     // {"data.num": item.num},

      //     // {},
      //     // { $set: { "data.$[elem].hiLiCount": item.hiLiCount, "data.$[elem].answer": item.answer } },
      //     // { arrayFilters: [{ "elem.num": item.num }] }
    )
      .then((answer) => {
        res.send(answer);
      })
      .catch((err) => {
        console.log('ERROR in api POST:', err);
      });
  }
});

// delete comment
router.delete('/ninjas/:id', (req, res, next) => {
  CommentsDB.findByIdAndRemove({ _id: req.params.id }).then((comment) => {
    res.send(comment);
  });
});

module.exports = router;
