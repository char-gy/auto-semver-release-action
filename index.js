const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');
const semver = require('semver');

try {
  const github = new GitHub(process.env.GITHUB_TOKEN);
  const { owner, repo } = context.repo;
  const releaseTargetCommitish = core.getInput('release_target_comittish', { required: true });
  const semverIncrementReleaseType = core.getInput('semver_increment_release_type', { required: true });

  github.repos.listReleases({
    owner,
    repo
  }).then(({ data: releases }) => {
    return releases.
      map(release => release.tag_name).
      map(release => semver.valid(release)).
      filter(release => release).
      sort(semver.rcompare)[0]
      ;
  }).then(latestRelease => {
    const nextVersion = semver.inc((latestRelease || '0.0.0'), semverIncrementReleaseType);

    github.repos.createRelease({
      owner,
      repo,
      tag_name: nextVersion,
      target_commitish: releaseTargetCommitish,
      name: nextVersion
    }).then(({ data: release }) => {
      console.log(`Release ${release.tag_name} created`);
    });
  }).catch(error => {
    console.log('Failed with:');
    console.log(error);
  });;

} catch (error) {
  console.log('Failed with:');
  console.log(error);
}
