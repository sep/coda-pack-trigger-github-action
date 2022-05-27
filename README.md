A Coda Pack that adds the ability to fire a Github Action from any Coda Action (button press, automation, etc.).

# Set up

It takes a couple pieces to get this working, but it'll totally be worth it.

## Github Side

1. First, configure your workflow to be able to be triggered by an external event.
2. Then, create a Personal Access Token (PAT).

### Github Action

Add a `repository_dispatch` with a corresponding `event_type`. You'll configure the `event` on the Coda side once you install the pack. All workflows with the same `event_type` can trigger from the same Coda Action!

Here's an example:
```
## my-workflow.yml

on:
 repository_dispatch:
    types: [coda-action]
    
```

### Personal Access Token

https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

1. Ensure to include the `user` and `repo` scopes.
2. Set the expiration to something reasonable. (Pro tip: set a calendar reminder a few days in advance so you don't forget to refresh it!)
3. Store it someplace safe so you can get back to it. Github won't show it to you again after it shows it to you once!

## Coda Side

* Install the pack: https://coda.io/packs/trigger-github-action-11770
* Create a button
    * ![image](https://user-images.githubusercontent.com/122422/170721630-f4861cac-7307-400f-8e4b-2ffd583c93a6.png)
* Choose the "Trigger Github Action" Pack
    * ![image](https://user-images.githubusercontent.com/122422/170722440-bfb55e6f-331b-4a87-8ae5-57f3dd6bb9ce.png)
* Choose "Set up another account", and paste your PAT (from above) into the box.
    * ![image](https://user-images.githubusercontent.com/122422/170723251-19eeb62d-0983-4c4f-a80b-fbced55b27fe.png)
* Configure the repository and dispatch settings
    * ![image](https://user-images.githubusercontent.com/122422/170725082-4b4d5182-156d-4ac3-a727-80c1a77fc87b.png)
    * `repo_with_owner` - should be something like `your_github_username/name_of_your_repo`
    * `event` - should correspond to the values used in the `types` element of your `repository_dispatch` trigger above.

      Remember: This will trigger all workflows on the repository that have a matching `repository_dispatch` event type.
