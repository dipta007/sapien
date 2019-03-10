const Axios = require('../../Axios');
const chai = require('chai');

chai.should();

describe('/GET users', () => {
  it('will check the whole user flow', async () => {
    const username = 'dipta007';
    let users = await Axios.post('/graphql', {
      query: `
            query {
                authors(username: "${username}") {
                    username
                }
            }
        `
    });

    users = users.data.data.authors;
    users.should.be.a('array');
    [users] = users;
    users.should.be.a('object');
    users.username.should.be.a('string');

    users.username.should.be.eql(username);
  });
});
