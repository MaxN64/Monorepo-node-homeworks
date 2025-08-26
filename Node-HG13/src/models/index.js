
const Publisher = require('./publisher.model'); 


const Magazine = require('./magazine.model');  
const { Tag, Article } = require('../models');



module.exports = {
  Publisher: require('./publisher.model'),
  Magazine: require('./magazine.model'),
  Tag: require('./tag.model'),
  Article: require('./article.model'),
};

