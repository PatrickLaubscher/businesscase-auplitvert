import { OrderlineStatusPipe } from './orderline-status.pipe';

describe('OrderlineStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderlineStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
