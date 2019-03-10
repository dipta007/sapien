const chai = require('chai');

chai.should();
const Axios = require('../../Axios');

describe('/INSERT /GET /DELETE media', () => {
  it('it should check the whole media graphql flow', async () => {
    // this.timeout(0);
    const thumbnail = 'its a thumbnai';
    const cover = 'its a cover';

    let id = await Axios.post('/graphql', {
      query: `
        mutation addMedia{
            addMedia(thumbUrl: "${thumbnail}", coverUrl: "${cover}")
        }
    `
    });

    id = id.data.data.addMedia;
    id.should.be.a('string');

    let media = await Axios.post('/graphql', {
      query: `
          query {
            medias(id: "${id}") {
                mediaid
                mediathumbnail
                mediacover
            }
        }
        `
    });
    media = media.data.data.medias;
    media.should.be.a('array');

    [media] = media;
    media.mediathumbnail.should.be.eql(thumbnail);
    media.mediacover.should.be.eql(cover);

    let deletedId = await Axios.post('/graphql', {
      query: `
        mutation {
            deleteMedia(id: "${id}")
        }
        `
    });
    deletedId = deletedId.data.data.deleteMedia;

    deletedId.should.be.eql(id);
  });
});
