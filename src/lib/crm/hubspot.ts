/**
 * Focus English - Unified HubSpot CRM Integration
 */

const hubspotApiKey = process.env.HUBSPOT_API_KEY || process.env.HUBSPOT_ACCESS_TOKEN || '';

/**
 * Helper to make requests to HubSpot API
 */
export async function hubspotRequest(endpoint: string, method: string = 'GET', body?: Record<string, unknown>) {
  if (!hubspotApiKey) {
    console.warn('HubSpot API key not configured');
    return null;
  }

  try {
    const response = await fetch(`https://api.hubapi.com${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${hubspotApiKey}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`HubSpot API error (${endpoint}):`, errorData);
      return null;
    }

    if (response.status === 204) {
      return { success: true };
    }

    return await response.json();
  } catch (error) {
    console.error(`HubSpot request exception (${endpoint}):`, error);
    return null;
  }
}

/**
 * Sync contact with HubSpot (search by email, then create or update)
 */
export async function syncHubSpotContact(params: {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  properties?: Record<string, any>;
}) {
  const { email, firstName, lastName, phone, properties: extraProps } = params;

  // 1. Search for existing contact
  const searchResult = await hubspotRequest('/crm/v3/objects/contacts/search', 'POST', {
    filterGroups: [
      {
        filters: [
          {
            propertyName: 'email',
            operator: 'EQ',
            value: email,
          },
        ],
      },
    ],
  });

  const properties: Record<string, any> = {
    email,
    ...extraProps,
  };
  
  if (firstName) properties.firstname = firstName;
  if (lastName) properties.lastname = lastName;
  if (phone) properties.phone = phone;

  if (searchResult?.results?.length > 0) {
    // Update existing
    const contactId = searchResult.results[0].id;
    await hubspotRequest(`/crm/v3/objects/contacts/${contactId}`, 'PATCH', { properties });
    return contactId;
  } else {
    // Create new
    const createResult = await hubspotRequest('/crm/v3/objects/contacts', 'POST', {
      properties: {
        ...properties,
        hs_lead_status: 'NEW',
        lifecyclestage: 'lead',
      },
    });
    return createResult?.id;
  }
}

/**
 * Create a support ticket in HubSpot
 */
export async function createHubSpotTicket(params: {
  subject: string;
  content: string;
  pipeline?: string;
  stage?: string;
}) {
  const { subject, content, pipeline, stage } = params;

  const properties: Record<string, string> = {
    subject,
    content,
  };
  if (pipeline) properties.hs_pipeline = pipeline;
  if (stage) properties.hs_pipeline_stage = stage;

  const ticketResult = await hubspotRequest('/crm/v3/objects/tickets', 'POST', {
    properties,
  });

  if (ticketResult?.id) return ticketResult.id;

  // Reintento sin pipeline/stage (evita fallos por IDs de pipeline obsoletos).
  if (pipeline || stage) {
    const retry = await hubspotRequest('/crm/v3/objects/tickets', 'POST', {
      properties: { subject, content },
    });
    return retry?.id;
  }

  return null;
}

/**
 * Associate a ticket with a contact
 */
export async function associateTicketWithContact(ticketId: string, contactId: string) {
  return await hubspotRequest(
    `/crm/v3/objects/tickets/${ticketId}/associations/contacts/${contactId}/228`,
    'PUT'
  );
}

// Re-export old functions for compatibility (refactored to use hubspotRequest)

interface OldHubSpotContact {
  email: string;
  firstname: string;
  lastname?: string;
  phone?: string;
  course_interest?: string;
  current_level?: string;
  message?: string;
}

export async function createHubSpotContact(contactData: OldHubSpotContact) {
  const contactId = await syncHubSpotContact({
    email: contactData.email,
    firstName: contactData.firstname,
    lastName: contactData.lastname,
    phone: contactData.phone,
    properties: {
      course_interest: contactData.course_interest || '',
      current_level: contactData.current_level || '',
    }
  });

  if (contactId && contactData.message) {
    await addNoteToContact(contactId, contactData.message);
  }

  return contactId ? { success: true, contactId } : { success: false };
}

export async function addNoteToContact(contactId: string, message: string) {
  return await hubspotRequest('/crm/v3/objects/notes', 'POST', {
    properties: {
      hs_note_body: message,
    },
    associations: [
      {
        to: { id: contactId },
        types: [
          {
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: 202,
          },
        ],
      },
    ],
  });
}

export async function updateContactProperty(email: string, property: string, value: string) {
  const success = await syncHubSpotContact({
    email,
    properties: { [property]: value }
  });
  return success ? { success: true } : { success: false };
}
