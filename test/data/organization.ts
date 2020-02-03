import { Organization } from "../../src/models/organization";
import { plainToClass } from 'class-transformer';

const organizationData = {
    _id: 1,
    url: "http://initech.zendesk.com/api/v2/organizations/101.json",
    external_id: "9270ed79-35eb-4a38-a46f-35725197ea8d",
    name: "Enthaze",
    domain_names: [
      "kage.com",
      "ecratic.com",
      "endipin.com",
      "zentix.com"
    ],
    created_at: new Date("2016-05-21T11:10:28 -10:00"),
    details: "MegaCorp",
    shared_tickets: false,
    tags: [
      "Fulton",
      "West",
      "Rodriguez",
      "Farley"
    ]
}

export const testOrganization: Organization = plainToClass(Organization, organizationData);