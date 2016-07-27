import expect from 'expect';
import example from '../../models/example';

describe('example', () => {

  describe('reducer', () => {
    it('it should save', () => {
      expect(example.reducers['examples/save']({}, { payload: { a: 1 }})).toEqual({ a: 1 });
    });
  })
});
