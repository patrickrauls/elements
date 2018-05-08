export const FAILED_VALIDATION =
  'Validation requirements have not been satisfied.';

export const regEx = {
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
}

export const emails = {
  valid: [
    {
      value: 'email@domain.com',
      description: 'email is standard'
    },
    {
      value: 'firstname.lastname@domain.com',
      description: 'email contains dot in the address field'
    },
    {
      value: 'email@subdomain.domain.com',
      description: 'Email contains dot with subdomain'
    },
    {
      value: 'firstname+lastname@domain.com',
      description: 'Plus sign is considered valid character'
    },
    {
      value: 'email@123.123.123.123',
      description: 'Domain is valid IP address'
    },
    {
      value: 'email@[123.123.123.123]',
      description: 'Square bracket around IP address is considered valid'
    },
    {
      value: '"email"@domain.com',
      description: 'Quotes around email is considered valid'
    },
    {
      value: '1234567890@domain.com',
      description: 'Digits in address are valid'
    }, {
      value: 'email@domain-one.com',
      description: 'Dash in domain name is valid'
    }, {
      value: '_______@domain.com',
      description: 'Underscore in the address field is valid'
    }, {
      value: 'email@domain.name',
      description: '.name is valid Top Level Domain name'
    }, {
      value: 'email@domain.co.uk',
      description: 'Dot in Top Level Domain name also considered valid'
    }, {
      value: 'firstname-lastname@domain.com',
      description: 'Dash in address field is valid'
    }
  ],
  invalid: [
    {
      value: 'plainaddress',
      description: 'Missing @sign and domain'
    }, {
      value: '#@%^%#$@#$@#.com',
      description: 'Garbage'
    }, {
      value: '@domain.com',
      description: 'Missing username'
    }, {
      value: 'email.domain.com',
      description: 'Missing @'
    }, {
      value: 'email.@domain.com',
      description: 'Trailing dot in address is not allowed'
    }, {
      value: 'あいうえお@domain.com',
      description: 'Unicode char as address'
    }, {
      value: 'email@domain',
      description: 'Missing top level domain'
    }, {
      value: 'email@-domain.com',
      description: 'Leading dash in front of domain is invalid'
    }, {
      value: 'email@domain..com',
      description: 'Multiple consecutive dots in the domain portion is invalid'
    }
  ]
};
