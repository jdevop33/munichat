import { BylawChunk } from '../types';

// This file contains mock data for development purposes
// In a production environment, this would be replaced with actual bylaw data

export const mockBylawChunks: BylawChunk[] = [
  {
    id: '1',
    content: `
# Utility Rates Bylaw 2023-45

## Section 3: Water Rates

### 3.1 Residential Water Rates
3.1.1 This section applies to all residential properties within municipal boundaries.
3.1.2 Residential water rates are set at $2.75 per cubic meter of water consumed, effective January 1, 2023.
3.1.3 A minimum monthly charge of $15.00 applies to all residential accounts regardless of consumption.

### 3.2 Commercial Water Rates
3.2.1 Commercial water rates are set at $3.25 per cubic meter of water consumed, effective January 1, 2023.
3.2.2 A minimum monthly charge of $30.00 applies to all commercial accounts regardless of consumption.
    `,
    metadata: {
      title: 'Utility Rates Bylaw',
      section: 'Section 3: Water Rates',
      date: '2023-01-01',
      lastAmended: '2022-11-15',
      tags: ['utilities', 'water', 'rates', 'residential', 'commercial']
    }
  },
  {
    id: '2',
    content: `
# Utility Rates Bylaw 2023-45

## Section 4: Sewer Rates

### 4.1 General Provisions
4.1.1 Sewer charges are calculated based on water consumption unless otherwise specified.

### 4.2 Residential Sewer Rates
4.2.1 Residential sewer rates are calculated at $1.85 per cubic meter of water consumed, effective January 1, 2023.
4.2.2 A minimum monthly charge of $12.00 applies to all residential accounts regardless of consumption.

### 4.3 Commercial Sewer Rates
4.3.1 Commercial sewer rates are calculated at $2.35 per cubic meter of water consumed, effective January 1, 2023.
4.3.2 A minimum monthly charge of $25.00 applies to all commercial accounts regardless of consumption.
    `,
    metadata: {
      title: 'Utility Rates Bylaw',
      section: 'Section 4: Sewer Rates',
      date: '2023-01-01',
      lastAmended: '2022-11-15',
      tags: ['utilities', 'sewer', 'rates', 'residential', 'commercial']
    }
  },
  {
    id: '3',
    content: `
# Utility Rates Bylaw 2023-45

## Section 5: Waste Collection

### 5.1 Residential Waste Collection
5.1.1 Standard residential waste collection includes one (1) 120L garbage bin and one (1) 240L recycling bin.
5.1.2 Collection occurs weekly for garbage and bi-weekly for recycling.
5.1.3 Residential waste collection services are billed at a flat rate of $25.00 per month per dwelling unit.

### 5.2 Additional Services
5.2.1 Additional garbage bins may be requested at a rate of $15.00 per month per additional bin.
5.2.2 Additional recycling bins may be requested at a rate of $10.00 per month per additional bin.
5.2.3 Special collection services for large items are available by appointment at rates specified in Schedule A.
    `,
    metadata: {
      title: 'Utility Rates Bylaw',
      section: 'Section 5: Waste Collection',
      date: '2023-01-01',
      lastAmended: '2022-11-15',
      tags: ['utilities', 'waste', 'garbage', 'recycling', 'residential']
    }
  },
  {
    id: '4',
    content: `
# Zoning Bylaw 1978-23 (As Amended)

## Section 12: Downtown Commercial Zone (C1)

### 12.1 Permitted Uses
12.1.1 The following uses are permitted in the Downtown Commercial Zone (C1):
  a) Retail stores
  b) Restaurants and cafes
  c) Professional offices
  d) Financial institutions
  e) Hotels and motels
  f) Entertainment facilities
  g) Personal service establishments
  h) Mixed-use buildings with commercial on ground floor and residential above

### 12.2 Building Height Restrictions
12.2.1 Maximum building height shall not exceed four (4) stories or 15 meters, whichever is less.
12.2.2 Minimum building height shall be two (2) stories for new construction on Main Street.

### 12.3 Setback Requirements
12.3.1 Front yard setback: 0 meters (build-to line at property line)
12.3.2 Side yard setback: 0 meters, except 3 meters when abutting a residential zone
12.3.3 Rear yard setback: 3 meters, except 6 meters when abutting a residential zone
    `,
    metadata: {
      title: 'Zoning Bylaw',
      section: 'Section 12: Downtown Commercial Zone (C1)',
      date: '1978-05-15',
      lastAmended: '2021-06-30',
      tags: ['zoning', 'downtown', 'commercial', 'C1', 'building height', 'setbacks']
    }
  },
  {
    id: '5',
    content: `
# Noise Control Bylaw 2010-78 (As Amended)

## Section 3: General Prohibitions

### 3.1 General Noise Restrictions
3.1.1 No person shall make, cause, or permit unreasonable noise that disturbs the quiet, peace, rest, enjoyment, comfort or convenience of the neighborhood or of persons in the vicinity.
3.1.2 For the purposes of this bylaw, "unreasonable noise" includes, but is not limited to:
  a) Shouting, yelling, or amplified sounds that can be easily heard beyond the property line
  b) Construction noise outside of permitted hours
  c) Excessive vehicle noise including modified exhaust systems
  d) Persistent animal noise such as barking dogs

### 3.2 Time Restrictions
3.2.1 No person shall make, cause, or permit noise which disturbs the quiet, peace, rest, enjoyment, comfort or convenience of the neighborhood between the hours of 10:00 PM and 7:00 AM on weekdays, and between 11:00 PM and 9:00 AM on weekends and statutory holidays.

### 3.3 Construction Noise
3.3.1 Construction noise is permitted only between the hours of 7:00 AM and 8:00 PM on weekdays, and between 9:00 AM and 6:00 PM on Saturdays.
3.3.2 No construction noise is permitted on Sundays or statutory holidays except in emergency situations with prior approval from the municipality.
    `,
    metadata: {
      title: 'Noise Control Bylaw',
      section: 'Section 3: General Prohibitions',
      date: '2010-09-01',
      lastAmended: '2019-03-15',
      tags: ['noise', 'nuisance', 'quiet hours', 'construction', 'restrictions']
    }
  }
];