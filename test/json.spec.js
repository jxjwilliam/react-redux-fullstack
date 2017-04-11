import {expect} from 'chai'
import data from '../etc/data.json'

describe('# JSON-data Test', () => {
  it('should be accessible', () => {
    expect(data).to.have.lengthOf(100);
    expect(data[0]).to.have.ownProperty('firstName');
    expect(data[0]).to.have.ownProperty('lastName');
    expect(data[0]).to.have.ownProperty('email');
    expect(data[0]).to.have.ownProperty('phone');
    expect(data[0]).to.have.ownProperty('dob');
  });
})