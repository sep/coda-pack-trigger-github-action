import * as coda from "@codahq/packs-sdk";

export const pack = coda.newPack();

pack.addNetworkDomain("github.com");

pack.setUserAuthentication({
  type: coda.AuthenticationType.HeaderBearerToken,

  // Determines the name of the GitHub account that was connected.
  getConnectionName: async function (context) {
    let response = await context.fetcher.fetch({
      method: "GET",
      url: "https://api.github.com/user",
    });
    return response.body.login;
  },
});

// A formula to trigger a github action.
pack.addFormula({
  name: "GithubAction",
  description: "Trigger a Github Action Workflow.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "repo",
      description: "The name of the repo (e.g. org/repo).",
      suggestedValue: "owner/repo"
    }),
    coda.makeParameter({
      type: coda.ParameterType.String,
      name: "event",
      description: "The name of the event to trigger.",
      suggestedValue: "coda-event"
    }),
  ],
  resultType: coda.ValueType.String,
  isAction: true,

  execute: async function ([repo, event], context) {
    let response = await context.fetcher.fetch({
      url: `https://api.github.com/repos/${repo}/dispatches`,
      method: "POST",
      headers: {
        "Accept": "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        event_type: event,
      }),
    });

    return response.status == 204 ? "✔️" : "❌";
  },
});
