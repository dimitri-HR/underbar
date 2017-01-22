(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === 0) { return []; }
    return n === undefined ? array[array.length - 1] : array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    var isArray = Array.isArray(collection);
    var isObject = Object.prototype.toString.call(collection).slice(8, -1) === 'Object';

    if (isArray) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }
    if (isObject) {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  // TIP: Here's an example of a function that needs to iterate, which we've
  // implemented for you. Instead of using a standard `for` loop, though,
  // it uses the iteration helper `each`, which you will need to write.
  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Original _.filter
  // Return all elements of an array that pass a truth test.
  // _.filter = function(collection, test) {
  //   var results = [];
  //   _.each(collection, function(value){
  //     if (test(value)) {
  //       results.push(value);
  //     }
  //   });
  //   return results;
  // };

// Refactored _.filter using _.reduce
  _.filter = function(collection, test) {
    return _.reduce(collection, function(results, el) {
      if (test(el)) {
        results.push(el);
      }
      return results;
    },[]);
  };


  // Return all elements of an array that don't pass a truth test.
  // TIP: see if you can re-use _.filter() here, without simply
  // copying code in and modifying it
  _.reject = function(collection, test) {
      return _.filter(collection, function(value) {
        return !test(value);
      });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var results = [];
    _.each(array, function(el) {
      if (_.indexOf(results, el) === -1) {
        results.push(el);
      }
    });
    return results;
  };


  // Return the results of applying an iterator to each element.
  // map() is a useful primitive iteration function that works a lot
  // like each(), but in addition to running the operation on all
  // the members, it also maintains an array of results.

  // Original _.map
  // _.map = function(collection, iterator) {
  //   var results = [];
  //   _.each(collection, function(el) {
  //     results.push(iterator(el));
  //   });
  //   return results;
  // };

  // Refactored _.map using _.reduce
  _.map = function(collection, iterator) {
    return _.reduce(collection, function(results, el) {
      results.push(iterator(el));
      return results;
    },[]);
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  // TIP: map is really handy when you want to transform an array of
  // values into a new array of values. _.pluck() is solved for you
  // as an example of this.
  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  _.reduce = function(collection, iterator, accumulator) {
     _.each(collection, function (el) {
       if (typeof accumulator === 'undefined' || accumulator === null) {
         accumulator = el;
      } else {
        var res = iterator(accumulator, el);
        accumulator = res === undefined ? accumulator : res;
      }
    });
    return accumulator;
  };

  // Previous _.reduce - fails tests when initial value is false
  // _.reduce = function(collection, iterator, accumulator) {
  //    _.each(collection, function (el) {
  //      if (accumulator || accumulator === 0){
  //       var res = iterator(accumulator, el);
  //       accumulator = res === undefined ? accumulator : res;
  //     } else {
  //       accumulator = el;
  //     }
  //   });
  //   return accumulator;
  // };

// Underbar 2 -----------------------------

  // Determine if the array or object contains a given value (using `===`).
  // TIP: Many iteration problems can be most easily expressed in
  // terms of reduce(). Here's a freebie to demonstrate!
  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  // TIP: Try re-using reduce() here.
  _.every = function(collection, iterator) {
    return _.reduce(collection, function(isFound, item) {
      if (isFound) {
        isFound = iterator ? !!iterator(item) : !!item;
      }
      return isFound;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one

  // Not clever way but still works...
  // _.some = function(collection, iterator) {
  //   iterator = iterator || _.identity;
  //
  //   for (var i = 0; i < collection.length; i++) {
  //     if (iterator(collection[i])) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

// TIP: There's a very clever way to re-use every() here.
  _.some = function(collection, iterator) {
    iterator = iterator || _.identity;
    return !(_.every(collection, function(item){
      return !iterator(item);
    }));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var results = arguments[0];

    for (var i = 1; i < arguments.length; i++) {
      _.each(arguments[i], function(value, key) {
        results[key] = value;
      });
    }
    return results;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var results = arguments[0];

    for (var i = 1; i < arguments.length; i++) {
      _.each(arguments[i], function(value, key) {
        if (!(key in results)) {
          results[key] = value;
        }
      });
    }
    return results;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  _.memoize = function(func) {
    var results = {};
    return function () {
      var args = JSON.stringify([...arguments]);
      if (args in results) {
        return results[args];
      }
      results[args] = func.apply(this, arguments);
      return results[args];
    };
  };


  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = [...arguments].slice(2);
    setTimeout(function() {
      func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(arr) {
    // Random Shuffling An Array the Fisher-Yates (aka Knuth) Way
    var randomIndex;
    var temporaryValue;
    var array = arr.slice();
    var currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element at the back.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  return array;
};



  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.

  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(item) {
      if (typeof functionOrKey === 'function') {
        return functionOrKey.apply(item, args);
      }
      return item[functionOrKey].apply(item, args);
    });
  };


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    function sortMe (a, b) {
      if (typeof iterator === 'function') {
        a = iterator(a);
        b = iterator(b);
      }
      if (typeof iterator === 'string') {
        a = a[iterator];
        b = b[iterator];
      }
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
        return 0;
    }
    return collection.sort(sortMe);
  };


  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var zipped = [];
    var args = [...arguments];

    function pushToArray(index) {
      var tempArr = [];
      _.each(args, function(item) {
        tempArr.push(item[index]);
      });
      return tempArr;
    }
    // var longest = args[0];
    // for (var k = 1; k < args.length; k++) {
    //   if (args[k].length > longest.length) {
    //     longest = args[k];
    //   }
    // }

    for (var i = 0; i < args[0].length; i++) {
      zipped.push(pushToArray(i));
    }
    return zipped;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    result = result || [];
    _.each(nestedArray, function(item) {
      if (Array.isArray(item)) {
        _.flatten(item, result);
      } else {
        result.push(item);
      }
    });
    return result;
  };


  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.

  _.intersection = function() {
    var result = [];
    var firstArr = arguments[0];
    var isElInArray = false;
    for (var i = 0; i < firstArr.length; i++) {
      for (var j = 1; j < arguments.length; j++) {
        if (_.indexOf(arguments[j], firstArr[i]) > -1) {
          isElInArray = true;
        } else {
          isElInArray = false;
          break;
        }
      }
      if (isElInArray) {
        result.push(firstArr[i]);
      }
    }
    return result;
  };

  // var arr = [[1,2], [1,4,5], [5,6,7]]
  //
  // arr.sort(function(a, b) {
  //   if (a.length < b.length) {
  //     return 1
  //   }
  //   if (a.length > b.length) {
  //     return -1
  //   }
  //   return 0;
  // })
  //
  //
  // _.indexOf = function(array, target){
  //   var result = -1;
  //
  //   _.each(array, function(item, index) {
  //     if (item === target && result === -1) {
  //       result = index;
  //     }
  //   });
  //   return result;
  // };
  //
  //
  // it('should take the set intersection of two arrays', function() {
  //   var stooges = ['moe', 'curly', 'larry'];
  //   var leaders = ['moe', 'groucho'];
  //
  //   expect(_.intersection(stooges, leaders)).to.eql(['moe']);
  // });
  //


  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.

  // to be refactored
  _.difference = function() {
    var result = [];
    var firstArr = arguments[0];
    var isElInArray = false;
    for (var i = 0; i < firstArr.length; i++) {
      for (var j = 1; j < arguments.length; j++) {
        if (_.indexOf(arguments[j], firstArr[i]) === -1) {
          isElInArray = true;
        } else {
          isElInArray = false;
          break;
        }
      }
      if (isElInArray) {
        result.push(firstArr[i]);
      }
    }
    return result;
  };


  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.

  _.throttle = function(func, wait) {
    var result;
    var alreadyCalled = false;
    var args = [...arguments].slice(2);

    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        setTimeout(function() {
          alreadyCalled = true;
        }, wait);
      }
      return result;
    };
  };



  // Throttle - with Scheduling
  // This version of throttle will schedule a function call at the end of waiting period
  // E.g.
  // t0 - initial call (with 100ms waiting window)
  // t40 - another attempt to call a callback function. It doesn't run immediately but is scheduled to run at t100
  // t60-99 - any attempt to call the function again will return previous results and do nothing else.
  // t100 - a function runs (that was scheduled at t40)
  // t120 - attempt to call will be scheduled to run at t200
  // etc...

  // _.throttle = function(func, wait) {
  //   var isScheduled = false;
  //   var args = [...arguments];
  //   var lastRun;
  //   var results;
  //
  //   return function() {
  //     var currentTime = Date.now();
  //     var getResults = function() {
  //       lastRun = Date.now();
  //       results = func.apply(this, args);
  //     };
  //     // first call
  //     if (!lastRun || (lastRun + wait < currentTime)) {
  //       getResults();
  //       return results;
  //     }
  //     var delay = wait - Date.now() + lastRun;
  //
  //     // second call -> schedule
  //     if ((lastRun + wait > currentTime) && !isScheduled) {
  //       isScheduled = true;
  //       setTimeout(function() {
  //         isScheduled = false;
  //         getResults();
  //       }, delay);
  //       return results;
  //
  //     // if already scheduled
  //     } else if ((lastRun + wait >= currentTime )&& isScheduled) {
  //       return results;
  //     }
  //   };
  // };


}());
