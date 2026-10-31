import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const repository = spawnSync('git', ['rev-parse', '--show-toplevel'], {
	encoding: 'utf8',
});

if (repository.status !== 0 || repository.error) {
	process.exit(0);
}

const repositoryRoot = resolve(repository.stdout.trim());
if (repositoryRoot !== resolve(process.cwd())) {
	process.exit(0);
}

const setup = spawnSync(
	'git',
	['config', '--local', 'core.hooksPath', '.beads/hooks'],
	{ cwd: repositoryRoot, encoding: 'utf8' },
);

if (setup.status !== 0) {
	const detail = setup.error?.message ?? setup.stderr.trim();
	console.error(`Unable to configure Git hooks${detail ? `: ${detail}` : ''}`);
	process.exitCode = setup.status ?? 1;
}
