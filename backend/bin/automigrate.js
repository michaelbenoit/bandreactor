var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.mongo;


ds.automigrate('person', function(err) {
  if (err) throw err;

  var persons = [
    {
      email: 'john.doe@ibm.com',
      createdAt: new Date(),
      lastModifiedAt: new Date(),
    },
    {
      email: 'jane.doe@ibm.com',
      createdAt: new Date(),
      lastModifiedAt: new Date(),
    },
  ];

  var count = persons.length;

  persons.forEach(function(person) {
    app.models.person.create(person, function(err, model) {
      if (err) throw err;
      console.log('Created:', model);
      count--;
      if (count === 0)
        ds.disconnect();
    });
  });


});