// Creates an issue in Linear for a lead, via Linear's GraphQL API
// (POST https://api.linear.app/graphql, issueCreate mutation). The API key
// is scoped to "Create issues" only (Personal API keys -> New API key ->
// Only select permissions), so it can't be used to read or delete anything.

import { formatLeadText, formatLeadTitle } from '../lead-text.mjs';

function formatIssueTitle(lead) {
  return formatLeadTitle(lead);
}

function formatIssueDescription(lead) {
  return formatLeadText(lead);
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
