import Items from "../item"

describe('Item', function() {
    it('sould return the first item', function() {
        expect(Items.getFirstItem()).toBe('Item 1');
    })
})