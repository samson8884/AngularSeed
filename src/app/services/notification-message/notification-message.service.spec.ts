import { TestBed } from '@angular/core/testing';

import { NotificationMessageService } from './notification-message.service';

describe('NotificationMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationMessageService = TestBed.get(NotificationMessageService);
    expect(service).toBeTruthy();
  });
});
