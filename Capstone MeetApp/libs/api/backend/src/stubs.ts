import { ObjectId } from 'mongodb';

interface Location {
  latitude: number;
  longitude: number;
}

interface Event {
  _id: ObjectId;
  organisation: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  category: string;
  name: string;
  eventPoster: string;
  location: Location;
  region : string;
}

export const eventStubs: Event[] = [
  {
    _id: new ObjectId("6472247ecd65fc66879f1909"),
    organisation: 'HubnTub',
    description: 'Join us for a day of tech talks and networking!',
    date: '2023-09-30',
    startTime: '09:00 AM',
    endTime: '05:00 PM',
    category: 'Technology',
    name: 'Tech Conference 2023',
    eventPoster: 'tech-conference.jpg',
    location: { latitude: 37.7749, longitude: -122.4194 },
    region : 'Pretoria'
  },
  {
    _id: new ObjectId("64c24812ab4de86563bc4623"),
    organisation: 'Art Foundation',
    description: 'Discover stunning artworks from around the world.',
    date: '2023-10-15',
    startTime: '11:00 AM',
    endTime: '04:00 PM',
    category: 'Art',
    name: 'Art Exhibition',
    eventPoster: 'art-exhibition.jpg',
    location: { latitude: 34.0522, longitude: -118.2437 },
    region : 'Pretoria'
  },
  {
    _id: new ObjectId("64be71e858dc202ff199814f"),
    organisation: 'GoGoMusic',
    description: 'Enjoy live music performances under the open sky!',
    date: '2023-11-05',
    startTime: '02:00 PM',
    endTime: '10:00 PM',
    category: 'Music',
    name: 'Music Festival 2023',
    eventPoster: 'music-festival.jpg',
    location: { latitude: 51.5074, longitude: -0.1278 },
    region : 'Durban'
  },
  {
    _id: new ObjectId("64be713458dc202ff199813f"),
    organisation: 'HubnTub',
    description: 'A culinary adventure with world-class chefs.',
    date: '2023-12-20',
    startTime: '06:00 PM',
    endTime: '10:00 PM',
    category: 'Food & Drink',
    name: 'Food Festival',
    eventPoster: 'food-festival.jpg',
    location: { latitude: 40.7128, longitude: -74.0060 },
    region : 'Cape Town'
  },
  {
    _id: new ObjectId("64bf57052fd8ab94c5e2c89e"),
    organisation: 'GoGoMusic',
    description: 'Join us for a group fitness workout session.',
    date: '2024-01-10',
    startTime: '07:30 AM',
    endTime: '09:30 AM',
    category: 'Health & Wellness',
    name: 'Morning Yoga',
    eventPoster: 'morning-yoga.jpg',
    location: { latitude: 45.4215, longitude: -75.6919 },
    region : 'Joburg'
  },
  {
    _id: new ObjectId("64c24814ab4de86563bc4627"),
    organisation: 'Art Foundation',
    description: 'Explore the wonders of the universe with our stargazing event.',
    date: '2023-10-10',
    startTime: '07:00 PM',
    endTime: '10:00 PM',
    category: 'Science',
    name: 'Stargazing Night',
    eventPoster: 'stargazing-night.jpg',
    location: { latitude: 34.0522, longitude: -118.2437 },
    region : 'Pretoria'
  },
  {
    _id: new ObjectId("64be718a58dc202ff1998145"),
    organisation: 'Local Theater Group',
    description: 'Experience a classic Shakespearean play in an outdoor theater.',
    date: '2023-11-20',
    startTime: '06:30 PM',
    endTime: '09:00 PM',
    category: 'Theater',
    name: 'Shakespeare in the Park',
    eventPoster: 'shakespeare.jpg',
    location: { latitude: 40.7128, longitude: -74.0060 },
    region : 'Durban'
  },
  {
    _id: new ObjectId("64a85f8a2a62945eb86d3f72"),
    organisation: 'ESporty Bros',
    description: 'Join us for a community cleanup event to protect our environment.',
    date: '2023-12-05',
    startTime: '09:00 AM',
    endTime: '12:00 PM',
    category: 'Environment',
    name: 'Community Cleanup',
    eventPoster: 'community-cleanup.jpg',
    location: { latitude: 51.5074, longitude: -0.1278 },
    region : 'Nelspruit'
  },
  {
    _id: new ObjectId("64baeafc63c84434d36367a5"),
    organisation: 'Local Craft Fair',
    description: 'Shop for unique handmade crafts and support local artisans.',
    date: '2024-01-15',
    startTime: '10:00 AM',
    endTime: '04:00 PM',
    category: 'Crafts',
    name: 'Craft Fair',
    eventPoster: 'craft-fair.jpg',
    location: { latitude: 45.4215, longitude: -75.6919 },
    region : 'Standerton'
  },
  {
    _id: new ObjectId("64aeed1cc0998a2af191e25c"),
    organisation: 'BookIn',
    description: 'Learn from industry experts and network with startups.',
    date: '2024-02-25',
    startTime: '08:00 AM',
    endTime: '06:00 PM',
    category: 'Technology',
    name: 'Startup Summit',
    eventPoster: 'startup-summit.jpg',
    location: { latitude: 37.7749, longitude: -122.4194 },
    region : 'Knysna'
  }
];

