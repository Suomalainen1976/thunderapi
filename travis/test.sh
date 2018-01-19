#!/bin/bash
set -e

# For revert branches, do nothing
if [[ "$TRAVIS_BRANCH" == revert-* ]]; then
  echo -e "\e[36m\e[1mTest triggered for reversion branch \"${TRAVIS_BRANCH}\" - doing nothing."
  exit 0
fi

# For Pull Requests
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  echo -e "\e[36m\e[1mTest triggered for Pull Request #${TRAVIS_PULL_REQUEST}."
fi

# Figure out the source of the test
if [ -n "$TRAVIS_TAG" ]; then
  echo -e "\e[36m\e[1mTest triggered for tag \"${TRAVIS_TAG}\"."
else
  echo -e "\e[36m\e[1mTest triggered for branch \"${TRAVIS_BRANCH}\"."
fi

# Tell the webhook the build started

echo -e 'Sending Discord Webhook';
export BACKTICK='`';
export TIMESTAMP=$(date --utc +%FT%TZ);
export COMMIT_FORMATTED="[$BACKTICK${TRAVIS_COMMIT:0:7}$BACKTICK](https://github.com/$REPO_OWNER/$REPO_NAME/commit/$TRAVIS_COMMIT)";
curl -v -H User-Agent:bot -H Content-Type:application/json -d '{"avatar_url":"https://i.imgur.com/kOfUGNS.png","username":"Travis CI","content":"","embeds":[{"author":{"name":"Build #'"$TRAVIS_BUILD_NUMBER"' Starting - '"$AUTHOR_NAME"'","url":"https://travis-ci.org/'"$REPO_OWNER"'/'"$REPO_NAME"'/builds/'"$TRAVIS_BUILD_ID"'"},"url":"https://github.com/'"$REPO_OWNER"'/'"$REPO_NAME"'/commit/'"$TRAVIS_COMMIT"'","title":"['"$TRAVIS_REPO_SLUG"':'"$TRAVIS_BRANCH"'] ","color":65280,"fields":[{"name":"_ _", "value": "'"$COMMIT_FORMATTED"' - '"$TRAVIS_COMMIT_MESSAGE"'"}],"timestamp":"'"$TIMESTAMP"'","footer":{"text":"Travis CI"}}]}' $DISCORD_WEBHOOK_URL;

# Run the tests
npm test