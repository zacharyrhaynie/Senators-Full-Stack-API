const { send } = require('micro')
const { router, get } = require('microrouter')
const db = require('monk')('mongodb://user:passw0rd@ds135540.mlab.com:35540/senator-lobbying-database');

const collection = db.get('senators')

sortByParty = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let filter = req.params.party;
  let sortedByParty = await collection.find({party: filter}).then((docs)=> docs);

  send(res, 200, sortedByParty)
};

sortByGender = async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let filter = req.params.gender;
  let sortedByGender = await collection.find({'person.gender': filter}).then((docs)=> docs);

  send(res, 200, sortedByGender)
};

module.exports = router(get('/party/:party', sortByParty), get('/gender/:gender', sortByGender))
