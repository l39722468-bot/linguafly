import { NextRequest, NextResponse } from 'next/server';


interface LevelTestData {
  email: string;
  firstName?: string;
  lastName?: string;
  score: number;
  level: string;
  answers: { [key: string]: number };
}

async function syncWithHubSpot(data: LevelTestData) {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!accessToken) {
    console.warn('HUBSPOT_ACCESS_TOKEN not configured. Skipping HubSpot sync.');
    return null;
  }

  const properties: Record<string, any> = {
    email: data.email,
    last_cefr_level: data.level,
    last_test_score: data.score.toString(),
    lifecyclestage: 'lead',
    hs_lead_status: 'NEW'
  };

  if (data.firstName) properties.firstname = data.firstName;
  if (data.lastName) properties.lastname = data.lastName;

  // Search for existing contact
  const searchUrl = 'https://api.hubapi.com/crm/v3/objects/contacts/search';
  const searchRes = await fetch(searchUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      filterGroups: [{
        filters: [{
          propertyName: 'email',
          operator: 'EQ',
          value: data.email
        }]
      }]
    })
  });

  const searchData = await searchRes.json();
  const exists = searchData.results && searchData.results.length > 0;

  if (exists) {
    const contactId = searchData.results[0].id;
    const updateUrl = `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`;
    await fetch(updateUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ properties })
    });
  } else {
    const createUrl = 'https://api.hubapi.com/crm/v3/objects/contacts';
    await fetch(createUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ properties })
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as LevelTestData;

    if (!body.email || body.score === undefined || !body.level) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await syncWithHubSpot(body);

    return NextResponse.json({
      success: true,
      message: 'Test submitted successfully'
    });
  } catch (error: any) {
    console.error('Error submitting level test:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
