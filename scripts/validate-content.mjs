import {
  academyHeritageEntries,
  achievementResources,
  assertValidContent,
  educationalIdeas,
  practiceSites,
  projectProfile,
  taoXingzhiProfiles,
  validateContentCollections,
} from '../src/content/index.js';

function formatIssue(issue) {
  if (typeof issue === 'string') return issue;
  if (!issue || typeof issue !== 'object') return String(issue);

  const location = issue.path || issue.field || issue.id;
  const message = issue.message || issue.reason || JSON.stringify(issue);
  return location ? `${location}: ${message}` : message;
}

try {
  const issues = validateContentCollections();

  if (!Array.isArray(issues)) {
    throw new TypeError('validateContentCollections() must return an array.');
  }

  if (issues.length > 0) {
    console.error(`Content validation found ${issues.length} issue(s):`);
    for (const issue of issues) console.error(`- ${formatIssue(issue)}`);
    process.exitCode = 1;
  } else {
    assertValidContent();

    const summary = [
      `${practiceSites.length} practice sites`,
      `${taoXingzhiProfiles.length} profiles`,
      `${educationalIdeas.length} educational ideas`,
      `${academyHeritageEntries.length} heritage entries`,
      `${achievementResources.length} resources`,
      projectProfile ? '1 project profile' : '0 project profiles',
    ];

    console.log(`Content validation passed (${summary.join(', ')}).`);
  }
} catch (error) {
  console.error('Content validation failed.');
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