interface UserStub {
    id: ObjectId;
    username: string;
    password: string;
    profilePicture: string;
    region: string;
    emailAddress: string;
    interests: string[];
  }
  
  export const userStubs: UserStub[] = [
    {
      id: new ObjectId("64cbaf2f44224fc7644bdb86"),
      username: 'johndoe',
      password: 'securepass1',
      profilePicture: 'john_profile.jpg',
      region: 'New York City',
      emailAddress: 'john.doe@example.com',
      interests: ['Technology', 'Basketball', 'Movies'],
    },
    {
      id: new ObjectId("650beadc4e248638f32a1bfe"),
      username: 'janedoe',
      password: 'mypassword123',
      profilePicture: 'jane_profile.jpg',
      region: 'Los Angeles',
      emailAddress: 'jane.doe@example.com',
      interests: ['Music', 'Art', 'Travel'],
    },
    {
      id: new ObjectId("65052a0d5ccaa09b47d6ecf3"),
      username: 'michael_smith',
      password: 'passw0rd!',
      profilePicture: 'michael_profile.jpg',
      region: 'London',
      emailAddress: 'michael.smith@example.com',
      interests: ['Cooking', 'Fashion', 'Soccer'],
    },
    {
      id: new ObjectId("6507eca15e1b4d6ccb246d96"),
      username: 'susanwilliams',
      password: 'secretword321',
      profilePicture: 'susan_profile.jpg',
      region: 'San Francisco',
      emailAddress: 'susan.williams@example.com',
      interests: ['Gaming', 'Books', 'Hiking'],
    },
    {
      id: new ObjectId("6472240ecd65fc66879e647f"),
      username: 'davidbrown',
      password: 'myp@ssw0rd',
      profilePicture: 'david_profile.jpg',
      region: 'Sydney',
      emailAddress: 'david.brown@example.com',
      interests: ['Photography', 'Fitness', 'Camping'],
    },
    {
        id: new ObjectId(),
        username: 'alice_smith',
        password: 'myp@ssword',
        profilePicture: 'alice_profile.jpg',
        region: 'Paris',
        emailAddress: 'alice.smith@example.com',
        interests: ['Art', 'Travel', 'Fashion'],
      },
      {
        id: new ObjectId(),
        username: 'robert_jones',
        password: 'secure123',
        profilePicture: 'robert_profile.jpg',
        region: 'Cape Town',
        emailAddress: 'robert.jones@example.com',
        interests: ['Music', 'Cooking', 'Hiking'],
      },
      {
        id: new ObjectId(),
        username: 'lisa_wilson',
        password: 'password123',
        profilePicture: 'lisa_profile.jpg',
        region: 'Pretoria',
        emailAddress: 'lisa.wilson@example.com',
        interests: ['Technology', 'Books', 'Gaming'],
      },
      {
        id: new ObjectId(),
        username: 'kevin_davis',
        password: 'letmein',
        profilePicture: 'kevin_profile.jpg',
        region: 'Pretoria',
        emailAddress: 'kevin.davis@example.com',
        interests: ['Fitness', 'Soccer', 'Photography'],
      },
      {
        id: new ObjectId(),
        username: 'emily_martin',
        password: 'emily123',
        profilePicture: 'emily_profile.jpg',
        region: 'Joburg',
        emailAddress: 'emily.martin@example.com',
        interests: ['Movies', 'Camping', 'Basketball'],
      },
  ];

  interface Organization {
    _id: ObjectId;
    username: string;
    password: string;
    region: string;
    emailAddress: string;
    events: ObjectId[];
    name: string;
  }
  
  export const organisationStubs: Organization[] = [
    {
      _id: new ObjectId("64aaf1ae79fdf7e618f8e3e9"),
      username: 'art_foundation',
      password: 'artpass123',
      region: 'New York',
      emailAddress: 'info@artfoundation.org',
      events: [new ObjectId("64c24812ab4de86563bc4623"), new ObjectId("64c24814ab4de86563bc4627"), new ObjectId()],
      name : 'Art Foundation'
    },
    {
      _id: new ObjectId("64b233b945d83893c8d0faf7"),
      username: 'music_festival',
      password: 'music1234',
      region: 'Los Angeles',
      emailAddress: 'info@musicfestival.com',
      events: [new ObjectId("64be71e858dc202ff199814f"), new ObjectId("64bf57052fd8ab94c5e2c89e")],
      name : 'GoGoMusic'
    },
    {
      _id: new ObjectId("64c247d4ab4de86563bc461f"),
      username: 'tech_community',
      password: 'techhub567',
      region: 'San Francisco',
      emailAddress: 'info@techcommunity.org',
      events: [new ObjectId("64be713458dc202ff199813f"), new ObjectId("6472247ecd65fc66879f1909")],
      name: 'HubnTub'
    },
    {
      _id: new ObjectId(),
      username: 'sports_club',
      password: 'sportsclub99',
      region: 'Chicago',
      emailAddress: 'info@sportsclub.com',
      events: [new ObjectId("64a85f8a2a62945eb86d3f72")],
      name: "Sporty Bros"
    },
    {
      _id: new ObjectId(),
      username: 'book_club',
      password: 'bookworm321',
      region: 'Boston',
      emailAddress: 'info@bookclub.org',
      events: [new ObjectId("64aeed1cc0998a2af191e25c"), new ObjectId()],
      name : 'BookIn'
    },
    
  ];

  interface Friendship {
    _id: ObjectId;
    requesterID: ObjectId;
    requesteeID: ObjectId;
    status: boolean;
  }
  
  export const friendshipsStubs: Friendship[] = [
    {
      _id: new ObjectId(),
      requesterID: new ObjectId("64cbaf2f44224fc7644bdb86"),
      requesteeID: new ObjectId("6507eca15e1b4d6ccb246d96"),
      status: true,
    },
    {
      _id: new ObjectId(),
      requesterID: new ObjectId("6472240ecd65fc66879e647f"),
      requesteeID: new ObjectId("64cbaf2f44224fc7644bdb86"),
      status: true,
    },
    {
      _id: new ObjectId(),
      requesterID: new ObjectId("64cbaf2f44224fc7644bdb86"),
      requesteeID: new ObjectId("65052a0d5ccaa09b47d6ecf3"),
      status: false,
    },
    {
      _id: new ObjectId(),
      requesterID: new ObjectId("6507eca15e1b4d6ccb246d96"),
      requesteeID: new ObjectId("64722c6bcd65fc6687ac31f2"),
      status: true,
    },
    {
      _id: new ObjectId(),
      requesterID: new ObjectId("64722c6bcd65fc6687ac31f2"),
      requesteeID: new ObjectId("64c8a86944224fc7644bd858"),
      status: false,
    },
  ]

  interface Attendace {
    _id: ObjectId;
    eventID: ObjectId;
    organisationID: ObjectId;
    userID: ObjectId;
  }
  
  export const attendanceStubs: Attendace[] = [
    {
      _id: new ObjectId(),
      eventID: new ObjectId("64bf57052fd8ab94c5e2c89e"),
      organisationID: new ObjectId("64b233b945d83893c8d0faf7"),
      userID: new ObjectId("64722c6bcd65fc6687ac31f2"),
    },
    {
      _id: new ObjectId(),
      eventID: new ObjectId("6472247ecd65fc66879f1909"),
      organisationID: new ObjectId("64c247d4ab4de86563bc461f"),
      userID: new ObjectId("64722c6bcd65fc6687ac31f2"),
    },
    {
      _id: new ObjectId(),
      eventID: new ObjectId("64be713458dc202ff199813f"),
      organisationID: new ObjectId("64c247d4ab4de86563bc461f"),
      userID: new ObjectId("64722c6bcd65fc6687ac31f2"),
    },
    {
      _id: new ObjectId(),
      eventID: new ObjectId("64be71e858dc202ff199814f"),
      organisationID: new ObjectId("64b233b945d83893c8d0faf7"),
      userID: new ObjectId("64cbaf2f44224fc7644bdb86"),
    },
    {
      _id: new ObjectId(),
      eventID: new ObjectId(),
      organisationID: new ObjectId("64aaf1ae79fdf7e618f8e3e9"),
      userID: new ObjectId("64cbaf2f44224fc7644bdb86"),
    },
    {
      _id: new ObjectId(),
      eventID: new ObjectId(),
      organisationID: new ObjectId("64aaf1ae79fdf7e618f8e3e9"),
      userID: new ObjectId("64cbaf2f44224fc7644bdb86"),
    },
]

export const databaseStub = {Users : userStubs, Organisation : organisationStubs, Events : eventStubs, Attendances : attendanceStubs, Friendships : friendshipsStubs}
