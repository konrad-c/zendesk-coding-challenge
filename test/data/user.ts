import { User } from '../../src/models/user';
import { testOrganization } from './organization';
import { plainToClass } from 'class-transformer';

const userData = {
    _id: 1,
    url: "http://initech.zendesk.com/api/v2/users/1.json",
    external_id: "74341f74-9c79-49d5-9611-87ef9b6eb75f",
    name: "Francisca Rasmussen",
    alias: "Miss Coffey",
    created_at: new Date(),
    active: true,
    verified: true,
    shared: false,
    locale: "en-AU",
    timezone: "Sri Lanka",
    last_login_at: new Date("2013-08-04T01:03:27 -10:00"),
    email: "coffeyrasmussen@flotonic.com",
    phone: "8335-422-718",
    signature: "Don't Worry Be Happy!",
    organization_id: testOrganization._id,
    tags: [
      "Springville"
    ],
    suspended: true,
    role: "admin"
}

export const testUser: User = plainToClass(User, userData);