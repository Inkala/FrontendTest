'use strict';


require('chai').should();
const fs = require('fs');
require('jsdom-global')(fs.readFileSync(__dirname + '/mock.html', 'utf8'));
const fetchUserData = require('../index.js').fetchUserData;
const fetchRepoData = require('../index.js').fetchRepoData;

describe('fetchUserData', () => {

  it('should correctly fetch the user data', async () => {
    const userData = await fetchUserData("Marfeel");
    userData.should.be.a('object');
    userData.login.should.be.a('string');
    userData.id.should.be.a('number');
  });

  it('should handle search when user doesn\' exist', async () => {
    const repoData = await fetchRepoData("Marfeel111");
    repoData.message.should.equal('Not Found');
  });

});

describe('fetchRepoData', () => {

  it('should correctly fetch the repos data', async () => {
    const repoData = await fetchRepoData("Marfeel");
    repoData.should.have.property('length');
    repoData[0].name.should.be.a('string');
    repoData[0].id.should.be.a('number');
  });

  it('should handle users with no repos', async () => {
    const repoData = await fetchRepoData("sdfg");
    repoData.length.should.be.equal(0);
  });

});
