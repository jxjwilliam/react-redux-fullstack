import chai, { expect } from 'chai'
import prettyjson from 'prettyjson'

describe('# Reducer Test', () => {
  let flatten, ary;
  before(() => {
    flatten = ary => ary.reduce((acc, val) => acc.concat(
      Array.isArray(val) ? flatten(val) : val
    ), []);
    ary = [0, 1, 2, 3, 4, 5];
  });

  it('1 level array should merge', () => {
    var list1 = [[0, 1], [2, 3], [4, 5]];
    expect(flatten(list1)).to.deep.equal(ary)
  });

  it('multiple nested array should merge into 1 level', () => {
    var list2 = [0, [1, [2, [3, [4, [5]]]]]];
    expect(flatten(list2)).to.deep.equal(ary)
  })

  it('should calculate the summary', () => {
    var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

    var countedNames = names.reduce((allNames, name) => {
      if (name in allNames) allNames[name]++;
      else allNames[name] = 1;
      return allNames;
    }, {})

    //console.log(prettyjson.render(countedNames))
    expect(countedNames['Alice']).to.be.equal(2);
    expect(countedNames['Bob']).to.be.equal(1);
  });

});
