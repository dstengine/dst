// Creates an issue in Linear for a lead, via Linear's GraphQL API
// (POST https://api.linear.app/graphql, issueCreate mutation). The API key
// is scoped to "Create issues" only (Personal API keys -> New API key ->
// Only select permissions), so it can't be used to read or delete anything.

function formatIssueTitle(lead) {
  return `Lead: ${lead.name || lead.contacts.phone || lead.contacts.email || lead.contacts.whatsapp || lead.contacts.telegram}`;
}

function formatIssueDescription(lead) {
  const lines = [];

  if (lead.name) lines.push(`Name: ${lead.name}`);
  if (lead.contacts.phone) lines.push(`Phone: ${lead.contacts.phone}`);
  if (lead.contacts.email) lines.push(`Email: ${lead.contacts.email}`);
  if (lead.contacts.whatsapp) lines.push(`WhatsApp: ${lead.contacts.whatsapp}`);
  if (lead.contacts.telegram) lines.push(`Telegram: ${lead.contacts.telegram}`);

  if (lead.ref && (lead.ref.domain || lead.ref.url)) {
    lines.push(`Source: ${lead.ref.domain || lead.ref.url}`);
  }

  if (lead.geo && (lead.geo.city || lead.geo.country)) {
    lines.push(`Location: ${[lead.geo.city, lead.geo.country].filter(Boolean).join(', ')}`);
  }

  if (lead.meta && Object.keys(lead.meta).length > 0) {
    lines.push('', '**Meta**');
    for (const [key, value] of Object.entries(lead.meta)) lines.push(`${key}: ${value}`);
  }

  return lines.join('\n');
}

const ISSUE_CREATE_MUTATION = `
  mutation($input: IssueCreateInput!) {
    issueCreate(input: $input) {
      success
      issue { id identifier url }
    }
  }
`;

/**
 * @param {import('../lead-dto.mjs').Lead} lead
 * @returns {Promise<{ ok: boolean, status?: number, error?: string }>}
 */
export async function sendToLinear(lead) {
  const apiKey = process.env.LINEAR_API_KEY;
  const teamId = process.env.LINEAR_TEAM_ID;

  if (!apiKey || !teamId) {
    return { ok: false, error: 'LINEAR_API_KEY / LINEAR_TEAM_ID not configured' };
  }

  const res = await fetch('https://api.linear.app/graphql', {
    method: 'POST',
    headers: { Authorization: apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: ISSUE_CREATE_MUTATION,
      variables: {
        input: {
          teamId,
          title: formatIssueTitle(lead),
          description: formatIssueDescription(lead),
        },
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    return { ok: false, status: res.status, error: body.slice(0, 500) };
  }

  const body = await res.json();
  if (body.errors?.length) {
    return { ok: false, status: res.status, error: body.errors.map((e) => e.message).join('; ').slice(0, 500) };
  }
  if (!body.data?.issueCreate?.success) {
    return { ok: false, status: res.status, error: 'issueCreate returned success: false' };
  }

  return { ok: true, status: res.status };
}

export { formatIssueTitle, formatIssueDescription };
